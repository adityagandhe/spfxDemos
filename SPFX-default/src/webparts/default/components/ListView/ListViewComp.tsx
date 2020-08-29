import * as React from 'react';
import styles from '../Default.module.scss';
import ComponentCurosal from '../Curousal/ComponentCurousal';
import {IComponentProps} from "./IListViewProps";
import {IComponentState} from "./IListViewState";
import { ListView, IViewField, SelectionMode, GroupOrder, IGrouping } from "@pnp/spfx-controls-react/lib/ListView";
import ServicesClass from '../Services/FetchData';




const groupByFields: IGrouping[] = [
  {
    name: "Status",
    order: GroupOrder.ascending
  },];
export default class Component extends React.Component<IComponentProps, IComponentState> {
  public sp_ops:ServicesClass;
  constructor(props: IComponentProps) {
    super(props);
    this.sp_ops = new ServicesClass();
    this.state = {
      items:null,
      viewFields: [{
        name: "File",
        displayName: "File",
        isResizable: true,
        sorting: true,
        minWidth: 0,
        maxWidth: 150
      },
      {
        name: "Title",
        displayName: "Title",
        isResizable: true,
        sorting: true,
        minWidth: 0,
        maxWidth: 200
      },
      {
        name: "Description",
        displayName: "Description",
        isResizable: true,
        sorting: true,
        minWidth: 0,
        maxWidth: 200
      },
      {
        name: "Url",
        displayName: "Url",
        isResizable: true,
        sorting: true,
        minWidth: 0,
        maxWidth: 150
      }],

    };
  }
  public componentDidMount()
  {
    let temp_item:any[]=[];


  this.sp_ops.fetchItem(this.props.ContextValue).then(Items=>{

    Items.map(Item=>{

     let ItemValue={
      File: Item.EncodedAbsUrl,
      Title: Item.Title,
      Description: Item.Description,
      Url: Item.Url,

     };
     temp_item.push(ItemValue);

    });
    this.setState({items:temp_item
    });
  });
  }
 public _getSelection=(items: any[])=>{
  alert('Selected items:'+JSON.stringify(items) );
 }
  public render(): React.ReactElement<IComponentProps> {
    return (
      <div>
      <ComponentCurosal description={this.props.description} ContextValue={this.props.ContextValue}></ComponentCurosal>
      <div className={ styles.default }>
         <div className={ styles.container }>
         <div className={ styles.row }>


        <ListView
  items={this.state.items}
  viewFields={this.state.viewFields}
  iconFieldName="ServerRelativeUrl"
  compact={true}
  selectionMode={SelectionMode.multiple}
  selection={this._getSelection}
  showFilter={true}
  defaultFilter=""
  filterPlaceHolder="Search..."
   />

</div>
</div>
</div>
</div>

    );
  }
}
