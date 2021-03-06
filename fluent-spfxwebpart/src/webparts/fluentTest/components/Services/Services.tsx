import {
  SPHttpClient,
  SPHttpClientResponse,
  ISPHttpClientOptions,
} from "@microsoft/sp-http";
import { sp, List, PermissionKind } from "@pnp/sp/presets/all";
import { IListUpdateResult, ICamlQuery } from "@pnp/sp/lists";
export class ServiceClass {
  public async PNPGetItem(Id){
    alert(" pnp get item is called with async");
    let item= await sp.web.lists.getByTitle("0").items.getById(Id).get();

    console.log(item);
    return item;
  }
  public async PNPCreateListItem(values,MultiTextValue){

    try{

     alert("Create Item item TITLE"+JSON.stringify(values.Title));

    let newItem = await sp.web.lists.getByTitle('0').items.add({Title:values.Title,  multiline:values.multiline,multilinrrich:MultiTextValue,Yes:values.Yes,Date:values.Date,choice:values.choice,
userId:{results:values.user},Metadata: {
    "__metadata": { "type": "SP.Taxonomy.TaxonomyFieldValue" },
     "Label":values.Metadata[0].name,
    'TermGuid':values.Metadata[0].key ,
     'WssId': '-1',
  }});
    let id = await newItem.item.select("Id")();
   // alert("new list is created " + JSON.stringify(id));
   return id;
  }
    catch{
      alert("error in saving item");
     return 0;
    }

  }
  public async Createlist() {
    alert("Create list is called");
    let newlist = await sp.web.lists.ensure("PNPTest", "test", 101, true);

    let id = await newlist.list.select("Id")();
    alert("new list is created " + id);
  }
  public async DeleteList() {
    alert("Delete list is called");
    let newlist = await sp.web.lists.getByTitle("PNPTest");

    let id = await newlist.select("Id")();
    newlist.recycle();
    alert("List is deleted" + id);
  }
  public async UpdateList() {
    alert("Update list is called");
    let newlist = await sp.web.lists.getByTitle("Updated title");
    const updateProperties = {
      Description:
        "This list title and description has been updated using PnPjs.",
      Title: "Updated",
    };

    newlist.update(updateProperties).then((updated: IListUpdateResult) => {
      let newtitle = updated.list.select("Title")();
      alert(JSON.stringify(newtitle));
    });
  }
  public async getPNPListItems() {
    const items = await sp.web.lists.getByTitle("test676").items.getAll();

    return items;
    //alert(JSON.stringify(tempitems));

    //const count = await sp.web.lists.getByTitle("test676").items.orderBy("Id",false).select("Id").top(1).get();
    //alert("count"+count[0].Id);
  }

  public async getPNPListItemsCAML() {
    let pageSize = 5000;
    let minId: number = 0;
    let maxId: number = 0;
    let items: any[] = [];
    // alert("grid is called");
    const count = await (
      await sp.web.lists.getByTitle("0").items.getAll()
    ).length;

    //alert(Math.ceil(count/pageSize));
    for (var i = 0; i < Math.ceil(count / pageSize); i++) {
      minId = i * pageSize + 1;
      maxId = (i + 1) * pageSize;
      await this.getItemsCaml(minId, maxId).then((Items) => {
      //  console.log(Items);
        Items.map((Item) => {
          let metadatavalue=null;

        if(Item.Metadata != undefined)
        {
          metadatavalue =Item.Metadata.Label;
        }

          let lookupId=null;



          let temparray = items.push({ Id: Item.Id,multilinrrich:Item.FieldValuesAsText.multilinrrich,Version:Item.FieldValuesAsText.owshiddenversion,Metadata:metadatavalue,Title: Item.Title ,AuthorId:Item.FieldValuesAsText.Author,EditorId:Item.FieldValuesAsText.Editor ,user:Item.FieldValuesAsText.user,lookupId:Item.lookupId,Choices:Item.choice,multiline:Item.multiline,calculated:Item.calculated,Yes:Item.FieldValuesAsText.Yes});
        });
      });
    }

    //alert("passing items"+items);
    return items;
  }
  public async getItemsCaml(minId, maxId) {
    //  alert("ÏNTERNAL GRID IS CALLED");
    let batchItems: any[] = [];
    const query: ICamlQuery = {
      ViewXml:
        ` <View>

       <Query>
       <Where>
          <And>
             <Gt>
                <FieldRef Name='ID' />
                <Value Type='Counter'>` +
        minId +
        `</Value>
             </Gt>
             <Lt>
                <FieldRef Name='ID' />
                <Value Type='Counter'>` +
        maxId +
        `</Value>
             </Lt>
          </And>
       </Where>
     </Query>

     </View>`,
    };

    //alert("count"+count);
    const items = await sp.web.lists
      .getByTitle("0")
      .getItemsByCAMLQuery(query,"FieldValuesAsText","EditorId");
     // alert(JSON.stringify(items));
      console.log(items);
    // const temparray= batchItems.push();
    return items;
  }
  public async getListTitle() {
    let items: any[] = [];
    const lists = await sp.web.lists();

    // const allItems = await lists;

    // console.log(allItems);
    // allItems.map(Itemstemp=>{
    //  items.push(Itemstemp.Id);
    //});

    return lists;
  }

