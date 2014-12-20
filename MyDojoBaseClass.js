define(["dojo/_base/declare"], function(dojoDeclare) {
  var MyDojoBaseClass = dojoDeclare("MyDojoBaseClass", [], {
    message: function() {
      return "[MyDojoBaseClass message]";
    },
    messageChained: function() {
      return "[MyDojoBaseClass chained message]";
    }

  });
  return MyDojoBaseClass;
});
