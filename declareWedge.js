/*
 * Intercept the creation of Dojo classes and wrap the result in a wrapper
 * which prevents subclasses calling the constructor function which belong
 * to their superclasses.
 */
define(["dojoDeclare", "dojo/_base/lang"], function(dojoDeclare, lang) {
  
  console.log("declareWedge loading.");
  
  var wedge = function wedge() {
    var name = arguments[0];
    if (typeof name !== 'string') {
      name = null;
    }
    console.log("declareWedge called. Name is "+name);
    
    var dojoNewConstructor = dojoDeclare.apply(this, arguments);

    var constructorWedge = function() {
      console.log("Wedged constructor called! on "+name);
      console.log("this.__proto__ ===  constructorWedge.prototype is ", this.__proto__ === constructorWedge.prototype);
      
      if (this.__proto__ !== constructorWedge.prototype) {
        console.log("declareWedge stopped what appeared to be a call to a super class constructor.");
        return;
      }
      // This little protype dance is needed to by pass a "this instanceof a.callee" check inside declare the Dojo constructor.
      var oldPrototype = dojoNewConstructor.prototype;
      dojoNewConstructor.prototype = this.__proto__;
      
      var result = dojoNewConstructor.apply(this, arguments);
      
      dojoNewConstructor.prototype = oldPrototype;  // restore
    };
    constructorWedge.prototype = dojoNewConstructor.prototype;
    constructorWedge._meta = dojoNewConstructor._meta;
    constructorWedge.superclass = dojoNewConstructor.superclass;
    constructorWedge.extend = dojoNewConstructor.extend;
    constructorWedge.createSubclass = dojoNewConstructor.createSubclass;
    
    constructorWedge.__wedged = name === null ? "<unknown>" : name;
    
    // Put it in the global name space.
    if (name !== null) {
      lang.setObject(name, constructorWedge);
    }
    
    return constructorWedge;
  };
  return wedge;
});