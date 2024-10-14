import CustomerProfileComponent from './profileComponent';

export default function CustomerProfile() {
  return (

    <CustomerProfileComponent
      firstName="John"
      lastName="Doe"
      instagramNickname="@johndoe"
      location="Los Angeles, CA"
      avatarUrl="/img/customer_ava.jpg"
      credits={100}
    />
  )
}