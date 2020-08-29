declare interface IFeedbackWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  hintTextFieldLabel: string;
  CommentByFieldLabel:string;
}

declare module 'FeedbackWebPartStrings' {
  const strings: IFeedbackWebPartStrings;
  export = strings;
}
