import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'ReactFeedbackSpfxWebPartStrings';
import ReactFeedbackSpfx from './components/ReactFeedbackSpfx';
import { IReactFeedbackSpfxProps } from './components/IReactFeedbackSpfxProps';

export interface IReactFeedbackSpfxWebPartProps {
  description: string;
  details:string;
}

export default class ReactFeedbackSpfxWebPart extends BaseClientSideWebPart <IReactFeedbackSpfxWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IReactFeedbackSpfxProps> = React.createElement(
      ReactFeedbackSpfx,
      {
        description: this.properties.description ,
        details: this.properties.details
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
                }),
                PropertyPaneTextField('details', {
                  label: strings.detailsFieldLabel
                }),
              ]
            }
          ]
        }
      ]
    };
  }
}
