import * as React from 'react';
import styles from './ReactFeedbackSpfx.module.scss';
import { IReactFeedbackSpfxProps } from './IReactFeedbackSpfxProps';
import { escape } from '@microsoft/sp-lodash-subset';
import NewComponent from "./NewComponent";
export default class ReactFeedbackSpfx extends React.Component<IReactFeedbackSpfxProps, {}> {
  public render(): React.ReactElement<IReactFeedbackSpfxProps> {
    return (
      <div className={ styles.reactFeedbackSpfx }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <span className={ styles.title }>Welcome to SharePoint!</span>
              <p className={ styles.subTitle }>Customize SharePoint experiences using Web Parts.</p>
              <p className={ styles.description }>{escape(this.props.description)}</p>
              <a href="https://aka.ms/spfx" className={ styles.button }>
                <span className={ styles.label }>Learn more</span>
              </a>
              <NewComponent/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
