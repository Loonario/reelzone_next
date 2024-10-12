import CustomerProfileComponent from './profileComponent';

export default function CustomerProfile() {
  return (

    <CustomerProfileComponent
      firstName="John"
      lastName="Doe"
      instagramNickname="@johndoe"
      location="Los Angeles, CA"
      avatarUrl="/path/to/avatar.jpg"
      credits={100}
    />
  )
}