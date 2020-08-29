import {
  SPHttpClient,
  SPHttpClientResponse,
  ISPHttpClientOptions,
} from "@microsoft/sp-http";

import { ICity } from "./ICity";
export class ServicesClass {
  public SubmitData = (spHttpClient, values, MultiTextValue) => {
    alert("values" + values.Date);
    var ListItem: any = {
      Title: values.Title,
      Comments: values.Comments,
      City: values.City,
      MultilineColumn: values.MultiLineColumn,
      Location: values.Location,
      Number: values.Number,
      Currency: values.Currency,
      Date: values.Date,
      YesNo: values.YesNo,
      RichText: MultiTextValue,
      HyperLink: {
        Description: values.HyperLinkText,
        Url: values.HyperLinkUrl,
      },
      PersonId: values.Users,
    };
    const IsphttpClinetOption: ISPHttpClientOptions = {
      body: JSON.stringify(ListItem),
    };

    spHttpClient
      .post(
        "https://yavatmal5.sharepoint.com/sites/TestModern/_api/web/lists/getbytitle('ApprovalList')/items",
        SPHttpClient.configurations.v1,
        IsphttpClinetOption
      )
      .then((data: SPHttpClientResponse) => {
        if (data.status === 201) {
          alert("List Item has been created successfully");
        } else {
          alert("failed with status" + data.statusText);
        }
      });
  };

  public UpdateData = (spHttpClient, Id, values, MultiTextValue) => {
    alert("id to update" + Id);
    var ListItem: any = {
      Title: values.Title,
      Comments: values.Comments,
      City: values.City,
      MultilineColumn: values.MultiLineColumn,
      Location: values.Location,
      Number: values.Number,
      Currency: values.Currency,
      Date: values.Date,
      YesNo: values.YesNo,
      RichText: MultiTextValue,
      HyperLink: {
        Description: values.HyperLinkText,
        Url: values.HyperLinkUrl,
      },
      PersonId: values.Users,
    };
    const headers: any = { "X-HTTP-Method": "MERGE", "IF-MATCH": "*" };
    const IsphttpClinetOption: ISPHttpClientOptions = {
      body: JSON.stringify(ListItem),
      headers: headers,
    };

    spHttpClient
      .post(
        "https://yavatmal5.sharepoint.com/sites/TestModern/_api/web/lists/getbytitle('ApprovalList')/items('" +
          Id +
          "')",
        SPHttpClient.configurations.v1,
        IsphttpClinetOption
      )
      .then((data: SPHttpClientResponse) => {
        if (data.status === 204) {
          alert("List Item has been updated successfully");
        } else {
          alert("failed with status" + data.statusText);
        }
      });
  };
  public DeleteItem = (spHttpClient, Id) => {
    alert("id to update" + Id);

    const headers: any = { "X-HTTP-Method": "DELETE", "IF-MATCH": "*" };
    const IsphttpClinetOption: ISPHttpClientOptions = {
      headers: headers,
    };

    spHttpClient
      .post(
        "https://yavatmal5.sharepoint.com/sites/TestModern/_api/web/lists/getbytitle('ApprovalList')/items('" +
          Id +
          "')",
        SPHttpClient.configurations.v1,
        IsphttpClinetOption
      )
      .then((data: SPHttpClientResponse) => {
        if (data.status === 204) {
          alert("List Item has been DELETED successfully");
        } else {
          alert("failed with status" + data.statusText);
        }
      });
  };
  public BindDropDown = (spHttpClient): Promise<any[]> => {
    let city = "City";
    return spHttpClient
      .get(
        "https://yavatmal5.sharepoint.com/sites/TestModern/_api/web/lists/getbytitle('ApprovalList')/fields/getbytitle('" +
          city +
          "')",
        SPHttpClient.configurations.v1
      )
      .then((data: SPHttpClientResponse) => data.json())
      .then((data: any) => {
        return data.Choices;
      });
  };

  public GetItemDetails = (spHttpClient, Id): Promise<any> => {
    return spHttpClient
      .get(
        "https://yavatmal5.sharepoint.com/sites/TestModern/_api/web/lists/getbytitle('ApprovalList')/items('" +
          Id +
          "')?&$select=Title,Comments,City,MultilineColumn,Number,Currency,YesNo,HyperLink,RichText,Date,Person/ID,Person/EMail&$expand=Person&$expand=Person",
        SPHttpClient.configurations.v1
      )
      .then((data: SPHttpClientResponse) => data.json())
      .then((data: any) => {
        //  console.log(JSON.stringify(data));
        return data;
      });
  };
}
