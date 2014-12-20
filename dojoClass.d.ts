declare module "dojoClass" {
  function create(tsClass: Function, superClasses: Function[]): void;
  function construct(self: any): void;
  function inherited(self: any, name: string, args: IArguments): any;
}
