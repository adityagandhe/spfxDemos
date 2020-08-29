import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import ListViewComp from './components/ListView/ListViewComp';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'DefaultWebPartStrings';

import { IDefaultProps } from './components/IDefaultProps';
import ComponentCurousal from "./components/Curousal/ComponentCurousal";
export interface IDefaultWebPartProps {
  description: string;
}

export default class DefaultWebPart extends BaseClientSideWebPart <IDefaultWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IDefaultProps> = React.createElement(
      ListViewComp,
      {
        description: this.properties.description,
        ContextValue: this.context,
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
