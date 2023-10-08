import React from 'react'
import { Link } from 'react-router-dom'

function TabHeaderBar (): React.JSX.Element {
  const tabs = [
    { text: 'men', link: '/' },
    { text: 'women', link: '/' },
    { text: 'accessories', link: '/' },
    { text: 'live now', link: '/' },
    { text: 'bewakoof air', link: '/' },
    { text: 'official merch', link: '/' },
    { text: 'plus size', link: '/' }
  ]

  return (
    <div className="bottom-header-wrapper">
      <ul>
        {tabs.map((tab, index) => (
          <div className="tab-nav" key={index}>
            <li>
              <Link to={tab.link}>{tab.text}</Link>
            </li>
          </div>
        ))}
      </ul>
    </div>
  )
}

export default TabHeaderBar
