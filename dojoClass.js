define(["dojo/_base/declare"], function(dojoDeclare) {
  
  function DojoClassCreate(tsClassFunc, dojoSuperClasses) {
    // remove the 'constructor' property from the prototype first.
    var tsProto = tsClassFunc.prototype;
    var cleanTsProto = {};
     
    // Prepare the prototype for passing to declare. Remove the 'constructor'
    // otherwise Dojo will call it when we least expect it.
    for (var name in tsProto) {
      if (tsProto.hasOwnProperty(name) && name !== "constructor") {
        cleanTsProto[name] = tsProto[name];
      }
    }
    
    var dojoClassFunc = dojoDeclare("", dojoSuperClasses, cleanTsProto);
    
    // Static methods on the class.
    tsClassFunc._meta = dojoClassFunc._meta;
    tsClassFunc.superclass = dojoClassFunc.superclass;
    tsClassFunc.extend = dojoClassFunc.extend;
    tsClassFunc.createSubclass = dojoClassFunc.createSubclass;
    
    tsClassFunc.prototype.getInherited = dojoClassFunc.prototype.getInherited;
    tsClassFunc.prototype.isInstanceOf = dojoClassFunc.prototype.isInstanceOf;
    tsClassFunc.prototype.inherited = dojoClassFunc.prototype.inherited;
    tsClassFunc.prototype.__inherited = dojoClassFunc.prototype.__inherited;
    
    dojoClassFunc.prototype = tsClassFunc.prototype;  // This is needed to get pass the a.callee check inside Dojo's simpleConstructor() inside declare() .
    tsClassFunc.prototype.__dojoConstructor = dojoClassFunc;
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
