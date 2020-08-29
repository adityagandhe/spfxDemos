import * as React from "react";
import styles from "./ReactSpfxTodo.module.scss";
import uuid from "React-uuid";
import { ITodoItem } from "./ITodoItem";
import ToDoItem from "./ToDoItem";
import { ColorPicker } from "office-ui-fabric-react/lib/ColorPicker";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import {
  TextField,
  MaskedTextField,
} from "office-ui-fabric-react/lib/TextField";
import {
  SPHttpClient,
  SPHttpClientResponse,
  ISPHttpClientOptions,
} from "@microsoft/sp-http";
import { initializeIcons } from "@uifabric/icons";
initializeIcons();
import { Icon } from "@fluentui/react/lib/Icon";

import {
  DetailsList,
  DetailsListLayoutMode,
  Selection,
  IColumn,
} from "office-ui-fabric-react/lib/DetailsList";
export interface IProps {
  description: string;
  siteUrl: any;
  spHttpClient: any;
}

export interface IState {
  item: string;
  idUpdate?: any;
  ListItems: ITodoItem[];
  edit: boolean;
}
//const listName =this.properties.description ;

//const url = this.context.pageContext.web.absoluteUrl +"/_api/web/lists/getbytitle('"+listName+"')";
export default class extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      item: "",
      ListItems: [],
      edit: false,
    };
    this.GetItems();
    // alert(this.state.ListItems);
  }
  public OnInputChange = (event) => {
    this.setState({
      item: event.target.value,
    });
  }
  public ButtonClick = () => {
    const newItem: ITodoItem = {
      Title: this.state.item,
    };
    const url =
      "https://yavatmal3.sharepoint.com/sites/modernteam/_api/web/lists/getbytitle('PropertyPanes90')/items";

    const isphttpOptions: ISPHttpClientOptions = {
      body: JSON.stringify(newItem),
    };
    this.props.spHttpClient
      .post(url, SPHttpClient.configurations.v1, isphttpOptions)
      .then((data: SPHttpClientResponse) => {
        if (data.status === 201) {
          //   alert("List Item has been successfully created");
          this.GetItems();
        } else {
          alert("List Item has been failed");
        }
      });

    this.setState({
      item: "",
      idUpdate: "",
      edit: false,
      ListItems: [...this.state.ListItems, newItem],
    });
  }
  public Clear = () => {
    //alert("clearing all the items");
    this.GetItems().then((items) => {
      items.map((item) => {
        this.Remove(item.Id);
      });
    });
  }
  public Remove = (id: any) => {
    const headers: any = { "X-HTTP-Method": "DELETE", "IF-MATCH": "*" };
    const ISpClientSPHTTPClientOptions: ISPHttpClientOptions = {
      headers: headers,
    };
    const url: any =
      "https://yavatmal3.sharepoint.com/sites/ModernTeam/_api/Web/Lists/getbytitle('PropertyPanes90')/items('" +
      id +
      "')";
    //const url: "https://yavatmal3.sharepoint.com/sites/ModernTeam/_api/Web/Lists/getbytitle('PropertyPanes90')/items(id)";
    this.props.spHttpClient
      .post(url, SPHttpClient.configurations.v1, ISpClientSPHTTPClientOptions)
      .then((response: SPHttpClientResponse) => {
        if (response.status === 204) {
          //alert("ïtem has been deleted");
          this.GetItems();
        } else {
          alert("failure in has been deleted");
        }
      });
  }

  public EditItem = (id: any, Title: string) => {
    // alert("click on edit");

    this.setState({
      idUpdate: id,
      item: Title,
    });
  }
  public Update = () => {
    const filteredItems = this.state.ListItems.filter(
      (item) => item.Id != this.state.idUpdate
    );
    const editedItem = this.state.ListItems.filter(
      (item) => item.Id === this.state.idUpdate
    );

    const url: any =
      "https://yavatmal3.sharepoint.com/sites/ModernTeam/_api/Web/Lists/getbytitle('PropertyPanes90')/items('" +
      this.state.idUpdate +
      "')";
    const ItemDefination: any = {
      Title: this.state.item,
      Id: this.state.idUpdate,
    };
    const headers: any = {
      "X-HTTP-Method": "MERGE",
      "IF-MATCH": "*",
    };
    const ISpClientSPHTTPClientOptions: ISPHttpClientOptions = {
      body: JSON.stringify(ItemDefination),
      headers: headers,
    };
    // const url:any= "https://yavatmal3.sharepoint.com/sites/ModernTeam/_api/Web/Lists/getbytitle('PropertyPanes90')/items('"+id+"')";
    this.props.spHttpClient
      .post(url, SPHttpClient.configurations.v1, ISpClientSPHTTPClientOptions)
      .then((response: SPHttpClientResponse) => {
        if (response.status === 204) {
          //  alert("item is updated");
          this.GetItems();
        } else {
          alert("Error in updating item");
        }
        this.setState({
          item: "",
        });
      });
  }
  public componentDidMount(): void {
    //this.GetItems();
  }
  public GetItems(): Promise<ITodoItem[]> {

    const url =
      "https://yavatmal3.sharepoint.com/sites/modernteam/_api/web/lists/getbytitle('PropertyPanes90')/items";


    return this.props.spHttpClient
      .get(url, SPHttpClient.configurations.v1)
      .then((data: SPHttpClientResponse) => data.json())
      .then((data: any) => {
        this.setState({ ListItems: data.value });
        return data.value;
      });
  }
  public render(): React.ReactElement<IProps> {
    return (
      <div>
        <TextField
          className=""
          label="Add item"
          value={this.state.item}
          placeholder="Add Item"
          onChange={this.OnInputChange}
        ></TextField>
        <button
          className={
            this.state.edit
              ? "btn btn-block btn-success mt-3"
              : "btn btn-block btn-primary mt-3"
          }
          type="Submit"
          onClick={this.ButtonClick}
        >
          Add
        </button>
        <button
          className={
            this.state.edit
              ? "btn btn-block btn-success mt-3"
              : "btn btn-block btn-primary mt-3"
          }
          type="Submit"
          onClick={this.Update}
        >
          Update
        </button>
        <ToDoItem
          value={this.state.ListItems}
          clear={this.Clear}
          remove={this.Remove}
          edit={this.EditItem}
        ></ToDoItem>
      </div>
    );
  }
}
