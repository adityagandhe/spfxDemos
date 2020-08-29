import * as React from 'react';
import {IFirstClassComponent} from "./IFirstClassComponent";

export interface IComponentProps {
  description: string;
}

export interface IComponentState {}

export default class Component extends React.Component<IComponentProps, IComponentState> {
  public render(): React.ReactElement<IComponentProps> {
    return (
      <div>
       <h1>This is by snippet</h1>
      </div>
    );
  }
}
