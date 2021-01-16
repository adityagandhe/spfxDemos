import * as React from 'react';
import styles from './ReactFeedbackSpfx.module.scss';

export interface IComponentProps {}

export interface IComponentState {}

export default class Component extends React.Component<IComponentProps, IComponentState> {

  constructor(props: IComponentProps) {
    super(props);

    this.state = {

    };
  }

  public render(): React.ReactElement<IComponentProps> {
    return (
      <div>
        <h1>This is for test new component</h1>
      </div>
    );
  }
}
