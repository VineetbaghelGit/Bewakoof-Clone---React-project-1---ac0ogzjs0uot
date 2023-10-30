import React from 'react'
import { Button, Col, Image, Row } from 'react-bootstrap'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import ApiUtils from '../../../../apis/ApiUtils'
import { ToasterMessage } from '../../../../helper/ToasterHelper'
import { isUserAuthenticated } from '../../../../helper/customUseSelector'

function Review ({ id }: { id: string | undefined }): React.JSX.Element {
  const isRouteProtected = isUserAuthenticated()

  const deleteReview = (): void => {
    if (id !== undefined) {
      ApiUtils.deleteProductReview(id)
        .then((res) => {
          if (res.status === 200) {
            ToasterMessage('success', res?.data?.message)
          }
        })
        .catch((err) => {
          ToasterMessage('error', err?.data?.message)
        })
    }
  }
  const addReview = (): void => {
    if (id !== undefined && isRouteProtected) {
      ApiUtils.addProductReview(id)
        .then((res) => {
          if (res.status === 201) {
            ToasterMessage('success', res?.data?.message)
          }
        })
        .catch((err) => {
          ToasterMessage('error', err?.data?.message)
        })
    }
  }
  return (
    <div className="review-container">
      <h3>Reviews</h3>
      <Row>
        <Col sm={12} className="rating-wrapper">
          <ul>
            <li>
              <div className="inner-wrap">
                <div className="star">
                  <Image
                    fluid
                    src="https://images.bewakoof.com/web/ic-star-mb-filled.svg"
                  />
                  <Image
                    fluid
                    src="https://images.bewakoof.com/web/ic-star-mb-filled.svg"
                  />{' '}
                  <Image
                    fluid
                    src="https://images.bewakoof.com/web/ic-star-mb-filled.svg"
                  />
                  <Image
                    fluid
                    src="https://images.bewakoof.com/web/ic-star-mb-filled.svg"
                  />
                  <Image
                    fluid
                    src="https://images.bewakoof.com/web/ic-star-mb-filled.svg"
                  />
                </div>
                <div className="review-msg">
                  <span>
                    Colour of fabric is beyond expectations...2nd pocket not
                    Available 😔 only one given... complete fitting
                  </span>
                </div>
                <div className="user-name">
                  <p>Test User</p>
                  {/* <span onClick={deleteReview}>
                    <DeleteOutlineIcon />
                  </span> */}
                </div>
                <div className="review-time">
                  <p>2023-10-26 </p>
                </div>
              </div>
            </li>
            <li>
              <div className="inner-wrap">
                <div className="star">
                  <Image
                    fluid
                    src="https://images.bewakoof.com/web/ic-star-mb-filled.svg"
                  />
                  <Image
                    fluid
                    src="https://images.bewakoof.com/web/ic-star-mb-filled.svg"
                  />{' '}
                  <Image
                    fluid
                    src="https://images.bewakoof.com/web/ic-star-mb-filled.svg"
                  />
                  <Image
                    fluid
                    src="https://images.bewakoof.com/web/ic-star-mb-filled.svg"
                  />
                  <Image
                    fluid
                    src="https://images.bewakoof.com/web/ic-star-mb-filled.svg"
                  />
                </div>
                <div className="review-msg">
                  <span>
                    Colour of fabric is beyond expectations...2nd pocket not
                    Available 😔 only one given... complete fitting
                  </span>
                </div>
                <div className="user-name">
                  <p>Test User</p>
                </div>
                <div className="review-time">
                  <p>2023-10-26 </p>
                </div>
              </div>
            </li>
          </ul>
        </Col>
      </Row>
      {isRouteProtected && (
        <form id="review-form">
          <h4>Write Your Review</h4>
          <div className="form-group">
            <textarea
              className="form-control"
              rows={4}
              placeholder="Write your review here..."
              name="review"
              id="review"
              defaultValue={''}
            />
          </div>
          <Button type="button" onClick={addReview} className="save-btn">
            Submit Review
          </Button>
          <Button
            type="button"
            onClick={deleteReview}
            className="save-btn delete-account"
          >
            <DeleteOutlineIcon />
            Delete Reviews
          </Button>
        </form>
      )}
    </div>
  )
}

export default Review
