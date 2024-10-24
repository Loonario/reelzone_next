"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from 'next/link';
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { CheckCircle2, Download, Play, Plus, Trash2, Upload, X, Paperclip, File, Image as ImageIcon, MoreVertical, Edit} from "lucide-react"
import Image from "next/image"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AvatarCust, AvatarFallbackCust, AvatarImageCust } from "@/components/ui/avatar-customized"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

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

  interface Message {
    id: string;
    sender: string;
    text: string;
    files?: AttachedFile[];
    timestamp: Date;
    edited?: Date;
    isRead: boolean;
    isDeleted: boolean;
  }
  interface AttachedFile extends File {
    preview?: string;
  }

  // Mock data for chat messages
const mockMessages: Message[] = [
  {
    id: '1',
    sender: 'You',
    text: 'Hello! I have a question about the project.',
    timestamp: new Date('2023-06-10T10:00:00'),
    isRead: true,
    isDeleted: false,
  },
  {
    id: '2',
    sender: 'John',
    text: 'Sure, what would you like to know?',
    timestamp: new Date('2023-06-10T10:05:00'),
    isRead: true,
    isDeleted: false,
  },
  {
    id: '3',
    sender: 'You',
    text: 'I was wondering about the deadline for the first milestone.',
    timestamp: new Date('2023-06-10T10:10:00'),
    isRead: true,
    isDeleted: false,
  },
  {
    id: '4',
    sender: 'John',
    text: "The first milestone is due next Friday. Do you think you'll be able to meet that deadline?",
    timestamp: new Date('2023-06-10T10:15:00'),
    isRead: true,
    isDeleted: false,
  },
  {
    id: '5',
    sender: 'You',
    text: 'Yes, I think that should be fine. Thanks for the information!',
    timestamp: new Date('2023-06-10T10:20:00'),
    isRead: false,
    isDeleted: false,
  },
];

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
  const [messages, setMessages] = useState<Message[]>(mockMessages)
  const [newMessage, setNewMessage] = useState("")
  const [attachedFiles, setAttachedFiles] = useState<AttachedFile[]>([])
  const [editingMessageId, setEditingMessageId] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

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

  const handleNewTask  = () => {
    // Placeholder function for creating a new task
    console.log("Create new task")
  }

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
    if (newMessage.trim() || attachedFiles.length > 0) {
      const messageObj: Message = {
        id: Date.now().toString(),
        sender: "You",
        text: newMessage.trim(),
        files: attachedFiles.length > 0 ? attachedFiles : undefined,
        timestamp: new Date(),
        isRead: false,
        isDeleted: false,
      }
      setMessages([...messages, messageObj])
      setNewMessage("")
      setAttachedFiles([])
      //Here logic to send to the back end
    }
  }

  const handleFileAttach = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const newFiles = Array.from(files).map(file => {
        const attachedFile = file as AttachedFile;
        if (file.type.startsWith('image/')) {
          attachedFile.preview = URL.createObjectURL(file);
        }
        return attachedFile;
      });
      setAttachedFiles(prev => [...prev, ...newFiles])
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }

  const handleAttachClick = () => {
    fileInputRef.current?.click()
  }

  const handleRemoveFile = (fileToRemove: File) => {
    setAttachedFiles(prev => prev.filter(file => file !== fileToRemove))
  }

  const handleDownloadFile = (file: File) => {
    const url = window.URL.createObjectURL(new Blob([file]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', file.name)
    document.body.appendChild(link)
    link.click()
    link.parentNode?.removeChild(link)
  }

  const handleDeleteMessageFile = (messageId: string, fileIndex: number) => {
    setMessages(prevMessages => prevMessages.map(message => 
      message.id === messageId && message.files
        ? { ...message, files: message.files.filter((_, index) => index !== fileIndex) }
        : message
    ))
  }

  const handleEditMessage = (messageId: string) => {
    const messageToEdit = messages.find(m => m.id === messageId)
    if (messageToEdit) {
      setNewMessage(messageToEdit.text)
      setAttachedFiles(messageToEdit.files || [])
      setEditingMessageId(messageId)
    }
  }

  const handleUpdateMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingMessageId) {
      setMessages(prevMessages => prevMessages.map(message =>
        message.id === editingMessageId
          ? { ...message, text: newMessage, files: attachedFiles, edited: new Date() }
          : message
      ))
      setNewMessage("")
      setAttachedFiles([])
      setEditingMessageId(null)
    }
  }

  const handleDeleteMessage = (messageId: string) => {
    setMessages(prevMessages => prevMessages.filter(message => 
      message.id !== messageId || (message.isRead && (message.isDeleted = true, message.text = "Message was deleted", message.files = undefined, true))
    ))
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
    const files = event.target.files
    if (files) {
      Array.from(files).forEach(file => {
        const fileType = file.type.split('/')[0]
        const newMedia = {
          id: Date.now(),
          name: file.name,
          preview: URL.createObjectURL(file),
          comment: ''
        }
        // setUploadedMedia(prev => ({
        //   ...prev,
        //   [fileType === 'audio' ? 'audio' : `${fileType}s`]: [
        //     ...prev[fileType === 'audio' ? 'audio' : `${fileType}s`],
        //     newMedia
        //   ]
        // }))
      })
    }
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

  useEffect(() => {
    return () => {
      attachedFiles.forEach(file => {
        if (file.preview) {
          URL.revokeObjectURL(file.preview)
        }
      })
    }
  }, [attachedFiles])

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

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
                        <p className="flex-grow">{"Set number of reels you'd like to have from the Source Media, duration and complexity of each"}</p>
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
                            <AvatarCust className="w-16 h-16 rounded-sm">
                              <AvatarImageCust src="/img/editor_ava.jpg" alt="Current Reels Maker" />
                              <AvatarFallbackCust>RM</AvatarFallbackCust>
                            </AvatarCust>
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
               <ScrollArea className="h-[300px] mb-4" ref={scrollAreaRef}>
                    {messages.map((message, messageIndex) => (
                      <div key={message.id} className="mb-2">
                        <div className="flex justify-between items-start">
                          <div className={message.isDeleted ? "text-muted-foreground opacity-50" : ""}>
                            <span className="font-semibold">{message.sender}: </span>
                            <span>{message.text}</span>
                          </div>
                          {message.sender === "You" && !message.isDeleted && (
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-40">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="w-full justify-start"
                                  onClick={() => handleEditMessage(message.id)}
                                >
                                  <Edit className="mr-2 h-4 w-4" />
                                  Edit
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="w-full justify-start"
                                  onClick={() => handleDeleteMessage(message.id)}
                                >
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete
                                </Button>
                              </PopoverContent>
                            </Popover>
                          )}
                        </div>
                        {!message.isDeleted && message.files && message.files.length > 0 && (
                          <div className="mt-1 flex flex-wrap gap-2">
                            {message.files.map((file, fileIndex) => (
                              <Popover key={fileIndex}>
                                <PopoverTrigger asChild>
                                  <div className="relative cursor-pointer">
                                    {file.type.startsWith('image/') && file.preview ? (
                                      <Image
                                        src={file.preview}
                                        alt={file.name}
                                        width={100}
                                        height={100}
                                        className="rounded-md object-cover"
                                      />
                                    ) : (
                                      <div className="w-[100px] h-[100px] flex items-center justify-center bg-muted rounded-md">
                                        <File className="w-8 h-8" />
                                      </div>
                                    )}
                                    <span className="absolute bottom-1 left-1 right-1 text-xs text-white bg-black bg-opacity-50 rounded px-1 truncate">
                                      {file.name}
                                    </span>
                                  </div>
                                </PopoverTrigger>
                                <PopoverContent className="w-40">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="w-full justify-start"
                                    onClick={() => handleDownloadFile(file)}
                                  >
                                    <Download className="mr-2 h-4 w-4" />
                                    Download
                                  </Button>
                                  {message.sender === "You" && (
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="w-full justify-start"
                                      onClick={() => handleDeleteMessageFile(message.id, fileIndex)}
                                    >
                                      <Trash2 className="mr-2 h-4 w-4" />
                                      Delete
                                    </Button>
                                  )}
                                </PopoverContent>
                              </Popover>
                            ))}
                          </div>
                        )}
                        {message.edited && (
                          <div className="text-xs text-muted-foreground text-right mt-1">
                            Edited {message.edited.toLocaleString()}
                          </div>
                        )}
                      </div>
                    ))}
                  </ScrollArea>
                  <form onSubmit={editingMessageId ? handleUpdateMessage : handleSendMessage} className="space-y-2">
                    <div className="flex gap-2">
                      <Input
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type your message..."
                        className="flex-grow"
                      />
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileAttach}
                        className="hidden"
                        multiple
                      />
                      <Button type="button" variant="outline" onClick={handleAttachClick}>
                        <Paperclip className="w-4  h-4" />
                      </Button>
                      <Button type="submit">{editingMessageId ? 'Update' : 'Send'}</Button>
                    </div>
                    {attachedFiles.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {attachedFiles.map((file, index) => (
                          <div key={index} className="relative group">
                            {file.type.startsWith('image/') && file.preview ? (
                              <Image
                                src={file.preview}
                                alt={file.name}
                                width={100}
                                height={100}
                                className="rounded-md object-cover"
                              />
                            ) : (
                              <div className="w-[100px] h-[100px] flex items-center justify-center bg-muted rounded-md">
                                <File className="w-8 h-8" />
                              </div>
                            )}
                            <Button
                              variant="destructive"
                              size="icon"
                              className="absolute top-1 right-1 h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={() => handleRemoveFile(file)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                            <span className="absolute bottom-1 left-1 right-1 text-xs text-white bg-black bg-opacity-50 rounded px-1 truncate">
                              {file.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </form>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
      <Link href="/customer/newTask">
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