import * as React from 'react';
import styles from './Defaultwp.module.scss';
import { IDefaultwpProps } from './IDefaultwpProps';
import { escape } from '@microsoft/sp-lodash-subset';
import {Environment,EnvironmentType} from '@microsoft/sp-core-library';
import Def from "./GetAllLists";
export default class Defaultwp extends React.Component<IDefaultwpProps, {}> {
  public render(): React.ReactElement<IDefaultwpProps> {
    let message:string="test";
    let iconname;

    if(Environment.type == EnvironmentType.Local)
    {
      message="Welcome to local workbench";
      iconname="ms-Icon ms-Icon--LocaleLanguage";
    }

else{
  if(this.props.team)
{
  alert("Inside the Teams");
  message="Welcome to MS team";
  iconname="ms-Icon ms-Icon--TeamsLogo";
}
    else{
      message="Welcome to SharePoint app";
      iconname="ms-Icon ms-Icon--SharepointLogoInverse";
    }
  }
    return (

      <div className={ styles.defaultwp }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <span className={ styles.title }>  {message}</span>
                <div className={ styles.title }>{this.props.description}

<Def context ={this.props.context} user ={this.props.user} isAdmin ={this.props.isAdmin}></Def>

    </div>

    {/* <div className="ms-Grid">
  <div className="ms-Grid-row">
    <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg2">
      <div className="LayoutPage-demoBlock">A</div>
    </div>
    <div className="ms-Grid-col ms-sm6 ms-md8 ms-lg10">
      <div className="LayoutPage-demoBlock">B</div>
    </div>
  </div>
    </div>*/}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
