import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';
import { SPHttpClient, SPHttpClientResponse,ISPHttpClientOptions } from "@microsoft/sp-http";
import styles from './ListEventsWebPart.module.scss';
import * as strings from 'ListEventsWebPartStrings';

export interface IListEventsWebPartProps {
  description: string;
}

export default class ListEventsWebPart extends BaseClientSideWebPart <IListEventsWebPartProps> {

  private createList():void
  {
this.context.spHttpClient.get(this.context.pageContext.web.absoluteUrl +"/_api/web/lists/GetByTitle('Teestrt123')", SPHttpClient.configurations.v1)
.then((data: SPHttpClientResponse) =>{
  if(data.status === 200)
  {
    alert("list exists") ;

  }
  if(data.status === 404)
  {
    alert("list do not exists") ;

  const listdefn :any ={
    "Title":"Teestrt123",
     "Description":"New List",
     "AllowContentTypes":true,
     "BaseTemplate":100,
  };
  const spHttpOption:ISPHttpClientOptions={
    "body":JSON.stringify(listdefn)
  };
    this.context.spHttpClient.post(this.context.pageContext.web.absoluteUrl +"/_api/web/lists",SPHttpClient.configurations.v1,spHttpOption)
    .then((response: SPHttpClientResponse) =>{
      if(response.status === 201)
      {
        alert("list created successfully") ;
      }
      else{
        alert("list creation failed");
      }

  });
  }

});
  }


  public render(): void {
    this.domElement.innerHTML = `
      <div>
    <button type ="button" class='ms-button'>
<span class='ms-button-label'>Create List</span>
    </button>
          </div>`;

          this.createList=this.createList.bind(this);
          const button:HTMLButtonElement =this.domElement.getElementsByTagName("BUTTON")[0] as HTMLButtonElement;
         button.addEventListener('click',this.createList);
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
