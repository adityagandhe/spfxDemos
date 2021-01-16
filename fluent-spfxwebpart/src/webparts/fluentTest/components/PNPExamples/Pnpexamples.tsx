import * as React from 'react';
import { ListView, IViewField, SelectionMode, GroupOrder, IGrouping } from "@pnp/spfx-controls-react/lib/ListView";
import {ServiceClass} from "../Services/Services";
import { DetailsList, DetailsListLayoutMode, Selection, IColumn } from 'office-ui-fabric-react/lib/DetailsList';
import { sp, Items } from "@pnp/sp/presets/all";
import {IListItems} from "./IListItems";
import { Dropdown,IDropdownOption } from 'office-ui-fabric-react';
export interface IComponentProps {
  context:any;
}

export interface IComponentState {
  items?: IListItems[];
}
const viewFields: IViewField[] = [{
  name: "Title",
  displayName: "Title",
  isResizable: true,
  sorting: true,
  minWidth: 0,
  maxWidth: 150
},
{
  name: "Created",
  displayName: "Created",
  isResizable: true,
  sorting: true,
  minWidth: 0,
  maxWidth: 200
},
,];
export default class Component extends React.Component<IComponentProps, IComponentState> {

  public spOps:ServiceClass;
  constructor(props: IComponentProps) {
    super(props);
    this.spOps =new ServiceClass();
    this.state = {
      items:[],
    };

    sp.setup({
      spfxContext: this.props.context
    });
  }

public componentDidMount(){
let temp:IListItems[]=[];
this.spOps.getListTitle().then(AllItems=>{
  let DatevalueCreated = null;
AllItems.map(Item=>{
alert(JSON.stringify(Item));
 if (Item.Created != undefined) {
  DatevalueCreated = new Date(Item.Created);
  DatevalueCreated=DatevalueCreated.toLocaleDateString();
}
const arr =temp.push({Title:Item.Title,Created:DatevalueCreated});
});
this.setState({
  items:[...this.state.items,...temp]
});
});
}
  public render(): React.ReactElement<IComponentProps> {
    return (
      <div>



<button onClick={()=>{this.spOps.Createlist();}}>Create list</button>
<button onClick={()=>{this.spOps.UpdateList();}}>Update list</button>
<button onClick={()=>{this.spOps.DeleteList();}}>Delete list</button>
<ListView items={this.state.items}

viewFields={viewFields}
compact={true}
dragDropFiles={true}
stickyHeader={true}></ListView>
      </div>
    );
  }
}
