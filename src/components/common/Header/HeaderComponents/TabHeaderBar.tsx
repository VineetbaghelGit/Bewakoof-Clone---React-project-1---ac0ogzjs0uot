import React from 'react'
import { Link } from 'react-router-dom'

function TabHeaderBar (): React.JSX.Element {
  return (
    <React.Fragment>
      <div className="bottom-header-wrapper">
        <ul>
          <div className="tab-nav">
            <li>
              <Link to="/">men</Link>
            </li>
          </div>{' '}
          <div className="tab-nav">
            <li>
              <Link to="/">women</Link>
            </li>
          </div>{' '}
          <div className="tab-nav">
            <li>
              <Link to="/">accessories</Link>
            </li>
          </div>{' '}
          <div className="tab-nav">
            <li>
              <Link to="/">live now</Link>
            </li>
          </div>
          <div className="tab-nav">
            <li>
              <Link to="/">bewakoof air</Link>
            </li>
          </div>
          <div className="tab-nav">
            <li>
              <Link to="/">official merch</Link>
            </li>
          </div>
          <div className="tab-nav">
            <li>
              <Link to="/">plus size</Link>
            </li>
          </div>
        </ul>
      </div>
    </React.Fragment>
  )
}

export default TabHeaderBar
