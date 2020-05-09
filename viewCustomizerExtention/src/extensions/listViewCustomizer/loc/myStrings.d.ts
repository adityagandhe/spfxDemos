declare interface IListViewCustomizerCommandSetStrings {
  Command1: string;
  Command2: string;
  Command3:string;
}

declare module 'ListViewCustomizerCommandSetStrings' {
  const strings: IListViewCustomizerCommandSetStrings;
  export = strings;
}
