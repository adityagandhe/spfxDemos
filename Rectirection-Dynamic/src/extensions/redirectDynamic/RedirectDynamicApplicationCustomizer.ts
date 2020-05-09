import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import {
  BaseApplicationCustomizer
} from '@microsoft/sp-application-base';
import { Dialog } from '@microsoft/sp-dialog';

import * as strings from 'RedirectDynamicApplicationCustomizerStrings';
import { SPHttpClient, SPHttpClientResponse ,SPHttpClientConfiguration } from "@microsoft/sp-http";
import {IRedirectProperties} from './IRedirectProperties';
const LOG_SOURCE: string = 'RedirectDynamicApplicationCustomizer';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IRedirectDynamicApplicationCustomizerProperties {
  // This is an example; replace with your own property
  testMessage: string;
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class RedirectDynamicApplicationCustomizer
  extends BaseApplicationCustomizer<IRedirectDynamicApplicationCustomizerProperties> {

  @override
  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);

    let message: string = this.properties.testMessage;
    this.Redirect();

    return Promise.resolve();
  }

  private SetRedirect(currentURL:string):Promise<IRedirectProperties[]>{


const url:string="https://yavatmal3.sharepoint.com/sites/ModernTeam/_api/Web/Lists/getbytitle('Redirect')/items?$Select=Title,Target,Redirect&$top 1&$filter=Redirect eq 1 and Title eq '"+currentURL+"'";
    return this.context.spHttpClient.get(url, SPHttpClient.configurations.v1)
    .then((data: SPHttpClientResponse) => data.json())
    .then((data: any) => {
      return data.value;

    });
  }
 private Redirect():void {

   var currentURL:string =this.context.pageContext.web.absoluteUrl;

   this.SetRedirect(currentURL).then(Items=>{
    let targetvalue:string="";
    Items.map(Item=>{targetvalue = Item.Target;

      location.href =targetvalue;
    });



});

}
}
