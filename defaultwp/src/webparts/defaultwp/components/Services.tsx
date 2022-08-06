import { sp } from "@pnp/sp/presets/all";
import { Logger, LogLevel } from "@pnp/logging";

export class Services{

  public async GetAllListTitles(){
//let lists = await sp.web.webs();
const result = await sp.web.lists.add("pnptest");
let id = await result.list.select("Id");
alert("id of the new list"+id);
let user = await sp.web.currentUser.get();
//alert(JSON.stringify(user.Email));
let site =await sp.web.associatedMemberGroup.get();
alert(JSON.stringify(site));
let listsdel= await await sp.web.lists.filter("Title eq 'UpdatedTitle'").get();
let del =await listsdel.map(newList=>{
  //this.DeleteOneList(newList.Title);
});
let parentweb = await sp.web.getParentWeb();
//alert("PARENTWEB"+JSON.stringify(parentweb));
let userweb =await sp.web.getSubwebsFilteredForCurrentUser().select("Title", "Language").orderBy("Created", true).get();
//alert("userweb"+JSON.stringify(userweb));
let specificweb = await sp.web.webs.filter("Title eq 'test1'").get();
//alert("specificweb"+JSON.stringify(specificweb));
//let lists= await sp.web.lists.filter("Title eq 'UpdatedTitle'").select("Title").orderBy("Title").top(10).get();
let lists= await sp.web.lists.filter("Hidden eq false").select("Title").orderBy("Title").top(100).get();
//alert(JSON.stringify(lists));
return lists;
  }

  public async DeleteList(){
    try{

   // alert("Delete list is called");
 //this.DeleteOneList("UpdatedTitle");
    let lists= await await sp.web.lists.filter("Title eq 'UpdatedTitle'").select("Title").orderBy("Title").top(100).get();
   // let newlist = await sp.web.lists.getByTitle("UpdatedTitle");
    //alert("list"+JSON.stringify(lists));
   // alert("list count"+ await newlist.length);
   // let newlists=  await sp.web.lists.getByTitle()
    //let id = await newlist.select("Title")();
    lists.map(newList=>{

    const wait= ()=>this.DeleteOneList(newList.Title);

    },()=>alert("lists deleted"));
  }
    catch (e) {


      Logger.write("Services.tsx file has the issue in DeleteList Method with error :"+e,LogLevel.Error);
    }
  }
  public test=()=>{
  //  alert("test is called");
  }
  public async  DeleteOneList(Title?:any){
   // alert("deleting the particular list");
  let newlist = await sp.web.lists.getByTitle(Title);


  newlist.recycle();
 // alert("list deleted");
  }
  public CreateErrorEntry (entry,user,date){
alert("message"+entry);
alert("user"+user);
alert("date"+date);
  }
}
