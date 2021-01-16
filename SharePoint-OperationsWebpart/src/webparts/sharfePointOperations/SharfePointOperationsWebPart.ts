import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { SPHttpClient,ISPHttpClientOptions, SPHttpClientResponse } from "@microsoft/sp-http";
import { escape } from '@microsoft/sp-lodash-subset';
import {ISPListItem} from "./ISPListItem";
import {MockSharePointData} from "./MockSharePointData";
import styles from './SharfePointOperationsWebPart.module.scss';
import * as strings from 'SharfePointOperationsWebPartStrings';
import {Environment, EnvironmentType} from '@microsoft/sp-core-library';
import {IListdata} from "./IListdata";
export interface ISharfePointOperationsWebPartProps {
  description: string;
}

export default class SharfePointOperationsWebPart extends BaseClientSideWebPart <ISharfePointOperationsWebPartProps> {


  private getListData():Promise<IListdata>{
    let listNamevalue=this.properties.description;
    alert("listName"+listNamevalue);

return;
  }
  private UpdateList():any{
    const headers:any ={"X-HTTP-Method":"MERGE",
    "IF-MATCH":"*"};
    const ListDefn:any={
    "Title":"NewList1",
    "Description":"Created from SPFX with the update operation",
    "BaseTemplate":100,
    "AllowContentTypes":false,
    "ContentTypesEnabled":false,

    };
    const spclientOptions:ISPHttpClientOptions={
      "body":JSON.stringify(ListDefn),
      "headers":headers
    };
        this.context.spHttpClient.post("https://yavatmal5.sharepoint.com/sites/Permission/_api/web/lists/getbytitle('NewList1')", SPHttpClient.configurations.v1,spclientOptions)
        .then((data: SPHttpClientResponse) =>{
          if (data.status ===204)
          {
            alert("List has benn updated");
          }
         else{
            alert("ërror in list updation");
          }

      });
    }
    private DeleteList():any{
      const headers:any ={"X-HTTP-Method":"DELETE",
      "IF-MATCH":"*"};
      const ListDefn:any={
      "Title":"NewList1",
      "Description":"Created from SPFX with the update operation",
      "BaseTemplate":100,
      "AllowContentTypes":false,
      "ContentTypesEnabled":false,

      };
      const spclientOptions:ISPHttpClientOptions={

        "headers":headers
      };
          this.context.spHttpClient.post("https://yavatmal5.sharepoint.com/sites/Permission/_api/web/lists/getbytitle('NewList1')", SPHttpClient.configurations.v1,spclientOptions)
          .then((data: SPHttpClientResponse) =>{
            if (data.status ===204)
            {
              alert("List has benn DELETED");
            }
           else{
              alert("ërror in list DELETION");
            }

        });
      }

      private CreateListItem():any{
       const ItemDefn:any={
         "Title":"12",
       };

const isphttpOptions:ISPHttpClientOptions={
  "body":JSON.stringify(ItemDefn),
};
this.context.spHttpClient.post("https://yavatmal5.sharepoint.com/sites/Permission/_api/web/lists/getbytitle('NewList')/items", SPHttpClient.configurations.v1,isphttpOptions)
.then((data: SPHttpClientResponse) => {
  if(data.status ===201)
  {
    alert("Item is created successfully");
  }
  else{
    alert("error in Item creation");
  }
});

      }

