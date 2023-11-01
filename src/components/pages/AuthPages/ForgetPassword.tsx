import React from 'react'
import { ToasterMessage } from '../../../helper/ToasterHelper'
import AuthComponent from './AuthComponent'
import { APP_TYPE_ECOMMERCE, ASK_LOGIN_TEXT, ASK_SIGNUP_TEXT, LINK_TO_LOGIN, LINK_TO_SIGNUP, RESET_PASSWORD_TITLE } from '../../../config/Constant'
import { type NavigateFunction } from 'react-router-dom'
import AuthUtils from '../../../apis/AuthUtils'

type AuthFormData = Record<string, string>

function ForgetPassword (): JSX.Element {
  const initialState = {
    name: '',
    email: '',
    password: ''
  }

  const onSubmit = (formData: AuthFormData, navigate: NavigateFunction): void => {
    const body = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      appType: APP_TYPE_ECOMMERCE
    }

    AuthUtils.forgetPassword(body)
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
      title={RESET_PASSWORD_TITLE}
      actionText={RESET_PASSWORD_TITLE}
      onSubmit={onSubmit}
      firstLinkTo={LINK_TO_LOGIN}
      firstLinkText={ASK_LOGIN_TEXT}
      secondLinkTo={LINK_TO_SIGNUP}
      secondLinkText={ASK_SIGNUP_TEXT}
      initialState={initialState}
    />
  )
}

export default ForgetPassword
