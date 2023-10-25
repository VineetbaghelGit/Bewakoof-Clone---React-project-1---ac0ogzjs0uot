import React from 'react'
import AliceCarousel from 'react-alice-carousel'
import 'react-alice-carousel/lib/alice-carousel.css'
import {
  buy999,
  lokibanner,
  offsalebanner,
  offsalecommon,
  tshirtbanner
} from '../../../../config/Images'

const handleDragStart = (e: React.DragEvent<HTMLImageElement>): void => { e.preventDefault() }

const techResponsive = {
  0: { items: 1 },
  300: { items: 2 },
  600: { items: 3 }
}

const banners = [
  {
    key: 1,
    imageSrc: offsalecommon
  },
  {
    key: 2,
    imageSrc: offsalebanner
  },
  {
    key: 3,
    imageSrc: tshirtbanner
  },
  {
    key: 4,
    imageSrc: lokibanner
  },
  {
    key: 5,
    imageSrc: buy999
  }
]

function BannerCarousel (): React.JSX.Element {
  return (
    <React.Fragment>
      <AliceCarousel
        mouseTracking
        items={banners.map((banner) => (
          <div key={banner.key} className="banner">
            <img
              src={banner.imageSrc}
              onDragStart={handleDragStart}
              role="presentation"
            />
          </div>
        ))}
        responsive={techResponsive}
        controlsStrategy="alternate"
        autoPlay={true}
        autoPlayInterval={1200}
        infinite={true}
        animationDuration={1500}
        disableDotsControls={true}
        disableButtonsControls={true}
      />
    </React.Fragment>
  )
}

export default BannerCarousel
