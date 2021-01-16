import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import { escape } from '@microsoft/sp-lodash-subset';
import { Dialog } from '@microsoft/sp-dialog';
import {
  BaseApplicationCustomizer ,PlaceholderContent,PlaceholderName
} from '@microsoft/sp-application-base';
import * as strings from 'PlainBannerApplicationCustomizerStrings';
import styles from './AppCustomizer.module.scss';
import { SPHttpClient, SPHttpClientResponse, SPHttpClientConfiguration } from "@microsoft/sp-http";
import {IListItems} from "./IListItems";
const LOG_SOURCE: string = 'PlainBannerApplicationCustomizer';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IPlainBannerApplicationCustomizerProperties {
  // This is an example; replace with your own property
  testMessage: string;

}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class PlainBannerApplicationCustomizer
  extends BaseApplicationCustomizer<IPlainBannerApplicationCustomizerProperties> {
    private _topPlaceholder9: PlaceholderContent | undefined;
  @override
  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);

    this.context.placeholderProvider.changedEvent.add(this, this._renderPlaceHolders);

    return Promise.resolve();
  }

  private getItems(currentURL:string):Promise<IListItems[]>{
    const urlValue:string= "https://yavatmal3.sharepoint.com/sites/ModernTeam/_api/Web/Lists/getbytitle('Banner')/items?$Select=Title,Message,ShowBanner,Target,theme&$top 1&$filter=ShowBanner eq 1 and Title eq '"+currentURL+"'";
     alert(urlValue);
    return this.context.spHttpClient.get(urlValue, SPHttpClient.configurations.v1)
  .then((data: SPHttpClientResponse) => data.json())
  .then((data: any) => {
    return data.value;
  });
  }
  private _renderPlaceHolders(): void {

    // Handling the top placeholder
    if (!this._topPlaceholder9) {
      alert("creating banner");
      this._topPlaceholder9 = this.context.placeholderProvider.tryCreateContent(
        PlaceholderName.Top
      );

      // The extension should not assume that the expected placeholder is available.
      if (!this._topPlaceholder9) {
        console.error("The expected placeholder (Top) was not found.");
        return;
      }

      let topString="This is default value";
      let theme="Dark";
      let themeValue="";
      let currentUrl =this.context.pageContext.web.absoluteUrl;

      if(currentUrl.indexOf('&')>0)
      {
        alert("and is present");
       currentUrl= encodeURIComponent(currentUrl);
       alert(currentUrl);
      }

      this.getItems(currentUrl).then(Items=>{
        let targetvalue:string="";
        Items.map(Item=>{targetvalue = Item.Target;
          alert(targetvalue);
    //window.location.replace
          location.href =targetvalue;
        });
      });
    }
  }
}
   /*   this.getItems(currentUrl).then(Items=>{
        Items.map(Item=>{
            topString= Item.Message;
            alert("topstring"+topString) ;
            theme =Item.theme;
            if (theme ="Dark")
            {
              themeValue =`${styles.Dark}`;
            }
            else{
              themeValue =`${styles.Light}`;
            }

            if (this._topPlaceholder9.domElement ) {
              this._topPlaceholder9.domElement.innerHTML = `
              <div class="${styles.app}">
                <div class="${themeValue}">
                  ${topString}
                </div>
              </div>`;
            }
            });
        });*/
