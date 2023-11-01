import React from 'react'
import { ToasterMessage } from '../../../helper/ToasterHelper'
import AuthComponent from './AuthComponent'
import { useLocation } from 'react-router-dom'
import Cookies from 'js-cookie'
import { useDispatch } from 'react-redux'
import { setUserAuthDetails } from '../../../store/slices/authSlices'
import { APP_TYPE_ECOMMERCE, ASK_FORGET_PASSWORD_TEXT, ASK_SIGNUP_TEXT, COOKIE_STORAGE_KEY, LINK_TO_FORGET_PASSWORD, LINK_TO_SIGNUP, LOGIN_TITLE } from '../../../config/Constant'
import { type NavigateFunction } from 'react-router-dom'
import AuthUtils from '../../../apis/AuthUtils'

type AuthFormData = Record<string, string>

function Login (): JSX.Element {
  const { state } = useLocation()
  const dispatch = useDispatch()
  const initialState = {
    email: '',
    password: ''
  }

  const onSubmit = (formData: AuthFormData, navigate: NavigateFunction): void => {
    const body = {
      email: formData.email,
      password: formData.password,
      appType: APP_TYPE_ECOMMERCE
    }

    AuthUtils.authLogin(body)
      .then((res: any) => {
        if (res.status === 200) {
          const userData = {
            name: res.data.data.name,
            token: res.data.token,
            email: res.data.data.email,
            profileImage: res?.data?.data?.profileImage
          }
          const userDataString = JSON.stringify(userData)
          dispatch(setUserAuthDetails(userData))
          ToasterMessage('success', 'Login Successfully')
          Cookies.set(COOKIE_STORAGE_KEY, userDataString)
          if (state?.prevPage?.length > 0) {
            navigate(state?.prevPage)
          } else {
            navigate('/')
          }
        }
      })
      .catch((err: any) => {
        ToasterMessage('error', err?.data?.message)
      })
  }

  return (
    <AuthComponent
      title={LOGIN_TITLE}
      actionText={LOGIN_TITLE}
      onSubmit={onSubmit}
      firstLinkTo={LINK_TO_FORGET_PASSWORD}
      firstLinkText={ASK_FORGET_PASSWORD_TEXT}
      secondLinkTo={LINK_TO_SIGNUP}
      secondLinkText={ASK_SIGNUP_TEXT}
      initialState={initialState}
    />
  )
}

export default Login
