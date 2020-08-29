import * as React from 'react';
import styles from './ReactSpfxTodo.module.scss';
import {ITodoItem}  from "./ITodoItem";
import { Icon } from '@fluentui/react/lib/Icon';
import { DefaultButton, PrimaryButton, Stack, IStackTokens } from 'office-ui-fabric-react';
export interface IComponentProps {

  item:ITodoItem;
  remove:any;
  edit:any;
}

export interface IComponentState {}

export default class Component extends React.Component<IComponentProps, IComponentState> {
  public render(): React.ReactElement<IComponentProps> {
    const {remove,edit}=this.props;
    return (
      <div>

<div className ="ms-Grid-col ms-sm6 ms-md8 ms-lg10">

              <p className="${styles.para}">
                <span>

                 <Icon iconName="ToDoLogoOutline" className="FontTest"/>
                 <span></span>
                 {this.props.item.Title}
                 </span>
            <span >
            <Icon iconName="Edit" className="ms-IconExample" onClick={edit}/>
</span><span>
  <span></span>
            <Icon iconName="Delete" className="ms-IconExample" onClick={remove}/></span>
            </p>


          </div>

      </div>
    );
  }
}
