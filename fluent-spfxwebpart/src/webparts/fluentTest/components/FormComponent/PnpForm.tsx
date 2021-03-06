import * as React from 'react';
import { UrlQueryParameterCollection } from "@microsoft/sp-core-library";
import styles from '../FluentTest.module.scss';
import { PeoplePicker, PrincipalType } from "@pnp/spfx-controls-react/lib/PeoplePicker";
import { SPHttpClient, SPHttpClientResponse,ISPHttpClientOptions } from "@microsoft/sp-http";
import { Toggle ,Label,TextField ,DatePicker, autobind ,Dropdown,IDropdownOption} from 'office-ui-fabric-react';
import { RichText } from "@pnp/spfx-controls-react/lib/RichText";
import { ComboBoxListItemPicker } from '@pnp/spfx-controls-react/lib/ListItemPicker';
import { FieldLookupRenderer, IFieldLookupClickEventArgs } from "@pnp/spfx-controls-react/lib/FieldLookupRenderer";
import { ISPFieldLookupValue } from '@pnp/spfx-controls-react/lib/Common';
import { TaxonomyPicker, IPickerTerms, IPickerTerm } from "@pnp/spfx-controls-react/lib/TaxonomyPicker";

import {ServiceClass} from "../Services/Services";
import {IForm} from "./IForm";
import { sp, ISiteUserProps } from '@pnp/sp/presets/all';
export interface IComponentProps {
  description:string;
  context:any;
  Weburl:string;
}

export interface IComponentState {
  Title?:string;
   Id?:string;
   Modified?:any;
   Created?:any;
   EditorId?:string;
   AuthorId?:string;
   Yes?:boolean;
   user?:any[];
   choice?:string;
   hyper?:string;
   calculated?:string;
   lookupId?:any[];
   Date?:any;
   Versions?:string;
multiline?:string;
multilinrrich?:string;
Metadata?:IPickerTerms;
LoggedInUserPPDefaultItems?:any[];
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
    sp.setup({
      spfxContext: this.props.context
    });
this.spOps =new ServiceClass();
    this.state = {

    Title:null,
   Id:null,
   Modified:null,
   Created:null,
   EditorId:null,
   AuthorId:null,
   Yes:null,
   user:[],
   choice:null,
   hyper:null,
   calculated:null,
   lookupId:[],
   Date:null,
   Versions:null,
multiline:null,
multilinrrich:null,
Metadata:[],

LoggedInUserPPDefaultItems:null,

    };
  }
 public OnFieldChange=(event)=>{
   this.setState({


  Title:event.target.value,

   });
 }

 public MultilineChanged=(event)=>{
  this.setState({

    multiline:event.target.value,

  });
}
public DateChange = (date: any) => {
  alert(date);
  this.setState({

    Date: date

  });
}
public YesNoChange=(
  ev: React.MouseEvent<HTMLElement>,
  checked: boolean
) => {
  this.setState({

    Yes: checked ? true : false,

  });
}
@autobind
private _getPeoplePickerItems(items: any[]) {
  let getSelectedUsers:number[] = [];
      for (let item in items) {

        getSelectedUsers.push(items[item].id);
      }

  this.setState({ 
    user:getSelectedUsers,
   });

  }

private onChoiceSelectedItem=  (
  event: React.FormEvent<HTMLDivElement>,
  item: IDropdownOption
) => {
  this.setState({
choice:item.text
  });
}
@autobind
public async getUsers(userId)
{alert("get users is called");
  const user: ISiteUserProps = await sp.web.getUserById(userId).get();
 // alert("email"+user.Email);
 // console.log(user.Email);

  return await user;
}

@autobind
 private _getPeoplePickerItemspnp(items: any[]) {
   let getSelectedUsers = [];
   for (let item in items) {
     getSelectedUsers.push(items[item].id);
   }
   this.setState({ LoggedInUserPPDefaultItems: getSelectedUsers });
 }
