"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { CheckCircle2, Download, Play, Plus, Trash2, Upload, X } from "lucide-react"
import Image from "next/image"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


interface TaskDetailsProps {
    taskName: string
    initialStatus: string
    reels: {
      id: number
      name: string
      complexity: "Video Only" | "Video + Credits" | "Video + Motion" | "Animation Only"
      versions: {
        id: number
        name: string
        version: string
        preview: string
        videoUrl: string
      }[]
      approvedVersion?: number
    }[]
  }

// Mock data (you may want to move this to a separate file or fetch from an API)
const favoriteReels = [
    { id: 1, name: "Summer Vibes", image: "/img/placeholder.svg" },
    { id: 2, name: "Urban Explorer", image: "/img/placeholder.svg" },
    { id: 3, name: "Nature's Beauty", image: "/img/placeholder.svg" },
    { id: 4, name: "Tech Showcase", image: "/img/placeholder.svg" },
    { id: 5, name: "Food Delights", image: "/img/placeholder.svg" },
    { id: 6, name: "Travel Adventures", image: "/img/placeholder.svg" },
  ]

  const mockUploadedMedia = {
    videos: [
      { id: 1, name: "Beach Sunset.mp4", preview: "/img/placeholder.svg", comment: "Beautiful sunset scene" },
      { id: 2, name: "City Timelapse.mp4", preview: "/img/placeholder.svg", comment: "Urban life in motion" },
    ],
    images: [
      { id: 1, name: "Mountain View.jpg", preview: "/img/placeholder.svg", comment: "Panoramic mountain landscape" },
      { id: 2, name: "Ocean Waves.jpg", preview: "/img/placeholder.svg", comment: "Serene ocean waves" },
    ],
    audio: [
      { id: 1, name: "Nature Sounds.mp3", comment: "Relaxing forest ambience" },
      { id: 2, name: "Urban Beats.mp3", comment: "Upbeat city soundtrack" },
    ],
  }

  const mockReelsSettings = [
    { id: 1, number: "Reel 1", duration: "00:30", complexity: "Video only" },
    { id: 2, number: "Reel 2", duration: "00:45", complexity: "Video + credits" },
    { id: 3, number: "Reel 3", duration: "01:00", complexity: "Video + motion" },
  ]



