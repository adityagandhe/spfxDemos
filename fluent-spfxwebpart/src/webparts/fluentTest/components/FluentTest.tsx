import * as React from 'react';
import styles from './FluentTest.module.scss';
import { IFluentTestProps } from './IFluentTestProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { SharedColors } from '@fluentui/theme';
import { Icon } from '@fluentui/react/lib/Icon';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { lorem } from '@uifabric/example-data';
import Gridlist from "./GridList";
import GridState from "./GridComponent/GridState";
import Form from "./FormComponent/Form";
import {ServiceClass} from "./Services/Services";
import Pnpexamples from "./PNPExamples/pnpexamples";
import PNPGrid from "./PNPGrid/PNPGrid";
import PnpForm from "./FormComponent/pnpForm";
export default class FluentTest extends React.Component<IFluentTestProps, {}> {
  public IconClick=()=>{
    alert("Ïcon is clicked");
  }
 public  dummyText: string = lorem(100);
  public render(): React.ReactElement<IFluentTestProps> {
    return (

      <div className="ms-Grid">
        <PNPGrid context={this.props.context}></PNPGrid>
        <PnpForm description={this.props.description} context={this.props.context} Weburl={this.props.Weburl}></PnpForm>
        {/*  <Pnpexamples context={this.props.context}></Pnpexamples>
       <GridState context={this.props.context} ></GridState>
<Form description={this.props.description} context={this.props.context} Weburl={this.props.Weburl}></Form>
   <div className="ms-Grid-row">
    <div className="ms-Grid-col ms-sm4 ms-smPush8 ">First in code</div>
      <div className="ms-Grid-col ms-sm8 ms-smPull4">Second in code</div>
    </div>
       <Label required>A Label for An Input</Label>
      <TextField
          label="Switches from single to multiline if more than 50 characters are entered"
          multiline autoAdjustHeight
defaultValue={this.dummyText}
 autoComplete="on"
        />*/}

    </div>
    );
  }
}
