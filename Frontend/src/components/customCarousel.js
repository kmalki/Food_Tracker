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
              alt=''
              src='https://picsum.photos/200'
            />
            <div style={{textAlign:'center'}}>Test</div>
          </div>
          <div style={sss}>
            <img
              alt=''
              src='https://picsum.photos/200'
            />
            <div style={{textAlign:'center'}}>Test</div>
          </div>
          <div style={sss}>
            <img
              alt=''
              src='https://picsum.photos/200'
            />
            <div style={{textAlign:'center'}}>Test</div>
          </div>
          <div style={sss}>
            <img
              alt=''
              src='https://picsum.photos/200'
            />
            <div>Test</div>
          </div>
        </Carousel>
      </div>



    );
  }
}