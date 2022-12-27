import React from 'react'
import { Carousel } from 'react-bootstrap'
import banner1 from '../assets/banner1.jpg'
import banner2 from '../assets/banner2.jpg'
import banner3 from '../assets/banner3.jpg'
import banner4 from '../assets/banner4.jpg'

function ControlledCarousel() {
  return (
    <div>
    <Carousel style={{marginLeft:'-12px', marginRight:'-12px'}}>
    <Carousel.Item>
      <img
        className="d-block"
        src={banner4}
        alt="First slide"
      />
    </Carousel.Item>
    <Carousel.Item>
      <img
        className="d-block w-100"
        src={banner2}
        alt="Second slide"
      />

      <Carousel.Caption>
        <h3>Second slide label</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
      <img
        className="d-block w-100"
        src={banner1}
        alt="Third slide"
      />

      <Carousel.Caption>
        <h3>Third slide label</h3>
        <p>
          Praesent commodo cursus magna, vel scelerisque nisl consectetur.
        </p>
      </Carousel.Caption>
    </Carousel.Item>
  </Carousel>
    </div>
  )
}

export default ControlledCarousel;