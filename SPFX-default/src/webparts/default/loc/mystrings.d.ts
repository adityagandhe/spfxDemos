declare interface IDefaultWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
}

declare module 'DefaultWebPartStrings' {
  const strings: IDefaultWebPartStrings;
  export = strings;
}
