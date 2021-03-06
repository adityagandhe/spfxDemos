import * as React from 'react';
import { MSGraphClient } from '@microsoft/sp-http';
import styles from '../FluentTest.module.scss';
import * as MicrosoftGraph from '@microsoft/microsoft-graph-types';
import { DetailsList, DetailsListLayoutMode } from 'office-ui-fabric-react';
export interface IComponentProps {
  description:string;
  context:any;
}
export interface IUserItem {
  displayName: string;
  mail: string;
  userPrincipalName: string;
}
export interface IComponentState {
  users:IUserItem[];
}

export default class Component extends React.Component<IComponentProps, IComponentState> {

  constructor(props: IComponentProps) {
    super(props);

    this.state = {
users:[{displayName:"test",mail:"test2",userPrincipalName:"test45"}],

  };
  }
  public getDetails=()=>{

  var userstemp: IUserItem[]=[];

    this.props.context.msGraphClientFactory
    .getClient()
    .then((client: MSGraphClient): void => {
      // get information about the current user from the Microsoft Graph
      client
      .api('/users')
     .get((error, userscoll: any, rawResponse?: any) => {

userscoll.value.map((Item:any)=>{
userstemp.push({
displayName:Item.displayName,
mail: Item.mail,
userPrincipalName: Item.userPrincipalName,
});
});

this.setState({
  users:[...userstemp,...this.state.users]
});
});

     }
  );

  alert("State value of users"+JSON.stringify(this.state.users));
}
public componentDidMount() {
 // this.getDetails();
}
  public render(): React.ReactElement<IComponentProps> {

    return (
      <div>
<div>All users</div>

<DetailsList
            items={this.state.users}

            setKey="set"
            layoutMode={DetailsListLayoutMode.justified}


            selectionPreservedOnEmptyClick={true}
            ariaLabelForSelectionColumn="Toggle selection"
            ariaLabelForSelectAllCheckbox="Toggle selection for all items"
            checkButtonAriaLabel="Row checkbox"

          />
<button onClick={this.getDetails}>get users</button>
</div>
   );
}
}
