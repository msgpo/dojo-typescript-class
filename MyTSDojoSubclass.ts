
/// <reference path="dojoClass.d.ts" />
import dojoClass = require("dojoClass");
import mytsdojobaseclass = require('MyTSDojoBaseClass');

export class MyTSDojoSubclass extends mytsdojobaseclass.MyTSDojoBaseClass {
  
  constructor() {
    super();
    dojoClass.construct(this);
  }
  
  message(): string {
    return "[MyDojoSubclass message]";
  }
  
  messageChained(): string {
    return <string> dojoClass.inherited(this, "messageChained", arguments) + this.message();
  }
}
dojoClass.create("MyTSDojoSubclass", MyTSDojoSubclass, [mytsdojobaseclass.MyTSDojoBaseClass])
