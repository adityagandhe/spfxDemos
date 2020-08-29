import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { SPHttpClient, SPHttpClientResponse,ISPHttpClientOptions } from "@microsoft/sp-http";
import * as strings from 'SpfxReactFormWebPartStrings';
import SpfxReactForm from './components/SpfxReactForm';
import { ISpfxReactFormProps } from './components/ISpfxReactFormProps';


export interface ISpfxReactFormWebPartProps {
  description: string;
}

export default class SpfxReactFormWebPart extends BaseClientSideWebPart <ISpfxReactFormWebPartProps> {

  public render(): void {
    const element: React.ReactElement<ISpfxReactFormProps> = React.createElement(
      SpfxReactForm,
      {
        description: this.properties.description,
        spHttpClient:this.context.spHttpClient,
        siteUrl:this.context.pageContext.web.absoluteUrl,
        Context:this.context,

      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
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
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
