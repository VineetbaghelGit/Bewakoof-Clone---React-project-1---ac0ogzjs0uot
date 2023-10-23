export interface UserDetails {
  name: string
  email: string
  passwordCurrent: string
  password: string
}
export interface SideDrawerProps {
  isOpen: boolean
  setOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>
}
export type AuthFormData = Record<string, string>

export interface AuthComponentProps {
  title: string
  actionText: string
  onSubmit: (formData: AuthFormData, navigate: any) => void
  firstLinkTo: string
  firstLinkText: string
  secondLinkTo: string
  secondLinkText: string
  initialState: AuthFormData
}

export interface cartState {
  cartItemCount: number
}
export interface SliceState {
  userInfo: {
    name: string
    email: string
    token: string
  }
}
export interface WishlistItem {
  products: {
    displayImage: string
    name: string
    price: number
    ratings: number
    _id: string
  }
}
export interface cartList {
  product: {
    displayImage: string
    name: string
    price: number
    ratings: number
    _id: string
  }
}
export interface GetProductResType {
  brand: string
  displayImage: string
  name: string
  price: number
  sellerTag: string
  _id: string
}

export interface OrderResponse {
  items: any[]
  orderDate: string
  shipmentDetails: {
    address: {
      city: string
      street: string
      country: string
      state: string
      zipCode: string
    }
    type: string
  }
  status: string
  totalPrice: number
  _id: string
}

export interface OrderItem {
  order: Order
}

export interface Order {
  _id: number
  items: Item[]
}
export interface Item {
  product: {
    name: string
    displayImage: string
    status: string
    _id: string
  }
}

export interface UserAddressInfo {
  street: string
  city: string
  state: string
  zipCode: string
  country: string
  addressType: string
}
