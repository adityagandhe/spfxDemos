import * as React from 'react';
import styles from './SpfxCurosal.module.scss';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { Carousel, CarouselButtonsLocation, CarouselButtonsDisplay } from "@pnp/spfx-controls-react/lib/Carousel";
export interface IComponentProps {
  Context:any;
  description:string;
}

export interface IComponentState {
  carouselElements:JSX.Element[];
}

export default class Component extends React.Component<IComponentProps, IComponentState> {

  constructor(props: IComponentProps) {
    super(props);

    this.state = {
      carouselElements:[
        <div key="1" >
        <div >
        <a href="#">
              <img src='https://images.unsplash.com/photo-1588614959060-4d144f28b207?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3078&q=80' alt="banner" className={[styles['rounded-top'], styles['img-responsive']].join(' ')} />
            </a>

          <div className={[styles["ms-bgColor-white"], styles["rounded-bottom"], styles["p-10"]].join(' ')}>
            <span className={[styles["ms-fontColor-green"], styles["ms-fontWeight-bold"]].join(' ')}>
              News title will show here. News title will show here. News title will show
              here. News title will show here. News title will show here. News title will
              show here. News title will show here. News title will show here.
              </span>
          </div>
        </div>
      </div>,
      <div key="2" >
        <div >
        <a href="#">
              <img src='https://images.unsplash.com/photo-1588614959060-4d144f28b207?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3078&q=80' alt="banner" className={[styles['rounded-top'], styles['img-responsive']].join(' ')} />
            </a>
              <div className={[styles["ms-bgColor-white"], styles["rounded-bottom"], styles["p-10"]].join(' ')}>
            <span className={[styles["ms-fontColor-green"], styles["ms-fontWeight-bold"]].join(' ')}>
              News title will show here. News title will show here. News title will show
              here. News title will show here. News title will show here. News title will
              show here. News title will show here. News title will show here.
            </span>
          </div>
        </div>
      </div>
      ]

  };
  }
  public render(): React.ReactElement<IComponentProps> {
    return (
      <div className={ styles.spfxCurosal }>
      <div className={ styles.container }>


         <Carousel

  buttonsLocation={CarouselButtonsLocation.top}
  buttonsDisplay={CarouselButtonsDisplay.hidden}



  isInfinite={true}

  element={this.state.carouselElements}
  onMoveNextClicked={(index: number) => { console.log(`Next button clicked: ${index}`); }}
  onMovePrevClicked={(index: number) => { console.log(`Prev button clicked: ${index}`); }}
/>
</div>
</div>

    );
  }
}
