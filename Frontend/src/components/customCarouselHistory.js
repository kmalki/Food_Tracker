import React from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export default class CustomCarousel extends React.Component {
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
              src='https://img.cuisineaz.com/240x192/2015-03-18/i21221-chili-con-carne-a-la-viande-hachee-et-aux-legumes.jpg'
            />
            <div style={{ textAlign: 'center' }}>Chili con carne à la viande hachée et aux légumes
</div>
          </div>
          <div style={sss}>
            <img
              style={{
                height: 200,
                width: 200
              }}
              alt=''
              src='https://img.cuisineaz.com/240x192/2017-02-06/i120624-croque-monsieur-omelette.jpeg'
            />
            <div style={{ textAlign: 'center' }}>Croque monsieur omelette</div>
          </div>
          <div style={sss}>
            <img
              style={{
                height: 200,
                width: 200
              }}
              alt=''
              src='https://img.cuisineaz.com/240x192/2018-03-19/i137459-endives-au-jambon-blanc-et-a-la-bechamel.jpeg'
            />
            <div style={{ textAlign: 'center' }}>Endives au jambon blanc et à la béchamel
            </div>
          </div>
          <div style={sss}>
            <img
              style={{
                height: 200,
                width: 200
              }}
              alt=''
              src='https://img.cuisineaz.com/240x192/2017-06-22/i129384-saumon-poele-aux-lentilles-vertes-du-puy.jpeg'
            />
            <div>Saumon poêlé aux lentilles vertes du Puy</div>
          </div>
        </Carousel>
      </div>



    );
  }
}