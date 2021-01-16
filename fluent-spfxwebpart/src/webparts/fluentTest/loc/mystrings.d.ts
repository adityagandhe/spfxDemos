declare interface IFluentTestWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
}

declare module 'FluentTestWebPartStrings' {
  const strings: IFluentTestWebPartStrings;
  export = strings;
}
