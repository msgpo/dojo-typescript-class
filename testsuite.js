define(["MyDojoBaseClass", "MyDojoSubclass", "MyTSDojoBaseClass", "MyTSDojoSubclass", "MyHybridDojoSubclass"],
       function(MyDojoBaseClass, MyDojoSubclass, mytsdojobaseclass, mytsdojosubclass, myhybriddojosubclass) {
  return {
    'testJSDojoClasses': function(test) {
      var baseObj = new MyDojoBaseClass();
      test.equal(baseObj.constructor._meta.bases.length, 1);
      test.equal(baseObj.message(), "[MyDojoBaseClass message]");
      test.equal(baseObj.message.nom, "message");
      
      var subObj = new MyDojoSubclass();
      test.equal(subObj.constructor._meta.bases.length, 2);
      test.equal(subObj.message(), "[MyDojoSubclass message]");
      test.equal(subObj.messageChained(), "[MyDojoBaseClass chained message][MyDojoSubclass message]");
      test.equal(subObj.message.nom, "message");
            
      test.ok(subObj instanceof MyDojoBaseClass);
      test.ok(subObj.isInstanceOf(MyDojoBaseClass));

      test.done();
    },
    
    'testTypeScriptDojoClasses': function(test) {
      var baseObj = new mytsdojobaseclass.MyTSDojoBaseClass();
      test.equal(baseObj.constructor._meta.bases.length, 1);
      test.equal(baseObj.message(), "[MyDojoBaseClass message]");
      
      var subObj = new mytsdojosubclass.MyTSDojoSubclass();
      test.equal(subObj.constructor._meta.bases.length, 2);
      test.equal(subObj.message(), "[MyDojoSubclass message]");
      test.equal(subObj.messageChained(), "[MyDojoBaseClass chained message][MyDojoSubclass message]");
      test.equal(subObj.message.nom, "message");
      
      test.ok(subObj instanceof mytsdojobaseclass.MyTSDojoBaseClass);
      test.ok(subObj.isInstanceOf(mytsdojobaseclass.MyTSDojoBaseClass));
      
      test.done();
    },
    
    'testHybridDojoSubclass': function(test) {
      var baseObj = new MyDojoBaseClass();      
      var subObj = new myhybriddojosubclass.MyHybridDojoSubclass();
      test.equal(subObj.constructor._meta.bases.length, 2);
      test.equal(subObj.message(), "[MyHybridDojoSubclass message]");
      test.equal(subObj.messageChained(), "[MyDojoBaseClass chained message][MyHybridDojoSubclass message]");
      test.equal(subObj.message.nom, "message");
            
      test.ok(subObj instanceof MyDojoBaseClass);
      test.ok(subObj.isInstanceOf(MyDojoBaseClass));

      test.done();
    },
  
    'testTypeScriptFunctionNom': function(test) {
      var baseObj = new mytsdojobaseclass.MyTSDojoBaseClass();
      test.equal(baseObj.message.nom, "message");
      test.done();
    }
  };
});