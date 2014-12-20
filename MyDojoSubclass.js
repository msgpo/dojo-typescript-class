define(["dojo/_base/declare", "MyDojoBaseClass"], function(dojoDeclare, MyDojoBaseClass) {
  var MyDojoSubclass = dojoDeclare("MyDojoSubclass", [MyDojoBaseClass], {
    message: function() {
      return "[MyDojoSubclass message]";
    },
    messageChained: function() {
      return this.inherited(arguments) + this.message();
    }
  });
  return MyDojoSubclass;
});
