import * as React from 'react';
import { UrlQueryParameterCollection } from "@microsoft/sp-core-library";
import styles from '../FluentTest.module.scss';
import { PeoplePicker, PrincipalType } from "@pnp/spfx-controls-react/lib/PeoplePicker";
import { SPHttpClient, SPHttpClientResponse,ISPHttpClientOptions } from "@microsoft/sp-http";
import { Toggle ,Label,TextField ,DatePicker, autobind ,Dropdown,IDropdownOption} from 'office-ui-fabric-react';
import { RichText } from "@pnp/spfx-controls-react/lib/RichText";
import { ComboBoxListItemPicker } from '@pnp/spfx-controls-react/lib/ListItemPicker';
import { FieldLookupRenderer } from "@pnp/spfx-controls-react/lib/FieldLookupRenderer";
import { ISPFieldLookupValue } from '@pnp/spfx-controls-react/lib/Common';
import { TaxonomyPicker, IPickerTerms } from "@pnp/spfx-controls-react/lib/TaxonomyPicker";
import {ServiceClass} from "../Services/Services";
export interface IComponentProps {
  description:string;
  context:any;
  Weburl:string;
}

export interface IComponentState {
  Title:string;
  Disabled?:boolean;
  Multiline?:string;
  Multilinerichtext?:string;
  YesNo?:any;
  Date?:any;
  user?:any[];
  LoggedInUserPPDefaultItems?:any;
  choice?:any;

  metadata?:any;
}
const options: IDropdownOption[] = [
 // { key: 'Choice 1', text: 'Choice 1' },
 // { key: 'Choice 2', text: 'Choice 2' },
 // { key: 'Choice 3', text: 'Choice 3' },
];
export default class Component extends React.Component<IComponentProps, IComponentState> {
  public MultiTextValue = "";
  public spOps:ServiceClass;
  constructor(props: IComponentProps) {
    super(props);
this.spOps =new ServiceClass();
    this.state = {
Title:null,
Multiline:null,
Multilinerichtext:null,
Disabled:false,
YesNo:false,
Date:null,
user:null,
LoggedInUserPPDefaultItems:null,
choice:null,

metadata:null,
    };
  }
 public OnFieldChange=(event)=>{
   this.setState({
Title:event.target.value,
   });
 }

