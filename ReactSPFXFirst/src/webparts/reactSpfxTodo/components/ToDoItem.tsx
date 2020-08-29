import * as React from 'react';
import styles from './ReactSpfxTodo.module.scss';
import {ITodoItem}  from "./ITodoItem";
import Todoview from "./Todoview";
import { DefaultButton, PrimaryButton, Stack, IStackTokens } from 'office-ui-fabric-react';
export interface IComponentProps {
 value:ITodoItem[];
 clear:any;
 remove:any;
 edit:any;
}

export interface IComponentState {}

export default class Component extends React.Component<IComponentProps, IComponentState> {
  public render(): React.ReactElement<IComponentProps> {
    const {value,clear,remove,edit}=this.props;
    return (
      <div>
<div className="ms-Grid">

<h3 className ="text-capatalize text-center"> List Collection</h3>

{value.map(item=><Todoview key={item.Id}  item ={item} remove={()=>remove(item.Id)}  edit={()=>edit(item.Id,item.Title)}> </Todoview>)}
</div>
<PrimaryButton   onClick={clear}>Clear</PrimaryButton>
      </div>
    );
  }
}