export default function TaskDetails({ taskName, initialStatus, reels }: TaskDetailsProps) {
  const [status, setStatus] = useState(initialStatus)
  const [selectedVersions, setSelectedVersions] = useState<Record<number, number>>({})
  const [approvedVersions, setApprovedVersions] = useState<Record<number, number>>({})
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([])
  const [newMessage, setNewMessage] = useState("")

    // States from NewTask component
    const [taskDescription, setTaskDescription] = useState("")
    const [selectedReferences, setSelectedReferences] = useState<number[]>([])
    const [uploadedMedia, setUploadedMedia] = useState(mockUploadedMedia)
    const [reelsSettings, setReelsSettings] = useState(mockReelsSettings)
    const [isModalOpen, setIsModalOpen] = useState(false)

  const statusOptions = [
    { value: "on-review", label: "On Review", color: "bg-purple-500" },
    { value: "done", label: "Done", color: "bg-sky-500" },
    { value: "in-queue", label: "In Queue", color: "bg-yellow-500" },
    { value: "on-hold", label: "On Hold", color: "bg-red-500" },
    { value: "archived", label: "Archived", color: "bg-gray-500" },
  ]

  const handleVersionSelect = (reelId: number, versionId: number) => {
    setSelectedVersions(prev => ({ ...prev, [reelId]: versionId }))
  }

  const handleApprove = (reelId: number) => {
    if (selectedVersions[reelId]) {
      setApprovedVersions(prev => ({ ...prev, [reelId]: selectedVersions[reelId] }))
    }
  }

  const handleDownload = (videoUrl: string) => {
    // Implement download functionality
    console.log(`Downloading video: ${videoUrl}`)
  }

  const handlePlayVideo = (videoUrl: string) => {
    // Implement video playback functionality
    console.log(`Playing video: ${videoUrl}`)
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (newMessage.trim()) {
      setMessages([...messages, { sender: "You", text: newMessage.trim() }])
      setNewMessage("")
      // Here you would typically send the message to a backend
    }
  }
  // Handler functions from NewTask component
  const handleReferenceToggle = (id: number) => {
    setSelectedReferences(prev =>
      prev.includes(id) ? prev.filter(refId => refId !== id) : [...prev, id]
    )
  }

  const handleRemoveReference = (id: number) => {
    setSelectedReferences(prev => prev.filter(refId => refId !== id))
  }

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Implementation omitted for brevity
  }

  const handleDelete = (type: 'videos' | 'images' | 'audio', id: number) => {
    setUploadedMedia(prev => ({
      ...prev,
      [type]: prev[type].filter(item => item.id !== id)
    }))
  }

  const handleCommentChange = (type: 'videos' | 'images' | 'audio', id: number, comment: string) => {
    setUploadedMedia(prev => ({
      ...prev,
      [type]: prev[type].map(item =>
        item.id === id ? { ...item, comment } : item
      )
    }))
  }

  const handleAddReel = () => {
    const newReel = {
      id: Date.now(),
      number: `Reel ${reelsSettings.length + 1}`,
      duration: "00:30",
      complexity: "Video only"
    }
    setReelsSettings(prev => [...prev, newReel])
  }

  const handleDeleteReel = (id: number) => {
    setReelsSettings(prev => prev.filter(reel => reel.id !== id))
  }

  const handleComplexityChange = (id: number, complexity: string) => {
    setReelsSettings(prev => prev.map(reel =>
      reel.id === id ? { ...reel, complexity, duration: reel.duration } : reel
    ))
  }

  const handleDurationChange = (id: number, duration: string) => {
    setReelsSettings(prev => prev.map(reel =>
      reel.id === id ? { ...reel, duration } : reel
    ))
  }

  return (
    <div className="flex justify-center min-h-screen bg-background">
      <div className="container max-w-[1440px] mx-auto px-12 py-4">
        <Card className="w-full">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <h1 className="text-2xl font-bold mb-4 md:mb-0">{taskName}</h1>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      <div className="flex items-center">
                        <span className={`w-2 h-2 rounded-full mr-2 ${option.color}`}></span>
                        {option.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Tabs defaultValue="workflow">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="workflow">Workflow</TabsTrigger>
                <TabsTrigger value="details">Task Details</TabsTrigger>
              </TabsList>
              <TabsContent value="workflow">
                <div className="space-y-8">
                  {reels.map((reel) => (
                    <Accordion type="single" collapsible className="w-full" key={reel.id}>
                      <AccordionItem value={`reel-${reel.id}`}>
                        <AccordionTrigger className="hover:no-underline px-2">
                          <div className="flex items-center">
                            <h3 className="text-lg font-semibold">Reel {reel.id} - {reel.complexity}</h3>
                            {approvedVersions[reel.id] && (
                              <CheckCircle2 className="w-5 h-5 text-emerald-500 ml-2" />
                            )}
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-4 p-2">
                            <ScrollArea className="w-full whitespace-nowrap rounded-md border">
                              <div className="flex w-max space-x-4 p-4">
                                {reel.versions.map((version) => (
                                  <Card
                                    key={version.id}
                                    className={`w-[200px] cursor-pointer overflow-hidden ${
                                      approvedVersions[reel.id] === version.id
                                        ? 'ring-2 ring-done'
                                        : selectedVersions[reel.id] === version.id
                                        ? 'ring-2 ring-primary'
                                        : ''
                                    }`}
                                    onClick={() => handleVersionSelect(reel.id, version.id)}
                                  >
                                    <CardContent className="p-0">
                                      <div className="relative h-[120px]">
                                        <Image
                                          src={version.preview}
                                          alt={version.name}
                                          layout="fill"
                                          objectFit="cover"
                                        />
                                      </div>
                                      <div className="p-2">
                                        <p className="font-medium">{version.name}</p>
                                        <p className="text-sm text-muted-foreground">{version.version}</p>
                                      </div>
                                      <div className="flex justify-between p-2 bg-muted">
                                        <Button
                                          size="sm"
                                          variant="ghost"
                                          onClick={(e) => {
                                            e.stopPropagation()
                                            handleDownload(version.videoUrl)
                                          }}
                                        >
                                          <Download className="w-4 h-4" />
                                        </Button>
                                        <Button
                                          size="sm"
                                          variant="ghost"
                                          onClick={(e) => {
                                            e.stopPropagation()
                                            handlePlayVideo(version.videoUrl)
                                          }}
                                        >
                                          <Play className="w-4 h-4" />
                                        </Button>
                                      </div>
                                    </CardContent>
                                  </Card>
                                ))}
                              </div>
                              <ScrollBar orientation="horizontal" />
                            </ScrollArea>
                            <div>
                              <Button
                                onClick={() => handleApprove(reel.id)}
                                disabled={!selectedVersions[reel.id]}
                              >
                                {approvedVersions[reel.id]
                                  ? `Approved ${reel.versions.find(v => v.id === approvedVersions[reel.id])?.version}`
                                  : 'Approve'}
                              </Button>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="details">
              <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="references">
                    <AccordionTrigger>References</AccordionTrigger>
                    <AccordionContent>
                    <div className="p-2">
                      <div className="flex justify-between mb-4">
                        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                          <DialogTrigger asChild>
                            <Button>
                              <Plus className="w-4 h-4 mr-2" />
                              Add References
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[725px]">
                            <DialogHeader>
                              <DialogTitle>Select References</DialogTitle>
                            </DialogHeader>
                            <ScrollArea className="h-[400px] mt-4 pr-4">
                              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                {favoriteReels.map(reel => (
                                  <Card key={reel.id} className="overflow-hidden">
                                    <CardContent className="p-0">
                                      <div className="relative">
                                        <Image
                                          src={reel.image}
                                          alt={reel.name}
                                          width={180}
                                          height={100}
                                          className="w-full h-32 object-cover"
                                        />
                                        <Checkbox
                                          id={`reel-${reel.id}`}
                                          className="absolute top-2 right-2"
                                          checked={selectedReferences.includes(reel.id)}
                                          onCheckedChange={() => handleReferenceToggle(reel.id)}
                                        />
                                      </div>
                                      <Label
                                        htmlFor={`reel-${reel.id}`}
                                        className="block p-2 cursor-pointer"
                                      >
                                        {reel.name}
                                      </Label>
                                    </CardContent>
                                  </Card>
                                ))}
                              </div>
                            </ScrollArea>
                          </DialogContent>
                        </Dialog>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {favoriteReels.filter(reel => selectedReferences.includes(reel.id)).map(reel => (
                          <Card key={reel.id} className="overflow-hidden">
                            <CardContent className="p-0">
                              <div className="relative">
                                <Image
                                  src={reel.image}
                                  alt={reel.name}
                                  width={180}
                                  height={100}
                                  className="w-full h-32 object-cover"
                                />
                                <Button
                                  variant="destructive"
                                  size="icon"
                                  className="absolute top-2 right-2"
                                  onClick={() => handleRemoveReference(reel.id)}
                                >
                                  <X className="w-4 h-4" />
                                  <span className="sr-only">Remove reference</span>
                                </Button>
                              </div>
                              <div className="p-2">
                                <p className="font-medium mb-2">{reel.name}</p>
                                <Textarea
                                  placeholder="Add a comment for this reference"
                                  rows={3}
                                  className="w-full"
                                />
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="source-media">
                    <AccordionTrigger>Source Media</AccordionTrigger>
                    <AccordionContent>
                    <div className="p-2">
                      <div className="mb-4">
                        <Input
                          type="file"
                          onChange={handleUpload}
                          multiple
                          accept="video/*,audio/*,image/*"
                          className="hidden"
                          id="file-upload"
                        />
                        <Label htmlFor="file-upload" className="cursor-pointer">
                          <Button asChild>
                            <span>
                              <Upload className="w-4 h-4 mr-2" />
                              Upload Files
                            </span>
                          </Button>
                        </Label>
                      </div>
                      <Tabs defaultValue="videos">
                        <TabsList>
                          <TabsTrigger value="videos">Videos</TabsTrigger>
                          <TabsTrigger value="images">Images</TabsTrigger>
                          <TabsTrigger value="audio">Audio</TabsTrigger>
                        </TabsList>
                        <TabsContent value="videos">
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {uploadedMedia.videos.map(video => (
                              <Card key={video.id}>
                                <CardContent className="p-4">
                                  <div className="relative mb-2">
                                    <Image
                                      src={video.preview}
                                      alt={video.name}
                                      width={180}
                                      height={100}
                                      className="w-full h-32 object-cover rounded"
                                    />
                                    <Button
                                      variant="destructive"
                                      size="icon"
                                      className="absolute top-2 right-2"
                                      onClick={() => handleDelete('videos', video.id)}
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </Button>
                                  </div>
                                  <p className="text-sm font-medium mb-2">{video.name}</p>
                                  <Textarea
                                    placeholder="Add a comment"
                                    value={video.comment}
                                    onChange={(e) => handleCommentChange('videos', video.id, e.target.value)}
                                  />
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        </TabsContent>
                        <TabsContent value="images">
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {uploadedMedia.images.map(image => (
                              <Card key={image.id}>
                                <CardContent className="p-4">
                                  <div className="relative mb-2">
                                    <Image
                                      src={image.preview}
                                      alt={image.name}
                                      width={180}
                                      height={100}
                                      className="w-full h-32 object-cover rounded"
                                    />
                                    <Button
                                      variant="destructive"
                                      size="icon"
                                      className="absolute top-2 right-2"
                                      onClick={() => handleDelete('images', image.id)}
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </Button>
                                  </div>
                                  <p className="text-sm font-medium mb-2">{image.name}</p>
                                  <Textarea
                                    placeholder="Add a comment"
                                    value={image.comment}
                                    onChange={(e) => handleCommentChange('images', image.id, e.target.value)}
                                  />
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        </TabsContent>
                        <TabsContent value="audio">
                          <div className="space-y-4">
                            {uploadedMedia.audio.map(audio => (
                              <Card key={audio.id}>
                                <CardContent className="p-4 flex items-center space-x-4">
                                  <Button size="icon">
                                    <Play className="w-4 h-4" />
                                  </Button>
                                  <div className="flex-grow">
                                    <p className="font-medium">{audio.name}</p>
                                    <Input
                                      placeholder="Add a comment"
                                      value={audio.comment}
                                      onChange={(e) => handleCommentChange('audio', audio.id, e.target.value)}
                                    />
                                  </div>
                                  <Button
                                    variant="destructive"
                                    size="icon"
                                    onClick={() => handleDelete('audio', audio.id)}
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        </TabsContent>
                      </Tabs>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="reels-settings">
                    <AccordionTrigger>Reels Settings</AccordionTrigger>
                    <AccordionContent>
                    <div className="p-2">
                      <div className="flex justify-between items-center mb-4">
                        <p className="flex-grow">Set number of reels you'd like to have from the Source Media, duration and complexity of each</p>
                        <Button onClick={handleAddReel}>
                          <Plus className="w-4 h-4 mr-2" />
                          Add Reel
                        </Button>
                      </div>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Number</TableHead>
                            <TableHead>Duration (mm:ss)</TableHead>
                            <TableHead>Complexity</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {reelsSettings.map((reel) => (
                            <TableRow key={reel.id}>
                              <TableCell>{reel.number}</TableCell>
                              <TableCell>
                                <Input
                                disabled
                                  type="text"
                                  pattern="[0-5][0-9]:[0-5][0-9]"
                                  placeholder="mm:ss"
                                  defaultValue={reel.duration}
                                  onChange={(e) => handleDurationChange(reel.id, e.target.value)}
                                />
                              </TableCell>
                              <TableCell>
                                <Select 
                                disabled
                                  defaultValue={reel.complexity}
                                  onValueChange={(value) => handleComplexityChange(reel.id, value)}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select complexity" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="Video only">Video only</SelectItem>
                                    <SelectItem value="Video + credits">Video + credits</SelectItem>
                                    <SelectItem value="Video + motion">Video + motion</SelectItem>
                                    <SelectItem value="Animation only">Animation only</SelectItem>
                                  </SelectContent>
                                </Select>
                              </TableCell>
                              <TableCell>
                                <Button variant="destructive" 
                                disabled
                                  size="icon"
                                  onClick={() => handleDeleteReel(reel.id)}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="reels-maker">
                    <AccordionTrigger>Reels Maker</AccordionTrigger>
                    <AccordionContent>
                    <div className="p-2" >
                    <Card>
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-4">
                            <Avatar className="w-16 h-16">
                              <AvatarImage src="/img/editor_ava.jpg" alt="Current Reels Maker" />
                              <AvatarFallback>RM</AvatarFallback>
                            </Avatar>
                            <div className="flex-grow">
                              <h3 className="text-lg font-semibold">John Doe</h3>
                              <p className="text-sm text-muted-foreground">Current Reels Maker</p>
                            </div>
                            <div className="flex space-x-2">
                              <Button variant="default">Profile</Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                        <div className="pt-2" >
                            <Button variant="secondary">Ask for Rematch</Button>
                        </div>
                        </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="task-description">
                    <AccordionTrigger>Task Description</AccordionTrigger>
                    <AccordionContent>
                        <div className="p-2" >
                      <Textarea
                        value={taskDescription}
                        onChange={(e) => setTaskDescription(e.target.value)}
                        placeholder="Enter task description"
                        rows={4}
                      />
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </TabsContent>
            </Tabs>
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Chat</h2>
              <Card>
                <CardContent className="p-4">
                  <ScrollArea className="h-[300px] mb-4">
                    {messages.map((message, index) => (
                      <div key={index} className="mb-2">
                        <span className="font-semibold">{message.sender}: </span>
                        <span>{message.text}</span>
                      </div>
                    ))}
                  </ScrollArea>
                  <form onSubmit={handleSendMessage} className="flex gap-2">
                    <Input
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type your message..."
                      className="flex-grow"
                    />
                    <Button type="submit">Send</Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}