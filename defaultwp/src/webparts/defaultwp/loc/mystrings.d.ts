declare interface IDefaultwpWebPartStrings {
  PropertyPaneDescription: string;
  PropertyPaneButton:string;
  PropertyPaneLabel:string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
}

declare module 'DefaultwpWebPartStrings' {
  const strings: IDefaultwpWebPartStrings;
  export = strings;
}
