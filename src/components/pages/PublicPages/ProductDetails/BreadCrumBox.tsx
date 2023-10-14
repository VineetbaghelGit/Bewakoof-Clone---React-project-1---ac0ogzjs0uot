import React from 'react'
import { Link, useLocation } from 'react-router-dom'

function BreadCrumBox (): React.JSX.Element {
  const { state } = useLocation()
  const tabs = [
    { text: 'Home', link: '/' },
    { text: state?.gender, link: '/' },
    { text: state?.name, link: '/' }
  ]
  return (
    <div className='breadcrumbox'>
       <ul>
        {tabs.map((tab, index) => (
            <li key={index}>
              <Link to={tab.link}>{tab.text}</Link>
            </li>
        ))}
      </ul>
    </div>
  )
}

export default BreadCrumBox
