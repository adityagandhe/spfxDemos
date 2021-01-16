import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'FluentTestWebPartStrings';
import FluentTest from './components/FluentTest';
import gridlist from "./components/GridList";
import { IFluentTestProps } from './components/IFluentTestProps';
import { initializeIcons } from '@uifabric/icons';
initializeIcons();
export interface IFluentTestWebPartProps {
  description: string;
}

export default class FluentTestWebPart extends BaseClientSideWebPart <IFluentTestWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IFluentTestProps> = React.createElement(
      FluentTest,
      {
        description: this.properties.description,
        context:this.context,
        Weburl:this.context.pageContext.web.absoluteUrl
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
