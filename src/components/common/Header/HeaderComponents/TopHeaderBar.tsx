import React from 'react'

function TopHeaderBar (): React.JSX.Element {
  return (
        <React.Fragment>
            <div className='top-header'>
                <div className='top-header-left'>
                    <ul>
                        <li>
                            Offers
                        </li>
                        <li>
                            Fanbook
                        </li><li>
                            Download App
                        </li>
                        <li>
                            Tribe Membership
                        </li>
                    </ul>
                </div>
                <div className='top-header-right'>
                    <ul>
                        <li>
                            Contact us
                        </li>
                        <li>
                            Track Order
                        </li>
                    </ul>
                </div>
            </div>
        </React.Fragment>
  )
}

export default TopHeaderBar