 public MultilineChanged=(event)=>{
  this.setState({
    Multiline:event.target.value,
  });
}
public DateChange = (date: any) => {
  alert(date);
  this.setState({ Date: date });
}
public YesNoChange=(
  ev: React.MouseEvent<HTMLElement>,
  checked: boolean
) => {
  this.setState({
    YesNo: checked ? true : false,
  });
}
@autobind
private _getPeoplePickerItems(items: any[]) {
  let getSelectedUsers:number[] = [];
      for (let item in items) {

        getSelectedUsers.push(items[item].id);
      }
  alert(getSelectedUsers);
  this.setState({ user: getSelectedUsers });

  }

private onChoiceSelectedItem=  (
  event: React.FormEvent<HTMLDivElement>,
  item: IDropdownOption
) => {
  this.setState({
    choice: item.text,
  });
}
public componentDidMount() {
  this.spOps.BindDropDown(this.props.context).then(Items=>{
Items.map(optionvalue=>{
  options.push({ key: optionvalue, text: optionvalue });
});
  });
  let queryParameters = new UrlQueryParameterCollection(window.location.href);
let id=0;
  if (queryParameters.getValue("Id")) {
    id = parseInt(queryParameters.getValue("Id"));
   this.spOps.getDataforItem(this.props.context,id).then(Item=>{
     let datefeild;
    if (Item.Date != undefined) {
      datefeild = new Date(Item.Date);


    }
    const users_new: string[] = [];
    const defaultEmail: any[] = [];
    if (Item.user != undefined) {
      Item.user.map((uservalue) => {
        console.log("user" + JSON.stringify(uservalue));
        defaultEmail.push(uservalue.EMail);
        users_new.push(uservalue.ID);
      });
    }
    alert("Choice"+Item.choice);
this.setState({

  Title:Item.Title,
  user:Item.user,
  Multiline:Item.multiline,
  YesNo:Item.Yes,
  Date:datefeild,
  LoggedInUserPPDefaultItems:defaultEmail,
  choice:Item.choice,
  Multilinerichtext:Item.multilinrrich,
  metadata:Item.Metadata,
});

   });
}
}
public onRichTextChange=(newText)=>{
this.MultiTextValue=newText;
  return newText;
}
public lookupsValue(){}
public onTaxPickerChange=(terms : IPickerTerms)=>{
  this.setState({
metadata:terms
  });
}
  public render(): React.ReactElement<IComponentProps> {
    const {Title,Multiline, Disabled,YesNo,Date,user,choice,Multilinerichtext,metadata}=this.state;
    const values={Title,Multiline, Disabled,YesNo,Date,user,choice,Multilinerichtext,metadata};


    return (
      <div>
This is the form component {this.props.description}

<div className={styles.fluentTest}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className="ms-Grid" dir="ltr">
            <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg4">
                  <Label className={styles.subTitle} defaultValue="Title">
                    Title
                  </Label>
                </div>
                <div className="ms-Grid-col ms-sm6 ms-md8 ms-lg8">
                  <TextField
                    placeholder="Enter Title"
                    value={this.state.Title}
                    onChange={this.OnFieldChange}
                    disabled={this.state.Disabled}
                  ></TextField>
                </div>
              </div>

              <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg4">
                  <Label className={styles.subTitle} defaultValue="Title">
                    Multiline
                  </Label>
                </div>
                <div className="ms-Grid-col ms-sm6 ms-md8 ms-lg8">
                  <TextField
                    placeholder="Enter Multiline Text"
                    multiline autoAdjustHeight
                    value={this.state.Multiline}
                    onChange={this.MultilineChanged}
                    disabled={this.state.Disabled}
                  ></TextField>
                </div>
              </div>
              <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg4">
                  <Label className={styles.subTitle} defaultValue="Title">
                    Multiline richtext
                  </Label>
                </div>
                <div className="ms-Grid-col ms-sm6 ms-md8 ms-lg8">
                <RichText value={this.state.Multilinerichtext}
          onChange={(text)=>this.onRichTextChange(text)}
/>
                </div>
              </div>
              <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg4">
                  <Label className={styles.subTitle} defaultValue="Title">
                    Yes/No
                  </Label>
                </div>
                <div className="ms-Grid-col ms-sm6 ms-md8 ms-lg8">
                <Toggle
                      onChange={this.YesNoChange}
                      disabled={this.state.Disabled}
                      onText="Yes"
                      offText="No"
                      defaultValue={this.state.YesNo}
                    ></Toggle>
                </div>
              </div>
              <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg4">
                  <Label className={styles.subTitle} defaultValue="Title">
                  lookup
                  </Label>
                </div>
                <div className="ms-Grid-col ms-sm6 ms-md8 ms-lg8">

                </div>
              </div>

              <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg4">
                  <Label className={styles.subTitle} defaultValue="Title">
                  Date
                  </Label>
                </div>
                <div className="ms-Grid-col ms-sm6 ms-md8 ms-lg8">
                <DatePicker
                    placeholder="Select a date..."
                    allowTextInput={true}
                    value={this.state.Date}
                    onSelectDate={this.DateChange}
                    disabled={this.state.Disabled}
                    defaultValue={this.state.Date}
                  ></DatePicker>

                </div>
              </div>
 <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg4">
                  <Label className={styles.subTitle} defaultValue="Title">
                  Metadata
                  </Label>
                </div>
                <div className="ms-Grid-col ms-sm6 ms-md8 ms-lg8">
                <TaxonomyPicker allowMultipleSelections={false}
                termsetNameOrID="State"
                panelTitle="Select Term"
                label="Taxonomy Picker"
                context={this.props.context}
                onChange={this.onTaxPickerChange}
                isTermSetSelectable={false} />

                </div>
              </div>
              <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg4">
                  <Label className={styles.subTitle} defaultValue="Title">
                  Users
                  </Label>
                </div>
                <div className="ms-Grid-col ms-sm6 ms-md8 ms-lg8">
                <PeoplePicker
                      context={this.props.context}
                      titleText=""
                      personSelectionLimit={10}
                      groupName={""} // Leave this blank in case you want to filter from all users
                      showtooltip={true}

                      ensureUser={true}
                      onChange={this._getPeoplePickerItems}
                      showHiddenInUI={false}
                      principalTypes={[PrincipalType.User]}
                      resolveDelay={1000}
defaultSelectedUsers={
  this.state.LoggedInUserPPDefaultItems
    ? this.state.LoggedInUserPPDefaultItems
    : []
}
                      disabled={this.state.Disabled}
                    />
                </div>
                <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg4">
                  <Label className={styles.subTitle} defaultValue="Title">
                  Choices
                  </Label>
                </div>
                <div className="ms-Grid-col ms-sm6 ms-md8 ms-lg8">



       <Dropdown
                    onChange={this.onChoiceSelectedItem}
                    options={options}
                    selectedKey={this.state.choice}
                    disabled={this.state.Disabled}
                  ></Dropdown>

                </div>
                </div>
                <button onClick={()=>this.spOps.SaveData(this.props.context,values,this.MultiTextValue)}>Save Data</button>
              </div>
      </div>
      </div>
      </div>
      </div>
      </div>
    );
  }
}
