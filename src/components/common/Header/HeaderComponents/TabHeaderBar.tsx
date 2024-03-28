import React from 'react'
import { Link } from 'react-router-dom'

function TabHeaderBar (): React.JSX.Element {
  const tabs = [
    { text: 'men', link: '/coming-soon' },
    { text: 'women', link: '/coming-soon' },
    { text: 'accessories', link: '/coming-soon' },
    { text: 'live now', link: '/coming-soon' },
    { text: 'bewakoof air', link: '/coming-soon' },
    { text: 'official merch', link: '/coming-soon' },
    { text: 'plus size', link: '/coming-soon' }
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
