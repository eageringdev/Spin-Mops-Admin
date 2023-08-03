export interface User {
  uid: string
  email: string
  fullName: string
  userName: string
  phoneNumber: string
  profile: {
    companyName: string
    location: string
    companyContract: string
  }
}
