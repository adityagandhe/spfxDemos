import { SPHttpClient, SPHttpClientResponse } from "@microsoft/sp-http";
export default class ServicesClass {
  public FetchCarousal = (Context) => {
   return Context.spHttpClient.get("https://yavatmal5.sharepoint.com/sites/TestModern/_api/web/lists/getbytitle('Carousal')/items?&$select=EncodedAbsUrl,Title,Description,Url", SPHttpClient.configurations.v1)
    .then((data: SPHttpClientResponse) => data.json())
    .then((data: any) => {
      console.log("Data"+JSON.stringify(data));
      return data.value;
    });
}
public fetchView=(Context)=>{
  return Context.spHttpClient.get("https://yavatmal5.sharepoint.com/sites/TestModern/_api/web/lists/getbytitle('Carousal')/Fields?&$Select=Title,Description,Url", SPHttpClient.configurations.v1)
    .then((data: SPHttpClientResponse) => data.json())
    .then((data: any) => {
      console.log("fieldvalues"+JSON.stringify(data));
      return data.value;
    });
}
public fetchItem=(Context)=>{
  return Context.spHttpClient.get("https://yavatmal5.sharepoint.com/sites/TestModern/_api/web/lists/getbytitle('Carousal')/Items/?&$select=EncodedAbsUrl,Title,Description,Url", SPHttpClient.configurations.v1)
    .then((data: SPHttpClientResponse) => data.json())
    .then((data: any) => {
      console.log("Data"+JSON.stringify(data));

      return data.value;
    });
}
}
