import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import {
  BaseApplicationCustomizer ,
  PlaceholderContent,PlaceholderName
} from '@microsoft/sp-application-base';
import { Dialog } from '@microsoft/sp-dialog';

import * as strings from 'TenantExtentionApplicationCustomizerStrings';
import {escape} from '@microsoft/sp-lodash-subset';
import styles from './AppCustomizer.module.scss';
const LOG_SOURCE: string = 'TenantExtentionApplicationCustomizer';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface ITenantExtentionApplicationCustomizerProperties {
  // This is an example; replace with your own property
  Top: string;
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class TenantExtentionApplicationCustomizer
  extends BaseApplicationCustomizer<ITenantExtentionApplicationCustomizerProperties> {
    private TopContent:PlaceholderContent |undefined;
  @override
  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);
    this.context.placeholderProvider.changedEvent.add(this,this.renderHeader);
    return Promise.resolve();
  }

  private renderHeader():void{
    if(!this.TopContent)
    {
      this.TopContent=  this.context.placeholderProvider.tryCreateContent(
        PlaceholderName.Top,
        { onDispose: this._onDispose }
      );

    }
    if(!this.TopContent)
    {
      console.log("Not found top header");
    }

    if(this.properties)
    {
      let  topString =this.properties.Top;


    if(this.TopContent.domElement)
    {
      this.TopContent.domElement.innerHTML =`

      <div class="${styles.app}">
        <div class="${styles.top}">

       ${escape(
        topString
          )}
        </div>
        </div>

      `;
    }
  }
}
private _onDispose(): void {
  console.log('Disposed custom top and bottom placeholders.');
}
}
