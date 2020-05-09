import { SPHttpClient,ISPHttpClientOptions, SPHttpClientResponse } from "@microsoft/sp-http";

import {Environment ,EnvironmentType  } from "@microsoft/sp-core-library";
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './FeedbackWebPart.module.scss';
import * as strings from 'FeedbackWebPartStrings';

export interface IFeedbackWebPartProps {
  hintText: string;
}

export default class FeedbackWebPart extends BaseClientSideWebPart<IFeedbackWebPartProps> {

  public render(): void {

    this.domElement.innerHTML = `
      <div class="${ styles.feedback }">
      <i class="ms-Icon ms-Icon--NoteForward" aria-hidden="true"></i>
<input type='text' class ="${styles.input}" maxlength ='255'  placeholder ="${escape(this.properties.hintText)}"/>
<button class ="${styles.button}" ><span class="ms-Button-label">Send Data </span>    </button>
<p class="${styles.successIndicator}"></p>
</div>`;
this.setComment=this.setComment.bind(this) ;
this.sendFeedback=this.sendFeedback.bind(this) ;
const textinput :HTMLInputElement =this.domElement.getElementsByTagName("INPUT")[0] as HTMLInputElement ;
//textinput.addEventListener ("keyup",this.setComment);
textinput.onchange =this.setComment ;
const button:HTMLButtonElement=this.domElement.getElementsByTagName("button")[0] as HTMLButtonElement;
button.onclick= this.sendFeedback;
}
private _commentText:string;
private setComment(event:Event) :void
{

let srcElement: HTMLInputElement = event.srcElement as HTMLInputElement  ;

this._commentText = escape(srcElement.value) ;
}
private sendFeedback(event:Event):void
{

  const paragraphElement :HTMLParagraphElement =this.domElement.getElementsByClassName(styles.successIndicator)[0] as HTMLParagraphElement ;
  paragraphElement.innerHTML ="";
  if(this._commentText ===undefined || this._commentText.length ===0)
  {
    this.context.statusRenderer.renderError(paragraphElement,"Please Enter Value") ;
    return;
  }
  if(Environment.type == EnvironmentType.Local)
  {
    this.context.statusRenderer.renderError(paragraphElement,"local environment") ;
    return;
  }
 // alert(this._commentText ) ;
 const url :string =this.context.pageContext.web.absoluteUrl + "/_api/Web/Lists/getbytitle('feedback')/items" ;
 const items:any ={
   "Title" :this._commentText

 } ;

 const spHttpClientOptions:ISPHttpClientOptions =
 {
   "body":JSON.stringify(items)
 };
 this.context.statusRenderer.displayLoadingIndicator(paragraphElement," -Sending data to list");
this.context.spHttpClient.post(url,SPHttpClient.configurations.v1,spHttpClientOptions).then((response: SPHttpClientResponse) => {this.context.statusRenderer.clearLoadingIndicator(paragraphElement) ;
if(response.status ===201)
{
  this.domElement.getElementsByClassName(styles.successIndicator)[0].innerHTML = "<i class='ms-Icon ms-Icon--Accept' aria-hidden='true''></i>thanks for feedback in version 3</i>";

}
else{
  this.context.statusRenderer.renderError(this.domElement,"Error in sendind data") ;
}
});

  //this.domElement.getElementsByClassName(styles.successIndicator)[0].innerHTML = "<i class='ms-Icon ms-Icon--Accept' aria-hidden='true''></i>thanks for feedback</i>";
}
  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('hintText', {
                  label: strings.hintTextFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
