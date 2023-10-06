import { useLocation } from 'react-router'

export function userPathLocation (): string {
  const userLocation = useLocation()
  return userLocation?.pathname
}
