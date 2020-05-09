import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import {
  BaseApplicationCustomizer ,PlaceholderContent,PlaceholderName
} from '@microsoft/sp-application-base';
import { Dialog } from '@microsoft/sp-dialog';
import * as strings from 'RedirectApplicationCustomizerStrings';
import styles from './AppCustomizer.module.scss';

import { escape } from '@microsoft/sp-lodash-subset';
const LOG_SOURCE: string = 'RedirectApplicationCustomizer';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IRedirectApplicationCustomizerProperties {
  // This is an example; replace with your own property
  testMessage: string;
  Top: string;
  color:string;


}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class RedirectApplicationCustomizer
  extends BaseApplicationCustomizer<IRedirectApplicationCustomizerProperties> {
private topplaceholder:PlaceholderContent | undefined;
private sourceURL:string="";
  @override
  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);
this.context.placeholderProvider.changedEvent.add(this,this.renderPlaceHolders);
location.href ="https://www.google.com/";
    let message: string = this.properties.testMessage;
    if (!message) {
      message = '(No properties were provided.)';
    }

   //Dialog.alert(`Hello from ${strings.Title}:\n\n${message}`);

    return Promise.resolve();
  }
  private renderPlaceHolders(): void {

    console.log(
      "Available placeholders: ",
      this.context.placeholderProvider.placeholderNames
        .map(name =>PlaceholderName[name])
        .join(", ")
    );

// Handling the top placeholder
if (!this.topplaceholder) {
  this.sourceURL =this.context.pageContext.web.absoluteUrl;

  this.topplaceholder = this.context.placeholderProvider.tryCreateContent(
    PlaceholderName.Top,
    { onDispose: this._onDispose }

  );

  // The extension should not assume that the expected placeholder is available.
  if (!this.topplaceholder) {
    console.error("The expected placeholder (Top) was not found.");
    return;
  }

  if (this.properties) {
    let topString: string = this.properties.Top;
    if (!topString) {
      topString = "(Top property was not defined.)";
    }

    if (this.topplaceholder.domElement) {
      this.topplaceholder.domElement.innerHTML = `
      <div >
      <div class="${styles.app}">
        <div style="background-color:${this.properties.color}" class="${styles.top}">

       ${escape(
            topString
          )}
        </div>
        </div>
      </div>`;
    }
  }
}
  }
  private _onDispose(): void {
    console.log('Disposed custom top and bottom placeholders.');
  }
}
