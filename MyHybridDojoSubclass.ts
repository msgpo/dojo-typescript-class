/// <reference path="dojoClass.d.ts" />
/// <reference path="MyDojoBaseClass.d.ts" />
import dojoClass = require("dojoClass");
import MyDojoBaseClass = require('MyDojoBaseClass');

export class MyHybridDojoSubclass extends MyDojoBaseClass {
  
  constructor() {
    super();
    dojoClass.construct(this);
  }
  
  message(): string {
    return "[MyHybridDojoSubclass message]";
  }
  
  messageChained(): string {
    return <string> dojoClass.inherited(this, "messageChained", arguments) + this.message();
  }
}
dojoClass.create(MyHybridDojoSubclass, [MyDojoBaseClass]);