public componentDidMount() {
  let lookupvalue:ISPFieldLookupValue[]=[ {lookupId: "1",lookupValue: "1"},{lookupId: "2",lookupValue: "2"},{lookupId: "3",lookupValue: "3"}];
  this.setState({
lookupId:lookupvalue,
  });

  this.spOps.BindDropDown(this.props.context).then(Items=>{
Items.map(optionvalue=>{
  options.push({ key: optionvalue, text: optionvalue });
});
  });
  let queryParameters = new UrlQueryParameterCollection(window.location.href);
let id=0;
  if (queryParameters.getValue("Id")) {
    id = parseInt(queryParameters.getValue("Id"));
    //Method to get data for single item
   //this.spOps.getDataforItem(this.props.context,id)

   this.spOps.PNPGetItem(id).then(Item=>{
     let datefeild;
    if (Item.Date != undefined) {
      datefeild = new Date(Item.Date);


    }

    const users_new: string[] = [];
    let defaultEmail: any[] = [];
    if (Item.userId != undefined) {
     // alert("in loop for user mapping");
     // Item.userId.map((uservalue) => {
        //console.log("uservalueId" + uservalue);
        //alert("user is getting added"+JSON.stringify(uservalue));
        defaultEmail.push(Item.userId);
      //  users_new.push(uservalue);
      }



alert("default value"+defaultEmail);
this.setState({

Title:Item.Title,
Yes:Item.Yes,
user:null,
choice:Item.choice,
hyper:null,
LoggedInUserPPDefaultItems:defaultEmail,
lookupId:null,
Date:datefeild,

multiline:Item.multiline,
multilinrrich:null,
Metadata:null,
});

   });
}
}
public onRichTextChange=(newText)=>{
this.MultiTextValue=newText;
  return newText;

}
public lookupclick(args: IFieldLookupClickEventArgs){
  alert("lookup is click");
alert(JSON.stringify(args));
}
public onTaxPickerChange=(terms : IPickerTerms)=>{

  this.setState({
Metadata:terms,
  });

}
public savedata=(values)=>{
  let isDataValidated:boolean=true;

  if(values.Metadata =="")
  {
    alert("metadata is null");
    isDataValidated=false;
    document.getElementById('metadataValidation').setAttribute("style","display:block !important");
  }

//alert("Save button is clicked"+values.Title);
  if(values.Title ==null)
  {
    alert("called in exception");
    isDataValidated=false;
    document.getElementById('titleValidation').setAttribute("style","display:block !important");
  }

  if(isDataValidated)
{
  this.spOps.PNPCreateListItem(values,this.MultiTextValue).then(Item=>{
    alert("New item is created:"+JSON.stringify(Item.Id));

});
}
}
  public render(): React.ReactElement<IComponentProps> {
    const {Title,multiline,Yes,Date,user,choice,Metadata}=this.state;
    const values={Title,multiline,Yes,Date,user,choice,Metadata};


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
                    Title *
                  </Label>
                  <span id="titleValidation" className={styles.validationerror}>The Field requires value</span>
                </div>
                <div className="ms-Grid-col ms-sm6 ms-md8 ms-lg8">
                  <TextField
                    placeholder="Enter Title"
                    value={this.state.Title}
                    onChange={this.OnFieldChange}

                  ></TextField>
                </div>
              </div>

              <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg4">
                  <Label className={styles.subTitle} defaultValue="Title">
                    Multiline *
                  </Label>

                </div>
                <div className="ms-Grid-col ms-sm6 ms-md8 ms-lg8">
                  <TextField
                    placeholder="Enter Multiline Text"
                    multiline autoAdjustHeight
                    value={this.state.multiline}
                    onChange={this.MultilineChanged}

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
                <RichText value={this.state.multilinrrich}
          onChange={(text)=>this.onRichTextChange(text)}

/>
                </div>
              </div>
              <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg4">
                  <Label className={styles.subTitle} defaultValue="Title">
                    Yes/No
                  </Label>
                  <span>*</span>
                </div>
                <div className="ms-Grid-col ms-sm6 ms-md8 ms-lg8">
                <Toggle
                      onChange={this.YesNoChange}

                      onText="Yes"
                      offText="No"

                    ></Toggle>
                </div>
              </div>
              <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg4">
                  <Label className={styles.subTitle} defaultValue="Title">
                  lookup
                  </Label>
                  <span>*</span>
                </div>
                <div className="ms-Grid-col ms-sm6 ms-md8 ms-lg8">
                <FieldLookupRenderer lookups={this.state.lookupId}
           context={this.props.context}
           onClick={this.lookupclick}
                 cssProps={{ background: '#f00' }} />
                </div>
              </div>

              <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg4">
                  <Label className={styles.subTitle} defaultValue="Title">
                  Date
                  </Label>
                  <span>*</span>
                </div>
                <div className="ms-Grid-col ms-sm6 ms-md8 ms-lg8">
                <DatePicker
                    placeholder="Select a date..."
                    allowTextInput={true}
                    defaultValue={this.state.Date}
                    onSelectDate={this.DateChange}
                    value={this.state.Date}

                  ></DatePicker>

                </div>
              </div>
 <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg4">
                  <Label className={styles.subTitle} defaultValue="Title">
                  Metadata *
                  </Label>
                  <span id="metadataValidation" className={styles.validationerror}>The Field requires value</span>
                </div>
                <div className="ms-Grid-col ms-sm6 ms-md8 ms-lg8">
                <TaxonomyPicker allowMultipleSelections={false}
                termsetNameOrID="State"
                panelTitle="Select Term"
                label="Taxonomy Picker"
                context={this.props.context}
                onChange={this.onTaxPickerChange}
                isTermSetSelectable={true}
                />

                </div>
              </div>
              <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg4">
                  <Label className={styles.subTitle} defaultValue="Title">
                  Users
                  </Label>
                  <span>*</span>
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
defaultSelectedUsers={ this.state.LoggedInUserPPDefaultItems
}
required={true}
                    />
                </div>
                <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg4">
                  <Label className={styles.subTitle} defaultValue="Title">
                  Choices
                  </Label>
                  <span>*</span>
                </div>
                <div className="ms-Grid-col ms-sm6 ms-md8 ms-lg8">



       <Dropdown
                    onChange={this.onChoiceSelectedItem}
                    options={options}
                    selectedKey={this.state.choice}
                  ></Dropdown>

                </div>
                </div>
                <button onClick={()=>this.savedata(values)}>Save Data PNP</button>
                <button onClick={()=>this.spOps.PNPCreateListItem(values,this.MultiTextValue)}>Update item PNP</button>
                <button onClick={()=>this.spOps.PNPCreateListItem(values,this.MultiTextValue)}>Delete item PNP</button>
              </div>
      </div>
      </div>
      </div>
      </div>
      </div>
    );
  }
}
