define(["dojo/aspect", "MyDojoBaseClass", "MyDojoSubclass", "MyTSDojoBaseClass", "MyTSDojoSubclass", "MyHybridDojoSubclass"],
       function(aspect, MyDojoBaseClass, MyDojoSubclass, mytsdojobaseclass, mytsdojosubclass, myhybriddojosubclass) {
  return {
    
    // Tests for the base Dojo functionality.
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
    
    // Same tests as above except for two classes implemented in TypeScript.
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
    
    // JS/Dojo base class with TypeScript subclass.
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
    
    // Isolate this one test for debugging.
    'testTypeScriptFunctionNom': function(test) { 
      var baseObj = new mytsdojobaseclass.MyTSDojoBaseClass();
      test.equal(baseObj.message.nom, "message");
      test.done();
    },
    
    //---------------------------------
    'testDojoAspect': function(test) {
      var baseObj = new MyDojoBaseClass();      
      var called = false;
      aspect.after(baseObj, 'message', function() {
        called = true;
      });
      
      baseObj.message();
      test.ok(called, "Aspect after call back was used.");
      test.done();
    },
    
    'testTypeScriptDojoAspect': function(test) {
      var baseObj = new mytsdojobaseclass.MyTSDojoBaseClass();      
      var called = false;
      aspect.after(baseObj, 'message', function() {
        called = true;
      });
      
      baseObj.message();
      test.ok(called, "Aspect after call back was used.");
      test.done();
    }

  };
});