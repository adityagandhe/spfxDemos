import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import { BaseApplicationCustomizer ,PlaceholderContent,PlaceholderName
} from '@microsoft/sp-application-base';
import { Dialog } from '@microsoft/sp-dialog';
import {IListItems} from './IListItems';
import * as strings from 'DoubleExtentionApplicationCustomizerStrings';
import styles from './AppCustomizer.module.scss';
import { SPHttpClient, SPHttpClientResponse, SPHttpClientConfiguration } from "@microsoft/sp-http";
import { escape } from '@microsoft/sp-lodash-subset';
const LOG_SOURCE: string = 'DoubleExtentionApplicationCustomizer';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IDoubleExtentionApplicationCustomizerProperties {
  // This is an example; replace with your own property
  testMessage: string;


}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class DoubleExtentionApplicationCustomizer
  extends BaseApplicationCustomizer<IDoubleExtentionApplicationCustomizerProperties> {
    private BannerPlaceholder :PlaceholderContent | undefined;

  @override
  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);
    let message: string = this.properties.testMessage;
    this.context.placeholderProvider.changedEvent.add(this, this.renderPlaceHolders);
     return Promise.resolve();
  }

private getItems(currentURL:string):Promise<IListItems[]>{
  const urlValue:string= "https://yavatmal3.sharepoint.com/sites/ModernTeam/_api/Web/Lists/getbytitle('Banner')/items?$Select=Title,Message,ShowBanner,theme&$top 1&$filter=ShowBanner eq 1 and Title eq '"+currentURL+"'";
 return this.context.spHttpClient.get(urlValue, SPHttpClient.configurations.v1)
.then((data: SPHttpClientResponse) => data.json())
.then((data: any) => {
  return data.value;
});
}

  private renderPlaceHolders(): void {
    let topString="";
    let theme="";

    let currentUrl =this.context.pageContext.web.absoluteUrl;

if(!this.BannerPlaceholder)
{

 this.BannerPlaceholder = this.context.placeholderProvider.tryCreateContent( PlaceholderName.Top);
  }
  // The extension should not assume that the expected placeholder is available.
  if (!this.BannerPlaceholder) {

    console.error("The expected placeholder (Top) was not found.");
    return;
  }


    this.getItems(currentUrl).then(Items=>{
    Items.map(Item=>{
        topString= Item.Message;
        theme =Item.theme;
        let themeValue="";

        if (theme ==="Dark")
        {
          themeValue =styles.Dark;
        }
        else{

          themeValue =styles.Light;
        }


          this.BannerPlaceholder.domElement.innerHTML = `
          <div class="${styles.app}">
            <div class="${themeValue}">
              ${topString}
            </div>
          </div>`;

        });
    });

    }


}
