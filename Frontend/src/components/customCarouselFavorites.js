import React from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export default class CustomCarouselFavorites extends React.Component {
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
              src='https://img.cuisineaz.com/320x320/2020-03-23/i152774-saucisses-aux-lentilles.jpeg'
            />
            <div style={{ textAlign: 'center' }}>Saucisses aux lentilles</div>
          </div>
          <div style={sss}>
            <img
              style={{
                height: 200,
                width: 200
              }}
              alt=''
              src='https://img.cuisineaz.com/320x320/2013-12-20/i37576-puree-de-pommes-de-terre-maison.jpg'
            />
            <div style={{ textAlign: 'center' }}>Purée de pomme de terre maison</div>
          </div>
          <div style={sss}>
            <img
              style={{
                height: 200,
                width: 200
              }}
              alt=''
              src='https://img.cuisineaz.com/320x320/2016-04-28/i71925-gigot-d-agneau-poele-a-l-os.jpg'
            />
            <div style={{ textAlign: 'center' }}>Gogot d'agneau</div>
          </div>
          <div style={sss}>
            <img
              style={{
                height: 200,
                width: 200
              }}
              alt=''
              src='https://img.cuisineaz.com/320x320/2016-04-28/i48352-tomates-farcies-au-riz.jpg'
            />
            <div>Tomates farcies au riz</div>
          </div>
        </Carousel>
      </div>



    );
  }
}