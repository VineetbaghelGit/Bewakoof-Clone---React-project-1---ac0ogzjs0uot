/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React, { useState, useEffect } from 'react'
import { Link, useLocation, useSearchParams } from 'react-router-dom'

function BreadCrumBox (): React.JSX.Element {
  const { state } = useLocation()
  const [searchParams] = useSearchParams()
  const [tabs, setTabs] = useState<Array<{ text: string, link: string }>>([])

  useEffect(() => {
    if (searchParams.size > 0) {
      const gender = searchParams.get('gender')
      const category = searchParams.get('category')
      setTabs([
        { text: 'Home', link: '/' },
        { text: `${gender}`, link: '/' },
        { text: `${category} for ${gender}`, link: '/' }
      ])
    } else if (state) {
      setTabs([
        { text: 'Home', link: '/' },
        { text: state.gender || '', link: '/' },
        { text: state.name || '', link: '/' }
      ])
    } else {
      setTabs([
        { text: 'Home', link: '/' }
      ])
    }
  }, [searchParams, state])

  return (
    <div className='breadcrumbox'>
      <ul>
        {tabs.map((tab, index) => (
          <li key={index}>
            <Link to={tab.link} style={{ textTransform: 'capitalize' }}>{tab.text}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default BreadCrumBox
