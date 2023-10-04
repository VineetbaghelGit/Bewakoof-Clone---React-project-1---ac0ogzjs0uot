// import { useSelector } from 'react-redux'

export function isUserAuthenticated (): boolean {
  //   const userToken = useSelector((state) => state?.auth?.loginToken);
  const userToken = ''
  return userToken?.length > 0
}
