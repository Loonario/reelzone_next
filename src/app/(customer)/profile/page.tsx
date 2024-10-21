import { ProtectedPage } from '@/components/ProtectedPage'
import CustomerProfileComponent from './profileComponent';

export default function CustomerProfile() {
  return (
    //<ProtectedPage>
    <CustomerProfileComponent
      firstName="John"
      lastName="Doe"
      ig_name="@johndoe"
      location="Los Angeles, CA"
      avatar="/img/customer_ava.jpg"
      credits={100}
    />
    //</ProtectedPage>
  )
}