      private UpdateListItem():any{
        const ItemDefination:any=
{
  "Title"  : "Updated"
};
const headers:any ={"X-HTTP-Method":"MERGE",
"IF-MATCH":"*"};
  const ISpClientSPHTTPClientOptions:ISPHttpClientOptions ={
"body": JSON.stringify(ItemDefination) ,
"headers": headers
  };
 this.context.spHttpClient.post("https://yavatmal5.sharepoint.com/sites/Permission/_api/web/lists/getbytitle('NewList')/items(1)", SPHttpClient.configurations.v1,ISpClientSPHTTPClientOptions)
 .then((data: SPHttpClientResponse) => {
   if(data.status ===204)
   {
     alert("Item is created updated");
   }
   else{
     alert("error in Item updation");
   }
 });

       }
private GetListItems():Promise<IListdata[]>{
  return this.context.spHttpClient.get("https://yavatmal5.sharepoint.com/sites/Permission/_api/web/lists/getbytitle('NewList')/items", SPHttpClient.configurations.v1)
  .then((data: SPHttpClientResponse) => data.json())
  .then((data: any) => {
    alert(JSON.stringify(data));
    return data.value;
  });
}
private GetListItem(id):Promise<IListdata>{
  return this.context.spHttpClient.get("https://yavatmal5.sharepoint.com/sites/Permission/_api/web/lists/getbytitle('NewList')/items('"+id+"')", SPHttpClient.configurations.v1)
  .then((data: SPHttpClientResponse) => data.json())
  .then((data: any) => {
    alert(JSON.stringify(data));
    return data;
  });
}
       private DeleteListItem(id):any{

const headers:any ={"X-HTTP-Method":"DELETE",
"IF-MATCH":"*"};
  const ISpClientSPHTTPClientOptions:ISPHttpClientOptions ={

"headers": headers
  };
 this.context.spHttpClient.post("https://yavatmal5.sharepoint.com/sites/Permission/_api/web/lists/getbytitle('NewList')/items('"+id+"')", SPHttpClient.configurations.v1,ISpClientSPHTTPClientOptions)
 .then((data: SPHttpClientResponse) => {
   if(data.status ===204)
   {
     alert("Item is DELETED");
   }
   else{
     alert("error in Item DELETION");
   }
 });

       }
  private CreateList():any{

const ListDefn:any={
"Title":"NewList1",
"Description":"Created from SPFX",
"BaseTemplate":100,
"AllowContentTypes":true,
"ContentTypesEnabled":true,

};
const spclientOptions:ISPHttpClientOptions={
  "body":JSON.stringify(ListDefn)
};
    this.context.spHttpClient.post("https://yavatmal5.sharepoint.com/sites/Permission/_api/web/lists", SPHttpClient.configurations.v1,spclientOptions)
    .then((data: SPHttpClientResponse) =>{
      if (data.status ===201)
      {
        alert("List has benn created");
      }
     else{
        alert("ërror in list creation");
      }

  });
}
  private checkListData():Promise<IListdata>{
    let listNamevalue=this.properties.description;
    alert("listName"+listNamevalue);
    this.context.spHttpClient.get(this.context.pageContext.web.absoluteUrl +"/_api/web/lists/GetByTitle('appdata')", SPHttpClient.configurations.v1)
.then((data: SPHttpClientResponse) => {
if(data.status=== 200)
{
  alert("list found");
// this.getListData();
this.context.spHttpClient.get(this.context.pageContext.web.absoluteUrl +"/_api/web/lists/GetByTitle('appdata')", SPHttpClient.configurations.v1)
.then((datavalue: SPHttpClientResponse) => datavalue.json())
.then((datavalue: any) => {
return datavalue;
});
}
else{
  alert("list dont exist");
  return;
}
});
 return;}
private getMockData():Promise<IListdata[]>{
  return null;
}
  private getItems():any{
    if (Environment.type === EnvironmentType.Local)
    {
       this.getMockData();

    }
    else{
      this.checkListData();

    }
  }
  protected  get disableReactivePropertyChanges():boolean{
    return true;
  }
  public render(): any {
  //  this.CreateList();
    //this.UpdateList();
   // this.DeleteList();
   this.CreateListItem();
  // this.GetListItem();
  // this.UpdateListItem();
   //this.DeleteListItem();
  //  let ItemData:string="";
  // this.checkListData().then(AllItems=>{
  //  ItemData +=
//`<div>${AllItems.Title}</div>`;
 // AllItems.map(Item=>{
  // ItemData +=
  // `<div>${Item.Title}</div>`;
  //});

//this.GetListItems().then(AllItems=>{
//  let itemstr:string="";
//AllItems.map(Item=>{
 // itemstr+= `<h6>${Item.Title} </h6>`;
//});
//this.context.domElement.innerHTML=itemstr;
//});
//this.GetListItem(4).then(Item=>{
 // let itemstr:string="";

 // itemstr+= `<h6>${Item.Title} & ${Item.Id}</h6>`;

//this.context.domElement.innerHTML=itemstr;
//});

this.GetListItems().then(AllItems=>{

  AllItems.map(Item=>{
   let  id= Item.Id ;
  this.DeleteListItem(id);
  }

    );


 } );




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
