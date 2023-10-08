import React from 'react'
import ApiUtils from '../../../apis/ApiUtils'
import { ToasterMessage } from '../../../helper/ToasterHelper'
import AuthComponent from './AuthComponent'
import { useLocation } from 'react-router-dom'

type AuthFormData = Record<string, string>

function Login (): JSX.Element {
  const { state } = useLocation()
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
          ToasterMessage('success', 'Login Successfully')
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
