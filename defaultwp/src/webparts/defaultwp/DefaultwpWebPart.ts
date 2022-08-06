import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {SPPermission} from '@microsoft/sp-page-context';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneButton,
  PropertyPaneLabel,
  PropertyPaneDropdown,
  PropertyPaneDropdownOptionType
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'DefaultwpWebPartStrings';
import Defaultwp from './components/Defaultwp';
import { IDefaultwpProps } from './components/IDefaultwpProps';

export interface IDefaultwpWebPartProps {
  description: string;
  buttonTitle:string;
  labelTitle:string;
}

export default class DefaultwpWebPart extends BaseClientSideWebPart <IDefaultwpWebPartProps> {

  public render(): void {
    let teamsval:boolean=false;

    if(this.context.sdks.microsoftTeams)
    {
      teamsval=true;
    }
    let isAdmin =this.context.pageContext.web.permissions.hasAllPermissions(SPPermission.fullMask);
    const element: React.ReactElement<IDefaultwpProps> = React.createElement(
      Defaultwp,
      { team: teamsval,
        description: this.properties.description,
        context:this.context,
        user: this.context.pageContext.user.email,
        isAdmin:isAdmin
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }
protected get disableReactivePropertyChanges():boolean{
  return true;
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

              ]
            }
          ]
        },
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [

                PropertyPaneLabel('labelTitle', {
                  text: strings.PropertyPaneLabel
                }),

              ]
            }
          ]
        },
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [

                PropertyPaneButton('buttonTitle', {
                  text: strings.PropertyPaneButton,
                  onClick : (value: any) => null

                }),
              ]
            }
          ]
        },
      ]
    };
  }
}
