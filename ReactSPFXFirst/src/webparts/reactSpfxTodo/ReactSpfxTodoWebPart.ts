import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import ToDoList from "./components/ToDoList";
import * as strings from 'ReactSpfxTodoWebPartStrings';
import ReactSpfxTodo from './components/ReactSpfxTodo';
import { SPHttpClient, SPHttpClientResponse,ISPHttpClientOptions } from "@microsoft/sp-http";
import * as jQuery from 'jquery';
import * as bootstrap from 'bootstrap';
import { IReactSpfxTodoProps } from './components/IReactSpfxTodoProps';
import FirstClassComponent from './components/FirstClassComponent';
import { initializeIcons } from '@uifabric/icons';
initializeIcons();
export interface IReactSpfxTodoWebPartProps {
  description: string;

}

export default class ReactSpfxTodoWebPart extends BaseClientSideWebPart <IReactSpfxTodoWebPartProps> {

  public render(): void {

    const element: React.ReactElement<IReactSpfxTodoProps> = React.createElement(
      ToDoList,
      {
        description: this.properties.description,
        spHttpClient:this.context.spHttpClient,
        siteUrl:this.context.pageContext.web.absoluteUrl

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
