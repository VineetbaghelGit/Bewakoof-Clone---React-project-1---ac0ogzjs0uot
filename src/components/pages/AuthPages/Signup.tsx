import React from 'react'
import ApiUtils from '../../../apis/ApiUtils'
import { ToasterMessage } from '../../../helper/ToasterHelper'
import AuthComponent from './AuthComponent'
import { APP_TYPE_ECOMMERCE, ASK_FORGET_PASSWORD_TEXT, ASK_LOGIN_TEXT, LINK_TO_FORGET_PASSWORD, LINK_TO_LOGIN, SIGNUP_TITLE } from '../../../config/Constant'
import { type NavigateFunction } from 'react-router-dom'

type AuthFormData = Record<string, string>

function Signup (): JSX.Element {
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
      title={SIGNUP_TITLE}
      actionText={SIGNUP_TITLE}
      onSubmit={onSubmit}
      firstLinkTo={LINK_TO_FORGET_PASSWORD}
      firstLinkText={ASK_FORGET_PASSWORD_TEXT}
      secondLinkTo={LINK_TO_LOGIN}
      secondLinkText={ASK_LOGIN_TEXT}
      initialState={initialState}
    />
  )
}

export default Signup
