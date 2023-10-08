import React from 'react'
import {
  bwfoffers,
  combos,
  commonbestseller,
  customization,
  lastsizeleft,
  newarrivals,
  officialcollab,
  plussize,
  vote
} from '../../../../config/Images'
import { Container } from 'react-bootstrap'

const featuredProducts = {
  'New Arrivals': newarrivals,
  Bestsellers: commonbestseller,
  Collaborations: officialcollab,
  Customization: customization,
  Combos: combos,
  'Coupon Offers': bwfoffers,
  'Vote for Designs': vote,
  'Plus Size': plussize,
  'Last Sizes Left': lastsizeleft
}
function FeaturedProduct (): React.JSX.Element {
  return (
    <Container>
      <div className="featured-slider">
        <ul>
          {Object.entries(featuredProducts).map(([key, value]) => (
            <li className="featured-product" key={key}>
              <div className="slider-inner">
                <div className="slider-image">
                  <img src={value} alt={key} />
                </div>
                <p>{key}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Container>
  )
}

export default FeaturedProduct
