import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneLabel,
  PropertyPaneToggle,
  PropertyPaneDropdown,
  PropertyPaneHorizontalRule
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';
import { SPHttpClient, SPHttpClientResponse,ISPHttpClientOptions } from "@microsoft/sp-http";
import {IListInterface} from './IListInterface';
import styles from './PropertyPanesWebPart.module.scss';
import * as strings from 'PropertyPanesWebPartStrings';

export interface IPropertyPanesWebPartProps {
  description: string;
  page2description:string;
}
let listDetails:string="";
let listName:string ="";

let statusNumber: number=0;
let url :string = "";
let checkedData:number=0;
export default class PropertyPanesWebPart extends BaseClientSideWebPart <IPropertyPanesWebPartProps> {

  public render(): void {
 listName =this.properties.description ;


  url = this.context.pageContext.web.absoluteUrl +"/_api/web/lists/getbytitle('"+listName+"')";
if(checkedData ==0)
{
  this.CheckList();
}


  }


private GetList():Promise<IListInterface>{

alert("getting the details");
return this.context.spHttpClient.get(url, SPHttpClient.configurations.v1)
.then((data: SPHttpClientResponse) =>  data.json())
.then((data: any) => {

  return data;


});
}
private CreateList(): void{
  alert("Creating the list");
  const listdefn :any ={
    "Title":this.properties.description,
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
        this.CheckList();
      }
      else{
        alert("list creation failed");
      }

  });
}
private UpdateListTitle():void{
alert("updating the list title");

const listTitleObject:any={
"Title":"UpdatedTitle",
};
const headers:any={
  "X-HTTP-Method":"MERGE",
  "IF-MATCH":"*"
};

const sphttpClientOptions:ISPHttpClientOptions={
  "headers":headers,
  "body":JSON.stringify(listTitleObject),
};
this.context.spHttpClient.post(url, SPHttpClient.configurations.v1,sphttpClientOptions)
.then((data: SPHttpClientResponse) => {
  if(data.status ===204)
  {
    alert("Title is updated");
    this.CheckList();
  }
  else{
    alert("Error in Title Update");
  }
});
}


private CheckList():void
{ alert("Checking the list");
  this.context.spHttpClient.get(url, SPHttpClient.configurations.v1)
  .then((data: SPHttpClientResponse) => {

    if (data.status ===200)
    {
     this.GetList().then(ItemValue=>{
       let itemstr:string="";
       itemstr += ` <tr> <td>${ItemValue.Title}</td> <td>${ItemValue.Id}</td></tr>`;
       this.domElement.innerHTML=`
       <table>${itemstr}</table>
      `;

     });

    }
    else{
      this.CreateList();
    }
  }
  );


}
  protected get dataVersion(): Version {
  return Version.parse('1.0');
}
  protected get disableReactivePropertyChanges():boolean{
    return true;
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
  return {
    pages: [
      {

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
      },
      {
        header: {
          description: "Page2"
        },
        groups: [
          {
            groupName: "TestPage2Group",
            groupFields: [
              PropertyPaneTextField('page2description', {
                label: "pAGE2 lABEL"
              }),
              PropertyPaneLabel('Label',{text:"this is just a test"})
            ]
          }
        ]
      }

    ]
  };
}
}
