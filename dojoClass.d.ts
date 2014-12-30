declare module "dojoClass" {
//  function create(tsClass: Function, superClasses: Function[]): void;
  function create(name: string, tsClass: Function, superClasses: Function[]): void;
  function construct(self: any, options?:any, elem?: any): void;
  function inherited(self: any, name: string, args: IArguments): any;
  function defaultProperties(tsClass: Function, props: { [index: string]: any; }): void;
}
