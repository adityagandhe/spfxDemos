import {IPNPGrid} from "./IPNPGrid";
import * as React from 'react';
import {sp, Item} from "@pnp/sp/presets/all";
import {
  DetailsList,
  DetailsListLayoutMode,
  Selection,

  IColumn,
} from 'office-ui-fabric-react/lib/DetailsList';
import { ListView, IViewField, SelectionMode, GroupOrder, IGrouping } from "@pnp/spfx-controls-react/lib/ListView";
import {ServiceClass} from "../Services/Services";
export interface IComponentProps {
  context:any;
}

export interface IComponentState {
  allItems?:IPNPGrid[];
}

export default class Component extends React.Component<IComponentProps, IComponentState> {
public spops:ServiceClass;
  constructor(props: IComponentProps) {
    super(props);

    this.state = {
      allItems:[],
    };
    sp.setup({
      spfxContext: this.props.context
    });
    this.spops=new ServiceClass();
  }
public componentDidMount(){
  this.spops.getPNPListItemsCAML().then(Items=>{
    console.log(Items);
    let Itemsval:IPNPGrid[]=[];
Items.map(Itemtemp=>{
 //alert("Single Item"+JSON.stringify(Itemtemp));

  //alert(Itemtemp.Title);
  let DatevalueCreated=null;
  let modified=null;
  if (Itemtemp.Created != undefined) {
    DatevalueCreated = new Date(Itemtemp.Created);
    DatevalueCreated=DatevalueCreated.toLocaleDateString();
  }
  if (Itemtemp.Modified != undefined) {
    modified = new Date(Itemtemp.Modified);
    modified=modified.toLocaleDateString();
  }
  let lookupId;
  let uservalue;
  if(Itemtemp.lookup != undefined)
  {
   lookupId= Itemtemp.lookup.Title.toString();
   //alert("lookupvalue"+lookupId);
  }

 const arraytemp= Itemsval.push({Id:Itemtemp.Id,multilinrrich:Itemtemp.multilinrrich,Versions:Itemtemp.Version,Yes:Itemtemp.Yes,calculated:Itemtemp.calculated,multiline:Itemtemp.multiline,Metadata:Itemtemp.Metadata,Title:Itemtemp.Title,AuthorId:Itemtemp.AuthorId,EditorId:Itemtemp.EditorId,userId:Itemtemp.user,choice:Itemtemp.Choices});
});
    this.setState({
      allItems:[...this.state.allItems,...Itemsval],
    });
  });
}
  public render(): React.ReactElement<IComponentProps> {
    return (
      <div>
        pnp grid view

<ListView items={this.state.allItems}></ListView>
      </div>
    );
  }
}
