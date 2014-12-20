
/// <reference path="dojoClass.d.ts" />
import dojoClass = require("dojoClass");

export class MyTSDojoBaseClass {
  constructor() {
    dojoClass.construct(this);
  }
  message(): string {
    return "[MyDojoBaseClass message]";
  }
  
  messageChained(): string {
    return "[MyDojoBaseClass chained message]";
  }
}
dojoClass.create(MyTSDojoBaseClass, []);
