import * as React from 'react';
import styles from './Defaultwp.module.scss';
import {Services} from "./Services";
import {sp, DateTimeFieldFormatType} from "@pnp/sp/presets/all";
import {ListInfo} from "./ListInfo";
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';



import { DetailsList, DetailsListLayoutMode, Button } from 'office-ui-fabric-react';
import {
  Logger,

  LogLevel,
  FunctionListener,
  ILogEntry
} from "@pnp/logging";
export interface IDefProps {
  context:any;
  user:any;
  isAdmin:boolean;
}

export interface IDefState {
  listNames:ListInfo[];
}

export default class Def extends React.Component<IDefProps, IDefState> {
public sp_ops:Services;
  constructor(props: IDefProps) {
    super(props);
    this.sp_ops =new Services();
    this.state = {
      listNames:[]
    };
    sp.setup({
    spfxContext: this.props.context
    });
  }
   public  functionlistener = new FunctionListener((entry: ILogEntry) => {
    //alert("In logging");
    if (entry.level == LogLevel.Error)
    {
      console.log('Message from FunctionListener%c' + entry.level, "color:red;");
    //  alert("ïn error Data"+entry.data);
     // alert("ïn error"+entry.message);
     let date: Date = new Date();
      this.sp_ops.CreateErrorEntry(entry.message, this.props.user,date);
    }
    else if (entry.level == LogLevel.Warning)
      console.log('Message from FunctionListener%c' + entry.message, "color:orange;");
    else if (entry.level == LogLevel.Info)
      console.log('Message from FunctionListener%c' + entry.message, "color:green;");
    else
      console.log('Message from FunctionListener%c' + entry.message, "color:blue;");
  });
public componentDidMount(){
  // subscribe a listener
  Logger.activeLogLevel = LogLevel.Info;
//Logger.subscribe(new ConsoleListener());

// set the active log level

Logger.subscribe(this.functionlistener);
  let temp:ListInfo[]=[];
  this.sp_ops.GetAllListTitles().then(AllItems=>{

  AllItems.map(Item=>{
  //alert(JSON.stringify(Item));

  const arr =temp.push({Title:Item.Title});

  });
 this.setState({
   listNames:[...this.state.listNames,...temp]
 });
  });
}
private btnclicked() {

 // Logger.write("This warning triggerd from react component", LogLevel.Info);
  //Logger.write("This error triggerd from react component", LogLevel.Error);


}
  public render(): React.ReactElement<IDefProps> {
    if(this.props.isAdmin)
    {
    return (
      <div>
<div>All lists</div>

<div >
        <PrimaryButton onClick={this.btnclicked} text="Trigger"></PrimaryButton>
      </div>
<Button onClick={this.sp_ops.DeleteList}>Delete List</Button>
<DetailsList
            items={this.state.listNames}

            setKey="set"
            layoutMode={DetailsListLayoutMode.justified}


            selectionPreservedOnEmptyClick={true}
            ariaLabelForSelectionColumn="Toggle selection"
            ariaLabelForSelectAllCheckbox="Toggle selection for all items"
            checkButtonAriaLabel="Row checkbox"

          />
      </div>
    );
    }
    else{
      return (
        <div>
  <div>You Do not have access to view the webpart</div>
  </div>
      );
    }
  }
}
