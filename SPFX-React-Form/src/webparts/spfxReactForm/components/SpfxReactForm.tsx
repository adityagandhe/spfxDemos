import * as React from "react";
import styles from "./SpfxReactForm.module.scss";
import ListForm from "./ListForm";
import { Carousel, CarouselButtonsLocation, CarouselButtonsDisplay, CarouselIndicatorShape } from "@pnp/spfx-controls-react/lib/Carousel";
export interface IComponentProps {
  description: string;
  spHttpClient: any;
  siteUrl: any;
  Context: any;
}

import { UrlQueryParameterCollection } from "@microsoft/sp-core-library";
import { ICity } from "./Services/ICity";
import {
  autobind,
  Label,
  Toggle,
  TextField,
  MaskedTextField,
  PrimaryButton,
  Dropdown,
  IDropdownOption,
  DropdownMenuItemType,
  SpinButton,
  DatePicker,
  ImageFit,
} from "office-ui-fabric-react";
import { RichText } from "@pnp/spfx-controls-react/lib/RichText";
import {
  PeoplePicker,
  PrincipalType,
} from "@pnp/spfx-controls-react/lib/PeoplePicker";
import { ServicesClass } from "./Services/Service";
import { ICarouselImageProps } from "@pnp/spfx-controls-react/lib/controls/carousel/CarouselImage";
export interface IComponentState {
  Title: string;
  Comments?: string;
  City?: string;
  MultiLineColumn?: string;
  Location?: string;
  Number?: string;
  Currency?: string;
  Date?: any;
  YesNo?: any;
  HyperLinkText?: string;
  HyperLinkUrl?: string;
  RichTextState?: string;
  Users?: string[];
  disabled?: boolean;
  LoggedInUserPPDefaultItems?: any[];
  carouselElements: JSX.Element[];
}
const dropdownOptions: IDropdownOption[] = [
  // { key: "Pune", text: "Pune" },
  // { key: "Nagpur", text: "Nagpur" },
];
let id: number = null;
export default class Component extends React.Component<
  IComponentProps,
  IComponentState
