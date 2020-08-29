import * as React from 'react';
import styles from './SpfxReactForm.module.scss';

export interface IComponentProps {
  ContextValue:any;
  WebUrl:any;
}

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
        This is the Form Component
      </div>
    );
  }
}
