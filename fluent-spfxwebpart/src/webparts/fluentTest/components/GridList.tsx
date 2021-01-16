import * as React from 'react';
import { SPHttpClient, SPHttpClientResponse } from "@microsoft/sp-http";
export interface IComponentProps {
  description:string;
  context:any;
}

export interface IComponentState {}

export default class Component extends React.Component<IComponentProps, IComponentState> {

  constructor(props: IComponentProps) {
    super(props);

    this.state = {
ListItems:[]
    };
  }
public GetItems():Promise<any>{
  return this.props.context.spHttpClient.get("https://yavatmal3.sharepoint.com/sites/ModernTeam/_api/web/lists/getbytitle('test676')/items?$Top=10", SPHttpClient.configurations.v1)
  .then((data: SPHttpClientResponse) => data.json())
  .then((data: any) => {

    return data.value;
  });

}
public render(): any {
let strItem="list Items";

this.GetItems().then(AllItems=>{
  let itemstr:string="";
AllItems.map(Item=>{
itemstr+= `<h6>${Item.Title} ${Item.Id} </h6>`;
});
this.props.context.domElement.innerHTML=itemstr;
});



}}
