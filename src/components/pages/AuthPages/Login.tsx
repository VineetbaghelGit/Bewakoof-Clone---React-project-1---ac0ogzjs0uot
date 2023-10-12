import React from 'react'
import ApiUtils from '../../../apis/ApiUtils'
import { ToasterMessage } from '../../../helper/ToasterHelper'
import AuthComponent from './AuthComponent'
import { useLocation } from 'react-router-dom'
import Cookies from 'js-cookie'
import { useDispatch } from 'react-redux'
import { setUserAuthDetails } from '../../../store/slices/authSlices'

type AuthFormData = Record<string, string>

function Login (): JSX.Element {
  const { state } = useLocation()
  console.log('🚀 ~ file: Login.tsx:14 ~ Login ~ state:', state)
  const dispatch = useDispatch()
  const initialState = {
    email: '',
    password: ''
  }

  const onSubmit = (formData: AuthFormData, navigate: any): void => {
    const body = {
      email: formData.email,
      password: formData.password,
      appType: 'ecommerce'
    }

    ApiUtils.authLogin(body)
      .then((res: any) => {
        if (res.status === 200) {
          const userData = {
            name: res.data.data.name,
            token: res.data.token,
            email: res.data.data.email
          }
          const userDataString = JSON.stringify(userData)
          dispatch(setUserAuthDetails(userData))
          ToasterMessage('success', 'Login Successfully')
          Cookies.set('bwf-user-auth', userDataString)
          if (state?.prevPage?.length > 0) {
            navigate(state?.prevPage)
          } else {
            console.log('home')
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
      title="Log in"
      actionText="Login"
      onSubmit={onSubmit}
      firstLinkTo="/forget-password"
      firstLinkText="Forget Password?"
      secondLinkTo="/signup"
      secondLinkText="Dont have an account?"
      initialState={initialState}
    />
  )
}

export default Login
