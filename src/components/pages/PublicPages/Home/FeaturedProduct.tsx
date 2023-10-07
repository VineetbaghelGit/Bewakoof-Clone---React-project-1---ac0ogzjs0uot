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
function FeaturedProduct (): React.JSX.Element {
  return (
    <Container>
      <div className="featured-slider">
        <ul>
          <li className="featured-product">
            <div className="slider-inner">
              <div className="slider-image">
                <img src={newarrivals} />
              </div>
              <p>New Arrivals</p>
            </div>
          </li>
          <li className="featured-product">
            <div className="slider-inner">
              <div className="slider-image">
                <img src={commonbestseller} />
              </div>
              <p>Bestsellers</p>
            </div>
          </li>
          <li className="featured-product">
            <div className="slider-inner">
              <div className="slider-image">
                <img src={officialcollab} />
              </div>
              <p>Official Collaborations</p>
            </div>
          </li>{' '}
          <li className="featured-product">
            <div className="slider-inner">
              <div className="slider-image">
                <img src={customization} />
              </div>
              <p>Customization</p>
            </div>
          </li>
          <li className="featured-product">
            <div className="slider-inner">
              <div className="slider-image">
                <img src={combos} />
              </div>
              <p>Combos</p>
            </div>
          </li>{' '}
          <li className="featured-product">
            <div className="slider-inner">
              <div className="slider-image">
                <img src={bwfoffers} />
              </div>
              <p>Coupon Offers</p>
            </div>
          </li>
          <li className="featured-product">
            <div className="slider-inner">
              <div className="slider-image">
                <img src={vote} />
              </div>
              <p>Vote for Designs</p>
            </div>
          </li>{' '}
          <li className="featured-product">
            <div className="slider-inner">
              <div className="slider-image">
                <img src={plussize} />
              </div>
              <p>Plus Size</p>
            </div>
          </li>
          <li className="featured-product">
            <div className="slider-inner">
              <div className="slider-image">
                <img src={lastsizeleft} />
              </div>
              <p>Last Sizes Left</p>
            </div>
          </li>
        </ul>
      </div>
    </Container>
  )
}

export default FeaturedProduct
