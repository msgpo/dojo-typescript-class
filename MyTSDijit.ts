/// <amd-dependency path="dojo/text!./MyTSDijit_template.html" />
/// <amd-dependency path="dijit/_WidgetBase" />
/// <amd-dependency path="dijit/_TemplatedMixin" />
/// <reference path="typings/dojo/dijit.d.ts" />
/// <reference path="dojoClass.d.ts" />
import dojoClass = require("dojoClass");

// FIXME These two are also pulled in at the top of the file to ensure that tsc doesn't removed then from the AMD require because it doesn't look like we use _WidgetBase directly.
import _WidgetBase = require("dijit/_WidgetBase");
import _TemplatedMixin = require("dijit/_TemplatedMixin");

var template: string = require("dojo/text!./MyTSDijit_template.html");

// FIXME using _WidgetBase directly should work. Is this a problem in the .d.ts for Dojo?
class MyTSDijit extends dijit._WidgetBase {
    templateString: string = template;

    constructor(params?: Object, elem?: HTMLElement) {
        super();
        dojoClass.construct(this, params, elem);
    }
  
    getTSMessage(): string {
      return "TS message from MyTSDijit";
    }
}

dojoClass.create("MyTSDijit", MyTSDijit, [dijit._WidgetBase, dijit._TemplatedMixin]);

// Dojo makes a lot of use of introspection and expects to be able to do this on the prototype
// for a class to figure out which properties etc are available on any instance. TS doesn't
// play very well with this, so we need to be a bit more explicit to make up for this.
//
//dojoClass.defaultProperties(MyTSDijit, {
//  "templateString": template
//});
export = MyTSDijit;
