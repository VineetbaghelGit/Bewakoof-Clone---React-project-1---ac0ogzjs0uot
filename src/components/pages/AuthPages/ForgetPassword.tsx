import React from 'react'
import ApiUtils from '../../../apis/ApiUtils'
import { ToasterMessage } from '../../../helper/ToasterHelper'
import AuthComponent from './AuthComponent'

type AuthFormData = Record<string, string>

function ForgetPassword (): JSX.Element {
  const initialState = {
    name: '',
    email: '',
    password: ''
  }

  const onSubmit = (formData: AuthFormData, navigate: any): void => {
    const body = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      appType: 'ecommerce'
    }

    ApiUtils.forgetPassword(body)
      .then((res: any) => {
        if (res.status === 201) {
          ToasterMessage('success', 'Reset Password Successfully')
          navigate('/login')
        }
      })
      .catch((err: any) => {
        ToasterMessage('error', err.data.message)
      })
  }

  return (
    <AuthComponent
      title="Reset"
      actionText="Reset Password"
      onSubmit={onSubmit}
      firstLinkTo="/login"
      firstLinkText="Login Here"
      secondLinkTo="/signup"
      secondLinkText="Dont have an account?"
      initialState={initialState}
    />
  )
}

export default ForgetPassword
