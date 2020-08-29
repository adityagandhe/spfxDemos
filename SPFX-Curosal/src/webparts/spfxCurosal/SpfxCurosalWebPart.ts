import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'SpfxCurosalWebPartStrings';
import SpfxCurosal from './components/SpfxCurosal';
import { ISpfxCurosalProps } from './components/ISpfxCurosalProps';
 import styles from "./components/SpfxCurosal.module.scss";
export interface ISpfxCurosalWebPartProps {
  description: string;

}

export default class SpfxCurosalWebPart extends BaseClientSideWebPart <ISpfxCurosalWebPartProps> {

  public render(): void {
    const element: React.ReactElement<ISpfxCurosalProps> = React.createElement(
      SpfxCurosal,
      {
        description: this.properties.description,
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
