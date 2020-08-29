import * as React from 'react';
import styles from "../Default.module.scss";
import {ICurosalComponentState} from "./ICurousalState";
import { ICurosalComponentProps} from "./ICurousalProps";
import ListView from '../ListView/ListViewComp';
import { Carousel, CarouselButtonsLocation, CarouselButtonsDisplay, CarouselIndicatorShape } from "@pnp/spfx-controls-react/lib/Carousel";
import { Guid } from '@microsoft/sp-core-library';
import { ICarouselImageProps } from '@pnp/spfx-controls-react/lib/controls/carousel/CarouselImage';
import ServicesClass from "../Services/FetchData";




export default class Component extends React.Component< ICurosalComponentProps, ICurosalComponentState> {
public sp_ops:ServicesClass;
  constructor(props:  ICurosalComponentProps) {
    super(props);
   this.sp_ops = new ServicesClass();
    this.state = { carouselElements:[
      {
        imageSrc: 'https://upload.wikimedia.org/wikipedia/en/5/53/Rocky_balboa.jpeg',
        title: 'Colosseum',
        description: 'This is Colosseum',
        url: 'https://en.wikipedia.org/wiki/Colosseum',
        showDetailsOnHover: true,

      },


    ]
    };
  }
public componentDidMount()
{
  let temp_curosal:ICarouselImageProps[]=[];
  this.sp_ops.FetchCarousal(this.props.ContextValue).then(Items=>{
    Items.map(Item=>{

     let ItemValue={
      imageSrc: Item.EncodedAbsUrl,
      title: Item.Title,
      description: Item.Description,
      url: Item.Url,
      showDetailsOnHover: true,
     };
     temp_curosal.push(ItemValue);
this.setState({carouselElements:temp_curosal

});
    });
  });
}
  public render(): React.ReactElement< ICurosalComponentProps> {
    return (
      <div className={ styles.default }>
         <div className={ styles.container }>
          <div className={ styles.row }>


          <Carousel

buttonsDisplay={CarouselButtonsDisplay.buttonsOnly}
contentContainerStyles={null}
isInfinite={true}
indicatorShape={CarouselIndicatorShape.rectangle}
pauseOnHover={true}
buttonsLocation={CarouselButtonsLocation.center}


containerStyles={styles.containerCur}



element={this.state.carouselElements}
onMoveNextClicked={(index: number) => { console.log(`Next button clicked: ${index}`); }}
onMovePrevClicked={(index: number) => { console.log(`Prev button clicked: ${index}`); }}
/>


          </div>
          </div>
          </div>

    );
  }
}
