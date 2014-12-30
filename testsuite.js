define(["dojo/aspect", "dijit/_WidgetBase", "MyDojoBaseClass", "MyDojoSubclass", "MyTSDojoBaseClass", "MyTSDojoSubclass", "MyHybridDojoSubclass", "MyDijit", "MyTSDijit"],
       function(aspect, _WidgetBase, MyDojoBaseClass, MyDojoSubclass, mytsdojobaseclass, mytsdojosubclass, myhybriddojosubclass, MyDijit, MyTSDijit) {
  return {
    
    // Tests for the base Dojo functionality.
    'testJSDojoClasses': function(test) {
      var baseObj = new MyDojoBaseClass();
      test.ok(baseObj.constructor !== undefined);
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
      test.ok(baseObj.constructor !== undefined);
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
    },

    //---------------------------------
    // A simple JS and Dojo Dijit.
    'testMyDijit': function(test) {
      var dijitArea = document.getElementById("test_dijit_area");
      dijitArea.innerHTML = "";
      
      var myDijitInstance = new MyDijit();
      myDijitInstance.placeAt(dijitArea, "first");
      
      test.equal(dijitArea.childNodes[0].innerHTML, "My Dijit");
      myDijitInstance.destroy();
      test.done();
    },

    //---------------------------------
    // A simple JS and Dojo Dijit.
    'testMyTSDijit': function(test) {
      var dijitArea = document.getElementById("test_dijit_area");
      dijitArea.innerHTML = "";
      
      var myTSDijitInstance = new MyTSDijit();
      test.equal(myTSDijitInstance.getTSMessage(), "TS message from MyTSDijit");
      
      myTSDijitInstance.placeAt(dijitArea, "first");
   
      test.equal(dijitArea.childNodes[0].innerHTML, "My TS Dijit");
      
      myTSDijitInstance.destroy();
      test.done();
    },
    
    'testGlobalDijit': function(test) {
      // Access to a Dijit via AMD should have the same result as access in the old school global.
      test.ok(_WidgetBase === dijit._WidgetBase);
      test.done();
    }

  };
});