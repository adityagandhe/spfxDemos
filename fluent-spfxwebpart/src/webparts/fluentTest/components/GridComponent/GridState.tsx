import * as React from 'react';
import { SPHttpClient, SPHttpClientResponse } from "@microsoft/sp-http";
import { MarqueeSelection } from 'office-ui-fabric-react/lib/MarqueeSelection';
import { DetailsList, DetailsListLayoutMode, Selection, IColumn } from 'office-ui-fabric-react/lib/DetailsList';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import {IListItems} from './IListItems';
import {ServiceClass} from "../Services/Services";
export interface IComponentProps {
  context:any;
}

export interface IComponentState {
  listItems:IListItems[];
  selectionDetails?: string;
}


export default class Component extends React.Component<IComponentProps, IComponentState> {
  private _selection: Selection;
  public spops:ServiceClass;
  constructor(props: IComponentProps) {
    super(props);
    this.spops =new ServiceClass();
    this._selection = new Selection({
      onSelectionChanged: () => this.setState({ selectionDetails: this._getSelectionDetails() }),
    });

    this.state = {
      listItems:[]=[],
      selectionDetails: this._getSelectionDetails(),

    };

  }
  private _getSelectionDetails(): string {
    const selectionCount = this._selection.getSelectedCount();
//alert("selection called with count"+selectionCount);
    switch (selectionCount) {
      case 0:
        return 'No items selected';
      case 1:
        return '1 item selected: ' + (this._selection.getSelection()[0] as IListItems).Title;
      default:
        return `${selectionCount} items selected`;
    }
  }



public componentDidMount(){
  let temp:IListItems[]=[];
  let DatevalueModified = null;
  let DatevalueCreated = null;
//alert("compoonent mounted");
this.spops.GetItems(this.props.context).then(AllItems=>{

  AllItems.map(Item=>{
    DatevalueModified = null;
     DatevalueCreated = null;
   //  alert("yes"+Item.Yes.toString());
          if (Item.Modified != undefined) {
            DatevalueModified = new Date(Item.Modified);
            DatevalueModified= DatevalueModified.toLocaleDateString();

          }

          if (Item.Created != undefined) {
            DatevalueCreated = new Date(Item.Created);
            DatevalueCreated=DatevalueCreated.toLocaleDateString();
          }
          let hyperlink;
 if(Item.hyper != undefined)
 {
  hyperlink= Item.hyper.Url;
 }
 let lookupId;
 if(Item.lookup != undefined)
 {
  lookupId= Item.lookup.Title.toString();
 }
 let richtxt;
 if(Item.multilinrrich != undefined)
 {
   //alert(Item.multilinrrich);
  richtxt= Item.multilinrrich;

 }
const arreyValue=temp.push({multiline:Item.multiline,multilinrrich:richtxt});

});

this.setState({
  listItems:[...this.state.listItems,...temp]
  });
});

}
private _onItemInvoked = (item: IListItems): void => {
  alert(`Item invoked: ${item.Id}`);
}

  public render(): React.ReactElement<IComponentProps> {

    return (

      <Fabric>
           <div >{this.state.selectionDetails}</div>
             <MarqueeSelection selection={this._selection}>
      <DetailsList
            items={this.state.listItems}

            setKey="set"
            layoutMode={DetailsListLayoutMode.justified}

            selection={this._selection}
            selectionPreservedOnEmptyClick={true}
            ariaLabelForSelectionColumn="Toggle selection"
            ariaLabelForSelectAllCheckbox="Toggle selection for all items"
            checkButtonAriaLabel="Row checkbox"
            onItemInvoked={this._onItemInvoked}
          />
          </MarqueeSelection>
      </Fabric>
    );
  }
}