> {
  public spOps: ServicesClass;
  public MultiTextValue = "";
  public carouselElements: Element | Element[] | ICarouselImageProps[];
public element:JSX.Element[] |JSX.Element;
  constructor(props: IComponentProps) {
    super(props);
    this.spOps = new ServicesClass();

    this.state = {
      Title: "",
      Comments: "",
      City: "",
      MultiLineColumn: "",
      Location: "",
      Number: null,
      Currency: null,
      Date: null,
      YesNo: null,
      HyperLinkText: "",
      HyperLinkUrl: "",
      RichTextState: "",
      Users: [],
      disabled: false,
      LoggedInUserPPDefaultItems: [],
      carouselElements: [<h1>This is working</h1>,<h1>This is working 2</h1>],
    };
  }
  public componentDidMount() {
    //alert("component did mount");
    this.spOps.BindDropDown(this.props.spHttpClient).then((Items) => {
      Items.map((Item) => {
        dropdownOptions.push({ key: Item, text: Item });
      });
    });
    let queryParameters = new UrlQueryParameterCollection(window.location.href);

    if (queryParameters.getValue("Id")) {
      id = parseInt(queryParameters.getValue("Id"));

      if (id > 0) {
        this.spOps.GetItemDetails(this.props.spHttpClient, id).then((Items) => {
          console.log(JSON.stringify(Items));
          let Datevalue = null;
          if (Items.Date != undefined) {
            Datevalue = new Date(Items.Date);
          }

          const users_new: string[] = [];
          const defaultEmail: any[] = [];
          if (Items.Person != undefined) {
            Items.Person.map((Item) => {
              console.log("Ïtem" + JSON.stringify(Item));
              defaultEmail.push(Item.EMail);
              users_new.push(Item.ID);
            });
          }
          let HyperlinkDesc = "";
          let HyperLinkUrlvalue = "";
          if (Items.HyperLink != undefined) {
            HyperlinkDesc = Items.HyperLink.Description;
            HyperLinkUrlvalue = Items.HyperLink.Url;
          }

          this.setState({
            Title: Items.Title,
            Comments: Items.Comments,
            City: Items.City,
            MultiLineColumn: Items.MultilineColumn,
            Location: "",
            Number: Items.Number,
            Currency: Items.Currency,
            Date: Datevalue,
            YesNo: Items.YesNo,
            HyperLinkText: HyperlinkDesc,
            HyperLinkUrl: HyperLinkUrlvalue,
            RichTextState: Items.RichText,
            Users: users_new,
            LoggedInUserPPDefaultItems: defaultEmail,
          });
        });
      }
    }
    if (queryParameters.getValue("Mode")) {
      const mode: number = parseInt(queryParameters.getValue("Mode"));
      if (mode == 0) {
        this.setState({
          disabled: true,
        });
      }
      if (mode == 1) {
        this.setState({
          disabled: false,
        });
      }
    }
  }
  public componentDidUpdate() {}
  public OnFieldChange = (event) => {
    this.setState({
      Title: event.target.value,
    });
  };
  public RichTextChange = (newText: string) => {
    this.MultiTextValue = newText;
    return newText;
  };
  public NumberChange = (event) => {
    this.setState({
      Number: event.target.value,
    });
  };

  public CurrencyChange = (event) => {
    this.setState({
      Currency: event.target.value,
    });
  };

  public CommentChange = (event) => {
    this.setState({
      Comments: event.target.value,
    });
  };
  public HyperLinkTextChange = (event) => {
    this.setState({
      HyperLinkText: event.target.value,
    });
  };

  public HyperLinkUrlChange = (event) => {
    this.setState({
      HyperLinkUrl: event.target.value,
    });
  };

  public YesNoChange = (
    ev: React.MouseEvent<HTMLElement>,
    checked: boolean
  ) => {
    this.setState({
      YesNo: checked ? true : false,
    });
  };
  public MultiLineChange = (event) => {
    this.setState({
      MultiLineColumn: event.target.value,
    });
  };

  public LocationChange = (event) => {
    this.setState({
      Location: event.target.value,
    });
  };
  public DateChange = (date: Date | null | undefined) => {
    this.setState({
      Date: date,
    });
  };
  public CityChange = (
    event: React.FormEvent<HTMLDivElement>,
    item: IDropdownOption
  ) => {
    this.setState({
      City: item.text,
    });
  };
  @autobind
  private _getPeoplePickerItems(items: any[]) {
    let getSelectedUsers: string[] = [];

    for (let item in items) {
      getSelectedUsers.push(items[item].id);
    }

    this.setState({ Users: getSelectedUsers });
  }
  public render(): React.ReactElement<IComponentProps> {
    const {
      Title,
      Comments,
      City,
      MultiLineColumn,
      Location,
      Number,
      Currency,
      Date,
      YesNo,
      HyperLinkText,
      HyperLinkUrl,
      RichTextState,
      Users,
    } = this.state;
    const values = {
      Title,
      Comments,
      City,
      MultiLineColumn,
      Location,
      Number,
      Currency,
      Date,
      YesNo,
      HyperLinkText,
      HyperLinkUrl,
      RichTextState,
      Users,
    };

    return (
      <div className={styles.spfxReactForm}>
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
                    disabled={this.state.disabled}
                  ></TextField>
                </div>
              </div>

              <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg4">
                  <Label className={styles.subTitle} defaultValue="Comments">
                    Comments
                  </Label>
                </div>
                <div className="ms-Grid-col ms-sm6 ms-md8 ms-lg8">
                  <TextField
                    placeholder="Enter Comments"
                    value={this.state.Comments}
                    onChange={this.CommentChange}
                    disabled={this.state.disabled}
                  ></TextField>
                </div>
              </div>

              <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg4">
                  <Label className={styles.subTitle} defaultValue="City">
                    City
                  </Label>
                </div>
                <div className="ms-Grid-col ms-sm6 ms-md8 ms-lg8">
                  <Dropdown
                    onChange={this.CityChange}
                    options={dropdownOptions}
                    selectedKey={this.state.City}
                    disabled={this.state.disabled}
                  ></Dropdown>
                </div>
              </div>

              <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg4">
                  <Label
                    className={styles.subTitle}
                    defaultValue="MultiLineColumn"
                  >
                    MultiLineColumn
                  </Label>
                </div>
                <div className="ms-Grid-col ms-sm6 ms-md8 ms-lg8">
                  <TextField
                    placeholder="Add MultiLine Value"
                    multiline
                    autoAdjustHeight
                    value={this.state.MultiLineColumn}
                    onChange={this.MultiLineChange}
                    disabled={this.state.disabled}
                  ></TextField>
                </div>
              </div>
              <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg4">
                  <Label className={styles.subTitle} defaultValue="Location">
                    Location
                  </Label>
                </div>
                <div className="ms-Grid-col ms-sm6 ms-md8 ms-lg8">
                  <TextField
                    placeholder="Select Location"
                    value={this.state.Location}
                    onChange={this.LocationChange}
                    disabled={this.state.disabled}
                  ></TextField>
                </div>
              </div>
              <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg4">
                  <Label className={styles.subTitle} defaultValue="Number">
                    Number
                  </Label>
                </div>
                <div className="ms-Grid-col ms-sm6 ms-md8 ms-lg8">
                  <TextField
                    type="number"
                    value={this.state.Number}
                    onChange={this.NumberChange}
                    disabled={this.state.disabled}
                  ></TextField>
                </div>
              </div>
              <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg4">
                  <Label className={styles.subTitle} defaultValue="Currency">
                    Currency
                  </Label>
                </div>
                <div className="ms-Grid-col ms-sm6 ms-md8 ms-lg8">
                  <TextField
                    type="number"
                    value={this.state.Currency}
                    onChange={this.CurrencyChange}
                    disabled={this.state.disabled}
                  ></TextField>
                </div>
              </div>

              <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg4">
                  <Label className={styles.subTitle} defaultValue="Date">
                    Date
                  </Label>
                </div>
                <div className="ms-Grid-col ms-sm6 ms-md8 ms-lg8">
                  <DatePicker
                    placeholder="Select a date..."
                    allowTextInput={true}
                    value={this.state.Date}
                    onSelectDate={this.DateChange}
                    disabled={this.state.disabled}
                  ></DatePicker>
                </div>
              </div>
              <div className="ms-Grid-row">
                <div className="ms-Grid-row">
                  <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg4">
                    <Label className={styles.subTitle} defaultValue="Yes/No">
                      Yes/No
                    </Label>
                  </div>
                  <div className="ms-Grid-col ms-sm6 ms-md8 ms-lg8">
                    {" "}
                    <Toggle
                      onChange={this.YesNoChange}
                      disabled={this.state.disabled}
                      onText="Yes"
                      offText="No"
                    ></Toggle>
                  </div>
                </div>

                <div className="ms-Grid-row">
                  <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg4">
                    <Label className={styles.subTitle} defaultValue="HyperLink">
                      HyperLink
                    </Label>
                  </div>
                  <div className="ms-Grid-col ms-sm6 ms-md8 ms-lg8">
                    <TextField
                      placeholder="Enter the hyperlink display text"
                      value={this.state.HyperLinkText}
                      onChange={this.HyperLinkTextChange}
                      disabled={this.state.disabled}
                    ></TextField>{" "}
                  </div>
                </div>
                <div className="ms-Grid-row">
                  <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg4"></div>
                  <div className="ms-Grid-col ms-sm6 ms-md8 ms-lg8">
                    <TextField
                      value={this.state.HyperLinkUrl}
                      onChange={this.HyperLinkUrlChange}
                      disabled={this.state.disabled}
                      ariaLabel="Example text field with https:// prefix"
                    ></TextField>{" "}
                  </div>
                </div>
                <div className="ms-Grid-row">
                  <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg4"></div>
                  <Label className={styles.subTitle} defaultValue="RichText">
                    RichText
                  </Label>
                  <div  className={styles.Richtext}>
                    <RichText
                    className={styles.Richtext}
                      value={this.state.RichTextState}
                      onChange={(text) => this.RichTextChange(text)}
                    ></RichText>
                  </div>
                </div>
                <div className="ms-Grid-row">
                  <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg4"></div>
                  <Label className={styles.subTitle} defaultValue="Person">
                    Person
                  </Label>
                  <div>
                    <PeoplePicker
                      context={this.props.Context}
                      titleText=""
                      personSelectionLimit={10}
                      groupName={""} // Leave this blank in case you want to filter from all users
                      showtooltip={true}
                      isRequired={false}
                      ensureUser={true}
                      selectedItems={this._getPeoplePickerItems}
                      showHiddenInUI={false}
                      principalTypes={[PrincipalType.User]}
                      resolveDelay={1000}
                      defaultSelectedUsers={
                        this.state.LoggedInUserPPDefaultItems
                          ? this.state.LoggedInUserPPDefaultItems
                          : []
                      }
                      disabled={this.state.disabled}
                    />
                  </div>
                </div>
                <div>
                  <div>
                    <PrimaryButton
                      disabled={this.state.disabled}
                      onClick={() =>
                        this.spOps.SubmitData(
                          this.props.spHttpClient,
                          values,
                          this.MultiTextValue
                        )
                      }
                    >
                      Submit
                    </PrimaryButton>
                  </div>

                  <div>
                    <PrimaryButton
                      disabled={this.state.disabled}
                      onClick={() =>
                        this.spOps.UpdateData(
                          this.props.spHttpClient,
                          id,
                          values,
                          this.MultiTextValue
                        )
                      }
                    >
                      Update Item
                    </PrimaryButton>
                  </div>

                  <div>
                    <PrimaryButton
                      disabled={this.state.disabled}
                      onClick={() =>
                        this.spOps.DeleteItem(this.props.spHttpClient, id)
                      }
                    >
                      Delete Item
                    </PrimaryButton>
                  </div>

                </div>


              </div>

            </div>
            <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg4">
                  <Label className={styles.subTitle} defaultValue="Curosal">
                    Curosal
                  </Label>
                </div>
                <div className="ms-Grid-col ms-sm6 ms-md8 ms-lg8">
                <Carousel
  buttonsLocation={CarouselButtonsLocation.top}
  buttonsDisplay={CarouselButtonsDisplay.block}

  contentContainerStyles={null}
  containerButtonsStyles={null}

  isInfinite={true}

  element={this.state.carouselElements}
  onMoveNextClicked={(index: number) => { console.log(`Next button clicked: ${index}`); }}
  onMovePrevClicked={(index: number) => { console.log(`Prev button clicked: ${index}`); }}
/>
                </div>
              </div>
          </div>
        </div>
      </div>
    );
  }
}
