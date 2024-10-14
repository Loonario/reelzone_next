"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import Link from 'next/link';
import { Heart, Star, Plus } from "lucide-react"
import Image from "next/image"

interface Reel {
  id: number
  preview: string
  name: string
  editorName: string
  editorAvatar: string
  likes: number
  favorites: number
}

const mockReels: Reel[] = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  preview: '/img/placeholder.svg',
  name: `Amazing Reel ${i + 1}`,
  editorName: `Reels Maker ${i + 1}`,
  editorAvatar: '/img/editor_ava.jpg',
  likes: Math.floor(Math.random() * 1000),
  favorites: Math.floor(Math.random() * 500),
}))

export default function ReferencesFeedComponent() {
  const [reels, setReels] = useState<Reel[]>(mockReels)
  const [likedReels, setLikedReels] = useState<Set<number>>(new Set())
  const [favoritedReels, setFavoritedReels] = useState<Set<number>>(new Set())

  const handleNewTask  = () => {
    // Placeholder function for creating a new task
    console.log("Create new task")
  }

  const handleLike = (id: number) => {
    setReels(prevReels =>
      prevReels.map(reel =>
        reel.id === id ? { ...reel, likes: likedReels.has(id) ? reel.likes - 1 : reel.likes + 1 } : reel
      )
    )
    setLikedReels(prevLiked => {
      const newLiked = new Set(prevLiked)
      if (newLiked.has(id)) {
        newLiked.delete(id)
      } else {
        newLiked.add(id)
      }
      return newLiked
    })
  }

  const handleFavorite = (id: number) => {
    setReels(prevReels =>
      prevReels.map(reel =>
        reel.id === id ? { ...reel, favorites: favoritedReels.has(id) ? reel.favorites - 1 : reel.favorites + 1 } : reel
      )
    )
    setFavoritedReels(prevFavorited => {
      const newFavorited = new Set(prevFavorited)
      if (newFavorited.has(id)) {
        newFavorited.delete(id)
      } else {
        newFavorited.add(id)
      }
      return newFavorited
    })
  }

  return (
    <div className="container mx-auto px-12 max-w-[1440px] py-4">
      <h1 className="text-2xl font-bold mb-6">References Feed</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {reels.map((reel) => (
          <Card key={reel.id} className="overflow-hidden">
            <Dialog>
              <DialogTrigger asChild>
                <CardContent className="p-0 cursor-pointer">
                  <div className="relative h-48">
                    <Image
                      src={reel.preview}
                      alt={reel.name}
                      fill
                      style={{objectFit: "cover"}}
                      
                    />
                  </div>
                  <div className="p-4">
                    <h2 className="font-semibold mb-2">{reel.name}</h2>
                    <div className="flex items-center">
                        <div className="h-6 w-6 overflow-hidden rounded-full" >
                      <Avatar>
                        <AvatarImage src={reel.editorAvatar} alt={reel.editorName} />
                        <AvatarFallback>{reel.editorName[0]}</AvatarFallback>
                      </Avatar>
                      </div>
                      <span className="ml-2 text-sm text-muted-foreground">{reel.editorName}</span>
                    </div>
                  </div>
                </CardContent>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>{reel.name}</DialogTitle>
                </DialogHeader>
                <div className="relative h-64 mb-4">
                  <Image
                    src={reel.preview}
                    alt={reel.name}
                    fill
                    style={{objectFit: "cover"}}
                  />
                </div>
                <div className="flex items-center mb-4">
                    <div className="h-8 w-8 rounded-full overflow-hidden">
                  <Avatar>
                    <AvatarImage src={reel.editorAvatar} alt={reel.editorName} />
                    <AvatarFallback>{reel.editorName[0]}</AvatarFallback>
                  </Avatar>
                  </div>
                  <span className="ml-2 font-semibold">{reel.editorName}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  This is a detailed description of the reel. It would include information about the
                  techniques used, the inspiration behind it, and any other relevant details.
                </p>
                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={() => handleLike(reel.id)}
                    className={likedReels.has(reel.id) ? 'text-red-500' : ''}
                  >
                    <Heart
                      className="mr-2 h-4 w-4"
                      fill={likedReels.has(reel.id) ? "currentColor" : "none"}
                    />
                    {reel.likes}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleFavorite(reel.id)}
                    className={favoritedReels.has(reel.id) ? 'text-amber-400' : ''}
                  >
                    <Star
                      className="mr-2 h-4 w-4"
                      fill={favoritedReels.has(reel.id) ? "currentColor" : "none"}
                    />
                    {reel.favorites}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
            <div className="flex justify-between p-4 bg-muted">
              <Button
                variant="ghost"
                size="sm"
                className={`flex items-center ${likedReels.has(reel.id) ? 'text-red-500' : ''}`}
                onClick={(e) => {
                  e.stopPropagation()
                  handleLike(reel.id)
                }}
              >
                <Heart className="mr-2 h-4 w-4" fill={likedReels.has(reel.id) ? "currentColor" : "none"} />
                <span>{reel.likes}</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className={`flex items-center ${favoritedReels.has(reel.id) ? 'text-amber-400' : ''}`}
                onClick={(e) => {
                  e.stopPropagation()
                  handleFavorite(reel.id)
                }}
              >
                <Star className="mr-2 h-4 w-4" fill={favoritedReels.has(reel.id) ? "currentColor" : "none"} />
                <span>{reel.favorites}</span>
              </Button>
            </div>
          </Card>
        ))}
      </div>
      <Link href='/customer/newTask'>
      <Button
        className="fixed bottom-6 right-6 rounded-full w-14 h-14 shadow-lg"
        onClick={handleNewTask}
      >
        <Plus className="w-6 h-6" />
        <span className="sr-only">New Task</span>
      </Button>
      </Link>
    </div>
  )
}