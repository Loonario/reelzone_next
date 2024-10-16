import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { AvatarCust, AvatarFallbackCust, AvatarImageCust } from "@/components/ui/avatar-customized"
import { Edit, MapPin } from "lucide-react"

export interface CustomerProfileProps {
  firstName: string
  lastName: string
  instagramNickname: string
  location: string
  avatarUrl: string
  credits: number
}

function CustomerProfileComponent ({
  firstName,
  lastName,
  instagramNickname,
  location,
  avatarUrl,
  credits
}: CustomerProfileProps) {
  return (
    <div className="container mx-auto px-12 py-4 max-w-2xl">
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col items-center text-center mb-6">
            <div className="rounded-full overflow-hidden w-24 h-24 items-center" >
            <AvatarCust>
              <AvatarImageCust src={avatarUrl} alt={`${firstName} ${lastName}`} />
              <AvatarFallbackCust>{firstName}{lastName}</AvatarFallbackCust>
            </AvatarCust>
            </div>
            <h1 className="text-2xl font-bold mb-1">{firstName} {lastName}</h1>
            <p className="text-muted-foreground mb-1">{instagramNickname}</p>
            <p className="text-sm text-muted-foreground flex items-center">
              <MapPin className="w-4 h-4 mr-1" />
              {location}
            </p>
            <Button variant="outline" className="mt-4">
              <Edit className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          </div>
          
          <div className="flex items-center justify-between bg-muted p-4 rounded-lg">
            <div className="flex items-baseline justify-between">
            <p className="text-2xl font-bold">{credits}</p>
            <p className="ml-2 text-sm font-medium">Credits</p>
            </div>
            <Button>Buy Credits</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default  CustomerProfileComponent;