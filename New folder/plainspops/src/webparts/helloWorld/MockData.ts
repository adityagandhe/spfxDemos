import {ISPItems} from './ISPItems';
export default class MockData{
  private static listItems:ISPItems[]=
  [
    {Id:"1",Title:"First",LastItemUserModifiedDate:""},
    {Id:"2",Title:"First",LastItemUserModifiedDate:""},
    {Id:"3",Title:"three",LastItemUserModifiedDate:""},
    {Id:"4",Title:"four",LastItemUserModifiedDate:""},
    {Id:"5",Title:"five",LastItemUserModifiedDate:""},
    {Id:"6",Title:"six",LastItemUserModifiedDate:""},
    {Id:"7",Title:"seven",LastItemUserModifiedDate:""},
    {Id:"8",Title:"eight",LastItemUserModifiedDate:""},
    {Id:"9",Title:"nine",LastItemUserModifiedDate:""},
    {Id:"10",Title:"ten",LastItemUserModifiedDate:""}


  ];

  public static Get(url:string,options?:any):Promise<ISPItems[]>
  {
    return new Promise<ISPItems[]>((resolve)=>{resolve(MockData.listItems);});
  }
}
