import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './ListItemOperationsWebPart.module.scss';
import * as strings from 'ListItemOperationsWebPartStrings';
import {ISPItems} from './ISPItems';
import { SPHttpClient, SPHttpClientResponse ,ISPHttpClientOptions } from "@microsoft/sp-http";
export interface IListItemOperationsWebPartProps {
  description: string;
}

export default class ListItemOperationsWebPart extends BaseClientSideWebPart <IListItemOperationsWebPartProps> {

  public render(): void {
    this.domElement.innerHTML = `
      <div class="${ styles.listItemOperations }">
    <div class="${ styles.container }">
  <h3>Perform List Item Operations<h3>
  <ul></ul>

  <p>Please Select Operation and click button</p>
  <span class=="${ styles.label }" >Select Operation</span>
  <button type="button" type="ms-button">
<span>Run Button</span>
</button>
  <Select>
<option value="Create">Create</option>
<option value="Read">Read</option>
<option value="Update">Update</option>
<option value="Delete">Delete</option>

  </Select>

  <div class="results">Please Select Operation and click button</div>
  <table> </table>
          </div>
          </div>`;

       this.itemsList=   this.domElement.getElementsByTagName("UL")[0] as HTMLUListElement ;
       this.operationSelect =this.domElement.getElementsByTagName("Select")[0] as HTMLSelectElement;
       const button:HTMLButtonElement =this.domElement.getElementsByTagName("BUTTON")[0] as HTMLButtonElement;
       this.runOperation =this.runOperation.bind(this);
       this.createListItem =this.createListItem.bind(this);
       this.updateListItem =this.updateListItem.bind(this);
       this.readListItem =this.readListItem.bind(this);
       this.deleteListItem =this.deleteListItem.bind(this);

    //   this.operationResults =this.domElement.getElementsByTagName("P")[0] as HTMLParagraphElement ;
    //this.operationResults =this.domElement.getElementsByClassName("results")[0] as HTMLDivElement;
    this.operationResults =this.domElement.getElementsByTagName("table")[0] as HTMLTableElement ;
       this.readAllItems= this.readAllItems.bind(this);
       button.onclick =this.runOperation;
       this.readAllItems();

  }
  private  itemsList :HTMLUListElement =null;
  private operationSelect:HTMLSelectElement =null;
  private operationResults:HTMLParagraphElement =null;
  private runOperation()
  {

    const operation:HTMLOptionElement =this.operationSelect[this.operationSelect.selectedIndex] as HTMLOptionElement;
    switch (operation.value)
       {
         case "Create":
           this.createListItem();
           break;
           case "Read":
           this.readListItem();
           break;
           case "Update":
            this.updateListItem();
            break;
            case "Delete":
              this.deleteListItem();
              break;
       }
  }
  private getAllItesm():Promise<ISPItems[]>{

    return this.context.spHttpClient.get(this.context.pageContext.web.absoluteUrl +"/_api/web/lists/getbytitle('SPFXListOperations')/items", SPHttpClient.configurations.v1)
    .then((data: SPHttpClientResponse) => data.json())
    .then((data: any) => {
      return data.value;
    });
  }

  private getItem(id:number):Promise<ISPItems[]>{

    return this.context.spHttpClient.get(this.context.pageContext.web.absoluteUrl +"/_api/web/lists/getbytitle('SPFXListOperations')/items", SPHttpClient.configurations.v1)
    .then((data: SPHttpClientResponse) => data.json())
    .then((data: any) => {
      return data.value;
    });
  }
  private readAllItems():void{

    this.getAllItesm().then(AllItems=>{
      let itemstr:string="";
      AllItems.map(Item=>{itemstr+=`<li>${Item.Title}</li>`;});
      this.itemsList.innerHTML =itemstr;
     } );
  }
  private createListItem():void
  {
   const ItemDefination:any={
     "Title":"New Item",
   };
this.operationResults.innerHTML ="Create list Item";
const ISpClientSPHTTPClientOptions:ISPHttpClientOptions ={
  "body":JSON.stringify(ItemDefination)
};
this.context.spHttpClient.post(this.context.pageContext.web.absoluteUrl +"/_api/web/lists/getbytitle('SPFXListOperations')/items", SPHttpClient.configurations.v1,ISpClientSPHTTPClientOptions)
.then((response:SPHttpClientResponse)=>{
  if (response.status ===201)
{
  this.operationResults.innerHTML ="List Item has been successfully created";
  this.readAllItems();
}
else{
  this.operationResults.innerHTML ="Error in list item creation";
}
});
  }

  private readListItem():void
  {
    this.operationResults.innerHTML ="Read list Item";
    const id :number= 1;
    this.getItem(id).then(ListItems=>{
      let itemstr:string="";
      ListItems.map(Item=>{
        itemstr += `

     <tr> <td>${Item.Title}</td> <td>${Item.Id}</td> <td>${Item.Multi}</td> <td>${Item.City}</td><td>${Item.Yes_x002f_No}</td><td>${Item.Created}</td><td>${Item.Modified}</td></tr>


     `;
});

this.operationResults.innerHTML +=itemstr;
    });


  }
  private updateListItem():void
{
  this.operationResults.innerHTML ="Update list Item";

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

  this.context.spHttpClient.post(this.context.pageContext.web.absoluteUrl +"/_api/web/lists/getbytitle('SPFXListOperations')/items(1)", SPHttpClient.configurations.v1,ISpClientSPHTTPClientOptions)
  .then((response: SPHttpClientResponse) => {
    if(response.status ===204)
{

  this.operationResults .innerHTML="Updated the items";
  this.getAllItesm();
}
else{
  this.operationResults .innerHTML="Error in upding  the items";
}
});
}

private DeleteAllItems(id:string)
{

  const headers:any ={"X-HTTP-Method":"DELETE",
"IF-MATCH":"*"};
  const ISpClientSPHTTPClientOptions:ISPHttpClientOptions ={
"headers": headers
  };

  this.context.spHttpClient.post("https://yavatmal3.sharepoint.com/sites/ModernTeam/_api/Web/Lists/getbytitle('SPFXListOperations')/items('"+id+"')", SPHttpClient.configurations.v1,ISpClientSPHTTPClientOptions)
  .then((response: SPHttpClientResponse) => {
    if(response.status ===204)
{

  this.operationResults .innerHTML="Deleted the items";
  this.getAllItesm();
}
else{
  this.operationResults .innerHTML="Error in deleting  the items";
}
});
}
private deleteListItem():void
{
  this.operationResults.innerHTML ="Delete list Item";

  this.getAllItesm().then(AllItems=>{
    let itemstr:string="";
    AllItems.map(Item=>{
     let  id= Item.Id ;
      this.DeleteAllItems(id);
    }

      );
    this.itemsList.innerHTML =itemstr;
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
