import {ISPListItem} from "./ISPListItem";


export class MockSharePointData{

  public static _listItems:ISPListItem[]=[
    { Id: "1",Title:"First Item" },
    { Id: "2",Title:"second Item" },
     { Id: "3",Title:"third Item" },
     { Id: "4",Title:"fourth Item" }
   ];
   public static get(restUrl:string,option?:any) :Promise<ISPListItem[]>{
     return new Promise<ISPListItem[]>((resolve)=>{resolve(MockSharePointData._listItems);});
   }
}
