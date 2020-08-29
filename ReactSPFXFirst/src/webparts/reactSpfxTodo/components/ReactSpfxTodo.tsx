import * as React from 'react';
import styles from './ReactSpfxTodo.module.scss';
import { IReactSpfxTodoProps } from './IReactSpfxTodoProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class ReactSpfxTodo extends React.Component<IReactSpfxTodoProps, {}> {
  public render(): React.ReactElement<IReactSpfxTodoProps> {
    return (
      <div className={ styles.reactSpfxTodo }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <span className={ styles.title }>Welcome to SharePoint!</span>

              <p className={ styles.description }>{escape(this.props.description)}</p>


            </div>
          </div>
        </div>
      </div>
    );
  }
}
