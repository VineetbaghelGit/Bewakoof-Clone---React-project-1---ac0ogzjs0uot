import { useSelector } from 'react-redux'

export function isUserAuthenticated (): boolean {
  const userToken = useSelector((state: any) => state?.auth?.userInfo?.token)
  return userToken?.length > 0
}
