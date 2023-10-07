import React from 'react'
import AliceCarousel from 'react-alice-carousel'
import 'react-alice-carousel/lib/alice-carousel.css'
import { buy999, lokibanner, offsalebanner, offsalecommon, tshirtbanner } from '../../../../config/Images'

const handleDragStart = (e: any): void => e.preventDefault()

const techResponsive = {
  0: { items: 1 },
  300: { items: 2 },
  600: { items: 3 }
}
const items = [
  <div key={1} className="banner">
    <img
      src={offsalecommon}
      onDragStart={handleDragStart}
      role="presentation"
    />
  </div>,
  <div key={2} className="banner">
    <img
      src={offsalebanner}
      onDragStart={handleDragStart}
      role="presentation"
    />
  </div>,
  <div key={3} className="banner">
    <img
      src={tshirtbanner}
      onDragStart={handleDragStart}
      role="presentation"
    />
  </div>,
   <div key={4} className="banner">
   <img
     src={lokibanner}
     onDragStart={handleDragStart}
     role="presentation"
   />
 </div>,
  <div key={5} className="banner">
  <img
    src={buy999}
    onDragStart={handleDragStart}
    role="presentation"
  />
</div>
]
function BannerCarousel (): React.JSX.Element {
  return (
    <React.Fragment>
      <AliceCarousel
        mouseTracking
        items={items}
        responsive={techResponsive}
        controlsStrategy="alternate"
        autoPlay={true}
        autoPlayInterval={1200}
        infinite={true}
        animationDuration={1500}
        // disableDotsControls={true}
        disableButtonsControls={true}
      />
    </React.Fragment>
  )
}

export default BannerCarousel