  public SaveData = (context, values, multilinrrich) => {
    //// alert(JSON.stringify(values.Title));
    //alert(values.metadata[0].key);
    //alert(values.metadata[0].name);

    var itemData: any = {
      Title: values.Title,
      userId: values.user,
      multiline: values.Multiline,
      Yes: values.YesNo,
      Date: values.Date,
      choice: values.choice,
      multilinrrich: multilinrrich,

      Metadata: {
        __metadata: { type: "SP.Taxonomy.TaxonomyFieldValue" },
        Label: "3",
        TermGuid: "f68947e3-c6c3-495a-bb2a-04add236ec27",
        WssId: -1,
      },
    };
    const isphhtpClientOptions: ISPHttpClientOptions = {
      body: JSON.stringify(itemData),
    };

    context.spHttpClient
      .post(
        "https://yavatmal3.sharepoint.com/sites/ModernTeam/_api/web/lists/getbytitle('0')/items",
        SPHttpClient.configurations.v1,
        isphhtpClientOptions
      )
      .then((data: SPHttpClientResponse) => {
        if (data.status === 201) {
          alert("item is added");
        } else {
          alert("item failure error" + data.status.toString());
        }
      });
  }
  public GetItems(context): Promise<any> {
    return context.spHttpClient
      .get(
        "https://yavatmal3.sharepoint.com/sites/ModernTeam/_api/web/lists/getbytitle('0')/items?&$select=Metadata,TaxCatchAll/ID,TaxCatchAll/Term,choice,Title,Date,user/ID,user/EMail,multilinrrich,multiline,lookup/Title,Versions,calculated,Yes,hyper,choice,Author/Title,Editor/Title&$expand=Editor&$expand=Author&$expand=lookup&$expand=user&$expand=TaxCatchAll",
        SPHttpClient.configurations.v1
      )
      .then((data: SPHttpClientResponse) => data.json())
      .then((data: any) => {
        return data.value;
      });
  }
  public BindDropDown = (context): Promise<any[]> => {
    let choice = "choice";
    return context.spHttpClient
      .get(
        "https://yavatmal3.sharepoint.com/sites/ModernTeam/_api/web/lists/getbytitle('0')/fields/getbytitle('" +
          choice +
          "')",
        SPHttpClient.configurations.v1
      )
      .then((data: SPHttpClientResponse) => data.json())
      .then((data: any) => {
        return data.Choices;
      });
  }
  public getDataforItem(context, id): Promise<any> {
    return context.spHttpClient
      .get(
        "https://yavatmal3.sharepoint.com/sites/ModernTeam/_api/web/lists/getbytitle('0')/items('" +
          id +
          "')?&$select=choice,Title,Date,user/ID,user/EMail,multilinrrich,multiline,lookup/Title,Versions,calculated,Yes,hyper,choice,Author/Title,Editor/Title&$expand=Editor&$expand=Author&$expand=lookup&$expand=user",
        SPHttpClient.configurations.v1
      )
      .then((data: SPHttpClientResponse) => data.json())
      .then((data: any) => {
        return data;
      });
  }
}
