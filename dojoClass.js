define(["dojo/_base/declare"], function(dojoDeclare) {
  
  function DojoClassCreate(name, tsClassFunc, dojoSuperClasses) {
    // remove the 'constructor' property from the prototype first.
    var tsProto = tsClassFunc.prototype;
    var cleanTsProto = {};
     
    // Prepare the prototype for passing to declare. Remove the 'constructor'
    // otherwise Dojo will call it when we least expect it.
    for (var key in tsProto) {
      if (tsProto.hasOwnProperty(key) && key !== "constructor") {
        cleanTsProto[key] = tsProto[key];
      }
    }
    
    var dojoClassFunc = dojoDeclare(name, dojoSuperClasses, cleanTsProto);
    
    // Static methods on the class.
    tsClassFunc._meta = dojoClassFunc._meta;
    tsClassFunc.superclass = dojoClassFunc.superclass;
    tsClassFunc.extend = dojoClassFunc.extend;
    tsClassFunc.createSubclass = dojoClassFunc.createSubclass;

    tsClassFunc.prototype = dojoClassFunc.prototype;
    tsClassFunc.prototype.__dojoConstructor = dojoClassFunc;
    tsClassFunc.prototype.constructor = tsClassFunc;
  }
  
  function DojoConstruct() {
    var self = arguments[0];
    var dojoConstructor = self.__dojoConstructor;
    dojoConstructor.apply(self, Array.prototype.slice.call(arguments, 1));
  }
  
  function inherited(self, name, args) {
    return self.inherited(name, args);
  }
  
  return {
    create: DojoClassCreate,
    construct: DojoConstruct,
    inherited: inherited
  };
});
