import { useSelector } from 'react-redux'

export function isUserAuthenticated (): boolean {
  const userToken = useSelector((state: any) => state?.auth?.userInfo?.token)
  return userToken?.length > 0
}

export function loggedInUserInfo (): any {
  const userInfo = useSelector((state: any) => state?.auth?.userInfo)
  return userInfo
}

export function cartItemsCount (): number {
  const cartCount = useSelector((state: any) => state?.cart?.cartItemCount)
  return cartCount | 0
}
