import React from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export default class CustomCarouselTests extends React.Component {
  render() {
    const sss = {
      paddingLeft: '20px',
      paddingRight: '20px'
    };

    const responsive = {
      superLargeDesktop: {
        breakpoint: { max: 4000, min: 3000 },
        items: 4
      },
      desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3
      },
      tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2
      },
      mobile: {
        breakpoint: { max: 495, min: 0 },
        items: 1
      }
    };

    return (
      <div style={{
        width: '75%',
        maxWidth: '700px',
        margin: 'auto'
      }}
      >
        <Carousel
          responsive={responsive}
        >
          <div style={sss}>
            <img
              style={{
                height: 200,
                width: 200
              }}
              alt=''
              src='https://img.cuisineaz.com/240x192/2013-07-16/i10084-omelette-aux-courgettes.jpg'
            />
            <div style={{ textAlign: 'center' }}>Omelette aux courgettes</div>
          </div>
          <div style={sss}>
            <img
              style={{
                height: 200,
                width: 200
              }}
              alt=''
              src='https://img.cuisineaz.com/240x192/2014-02-21/i23179-cassoulet-au-canard.jpg'
            />
            <div style={{ textAlign: 'center' }}>Cassoulet au canard</div>
          </div>
          <div style={sss}>
            <img
              style={{
                height: 200,
                width: 200
              }}
              alt=''
              src='https://img.cuisineaz.com/240x192/2016-07-05/i75638-ratatouille.jpg'
            />
            <div style={{ textAlign: 'center' }}>Ratatouille niçoise à l'ancienne
</div>
          </div>
          <div style={sss}>
            <img
              style={{
                height: 200,
                width: 200
              }}
              alt=''
              src='https://img.cuisineaz.com/240x192/2016-05-25/i95016-poulet-au-curry-et-au-lait-de-coco.jpg'
            />
            <div>Poulet au curry et au lait de coco</div>
          </div>
        </Carousel>
      </div>



    );
  }
}