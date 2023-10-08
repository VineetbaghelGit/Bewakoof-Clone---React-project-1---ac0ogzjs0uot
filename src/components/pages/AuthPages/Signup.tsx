import React from 'react'
import ApiUtils from '../../../apis/ApiUtils'
import { ToasterMessage } from '../../../helper/ToasterHelper'
import AuthComponent from './AuthComponent'

type AuthFormData = Record<string, string>

function Signup (): JSX.Element {
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

    ApiUtils.authSignup(body)
      .then((res: any) => {
        if (res.status === 201) {
          ToasterMessage('success', 'Register Successfully')
          navigate('/login')
        }
      })
      .catch((err: any) => {
        ToasterMessage('error', err.data.message)
      })
  }

  return (
    <AuthComponent
      title="Sign up"
      actionText="Sign up"
      onSubmit={onSubmit}
      firstLinkTo="/forget-password"
      firstLinkText="Forget Password?"
      secondLinkTo="/login"
      secondLinkText="Already have an account?"
      initialState={initialState}
    />
  )
}

export default Signup
