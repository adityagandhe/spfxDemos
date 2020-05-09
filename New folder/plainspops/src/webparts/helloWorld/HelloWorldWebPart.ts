import { Version } from '@microsoft/sp-core-library';
import {Environment,EnvironmentType} from '@microsoft/sp-core-library';
import {ISPItems} from './ISPItems';
import MockData from './MockData';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';
import { SPHttpClient, SPHttpClientResponse } from "@microsoft/sp-http";
import styles from './HelloWorldWebPart.module.scss';
import * as strings from 'HelloWorldWebPartStrings';

export interface IHelloWorldWebPartProps {
  description: string;
}

export default class HelloWorldWebPart extends BaseClientSideWebPart <IHelloWorldWebPartProps> {

  private _getListData(): Promise<ISPItems[]> {
   // alert("yes");
    return this.context.spHttpClient.get(this.context.pageContext.web.absoluteUrl + `/_api/web/lists?$filter=Hidden eq false`, SPHttpClient.configurations.v1)
    .then((data: SPHttpClientResponse) => data.json())
    .then((data: any) => {
      return data.value;
    });

  }
private getData():Promise<ISPItems[]>
{
  return MockData.Get("").then((data:ISPItems[])=>{return data;});
}


  private getItems():Promise<ISPItems[]>
  {
    if(Environment.type ==EnvironmentType.Local)
    {
      return this.getData();
    }
    else{
    return this._getListData();
    }
  }
  public render(): void {
  let listItemstr:string="";
 this.getItems().then(items=>{
   items.map(item =>{
    listItemstr +=`<li>${item.Title} LastModified ${item.LastItemUserModifiedDate}</li> `;
   });

this.domElement.innerHTML=`${listItemstr}`;});
  }

  protected get dataVersion(): Version {
  return Version.parse('1.0');
}

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
  return {
    pages: [
      {
        header: {
          description: strings.PropertyPaneDescription
        },
        groups: [
          {
            groupName: strings.BasicGroupName,
            groupFields: [
              PropertyPaneTextField('description', {
                label: strings.DescriptionFieldLabel
              })
            ]
          }
        ]
      }
    ]
  };
}
}
