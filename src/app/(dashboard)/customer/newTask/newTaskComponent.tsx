"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Play, Plus, Trash2, Upload, X } from "lucide-react"
import Image from "next/image"

// Mock data for favorite reels
const favoriteReels = [
  { id: 1, name: "Summer Vibes", image: "/img/placeholder.svg" },
  { id: 2, name: "Urban Explorer", image: "/img/placeholder.svg" },
  { id: 3, name: "Nature's Beauty", image: "/img/placeholder.svg" },
  { id: 4, name: "Tech Showcase", image: "/img/placeholder.svg" },
  { id: 5, name: "Food Delights", image: "/img/placeholder.svg" },
  { id: 6, name: "Travel Adventures", image: "/img/placeholder.svg" },
]

// Mock data for uploaded media
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

// Mock data for reels settings
const mockReelsSettings = [
  { id: 1, number: "Reel 1", duration: "00:30", complexity: "Video only" },
  { id: 2, number: "Reel 2", duration: "00:45", complexity: "Video + credits" },
  { id: 3, number: "Reel 3", duration: "01:00", complexity: "Video + motion" },
]

// Mock data for editors
const mockEditors = [
  { id: 1, name: "Alice Johnson", avatar: "/img/editor_ava.jpg" },
  { id: 2, name: "Bob Smith", avatar: "/img/editor_ava.jpg" },
  { id: 3, name: "Charlie Brown", avatar: "/img/editor_ava.jpg" },
  { id: 4, name: "Diana Martinez", avatar: "/img/editor_ava.jpg" },
  { id: 5, name: "Ethan Lee", avatar: "/img/editor_ava.jpg" },
]

const complexityCredits = {
  "Video only": 5,
  "Video + credits": 7,
  "Video + motion": 25,
  "Animation only": 50,
}

export default function NewTask() {
  const [taskName, setTaskName] = useState("")
  const [taskDescription, setTaskDescription] = useState("")
  const [selectedReferences, setSelectedReferences] = useState<number[]>([])
  const [uploadedMedia, setUploadedMedia] = useState(mockUploadedMedia)
  const [reelsSettings, setReelsSettings] = useState(mockReelsSettings)
  const [editorSelection, setEditorSelection] = useState("worked-recently")
  const [selectedEditors, setSelectedEditors] = useState<typeof mockEditors>([])
  const [availableEditors, setAvailableEditors] = useState(mockEditors)
  const [searchTerm, setSearchTerm] = useState("")
  const [totalCredits, setTotalCredits] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const credits = reelsSettings.reduce((total, reel) => {
      const [minutes, seconds] = reel.duration.split(':').map(Number);
      const durationInSeconds = minutes * 60 + seconds;
      const durationFactor = Math.ceil(durationInSeconds / 30);
      const complexityValue = complexityCredits[reel.complexity as keyof typeof complexityCredits];
      return total + (durationFactor * complexityValue);
    }, 0);
    setTotalCredits(credits);
  }, [reelsSettings])

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

  const handleEditorSelection = (editor: typeof mockEditors[0]) => {
    if (!selectedEditors.some(e => e.id === editor.id)) {
      setSelectedEditors(prev => [...prev, editor])
      setAvailableEditors(prev => prev.filter(e => e.id !== editor.id))
    }
  }

  const handleRemoveEditor = (id: number) => {
    const removedEditor = selectedEditors.find(editor => editor.id === id)
    if (removedEditor) {
      setSelectedEditors(prev => prev.filter(editor => editor.id !== id))
      setAvailableEditors(prev => [...prev, removedEditor])
    }
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

  const filteredEditors = availableEditors.filter(editor =>
    editor.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
  <div className="flex justify-center items-center min-h-screen bg-background">
    <div className="container max-w-[1440px] mx-auto px-12 py-4">
      <h1 className="text-2xl font-bold mb-6">Create New Task</h1>

      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-semibold mb-4">Task Details</h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="task-name">Task Name</Label>
              <Input
                id="task-name"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                placeholder="Enter task name"
              />
            </div>
            <div>
              <Label htmlFor="task-description">Task Description</Label>
              <Textarea
                id="task-description"
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
                placeholder="Enter task description"
                rows={4}
              />
            </div>
          </div>
        </section>

        <section>
          <div className="flex justify-between mb-4">
            <h2 className="text-xl font-semibold">References</h2>
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
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Source Media</h2>
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
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Reels Settings</h2>
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
                      type="text"
                      pattern="[0-5][0-9]:[0-5][0-9]"
                      placeholder="mm:ss"
                      defaultValue={reel.duration}
                      onChange={(e) => handleDurationChange(reel.id, e.target.value)}
                    />
                  </TableCell>
                  <TableCell>
                    <Select 
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
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Editor</h2>
          <div className="space-y-4">
            <Select value={editorSelection} onValueChange={setEditorSelection}>
              <SelectTrigger>
                <SelectValue placeholder="Select editor option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="worked-recently">Worked Recently</SelectItem>
                <SelectItem value="reference-author">Reference Author</SelectItem>
                <SelectItem value="search-by-name">Search by Name</SelectItem>
                <SelectItem value="automatic-match">Automatic Match</SelectItem>
              </SelectContent>
            </Select>

            {editorSelection === "search-by-name" && (
              <Input
                type="text"
                placeholder="Search editors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            )}

            {editorSelection !== "automatic-match" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {(editorSelection === "search-by-name" ? filteredEditors : availableEditors).map(editor => (
                  <Card key={editor.id} className="flex overflow-hidden items-center cursor-pointer hover:shadow-lg" onClick={() => handleEditorSelection(editor)}>
                    <CardContent className="flex items-center overflow-hidden p-0">
                      <div className="flex flex-row overflow-hidden min-w-20 min-h-20 max-w-20 max-h-20">
                      <Avatar>
                      <AvatarImage src={editor.avatar}/>
                      <AvatarFallback>{editor.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      </div>
                      {/* <Image
                        src={editor.avatar}
                        alt={editor.name}
                        width={40}
                        height={40}
                        className="rounded-full mr-4"
                      /> */}
                      <span className="ml-4">{editor.name}</span>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {editorSelection === "automatic-match" ? (
              <p>You will be matched automatically with the reels maker who has a free slot to begin creation immediately.</p>
            ) : (
              <div className="space-y-2">
                <h3 className="font-semibold">Preferable Reels Makers:</h3>
                {selectedEditors.map(editor => (
                  <div key={editor.id} className="flex items-center justify-between bg-muted p-2 rounded">
                    <div className="flex items-center">
                    <div className="flex flex-row overflow-hidden min-w-20 min-h-20 max-w-20 max-h-20 rounded">
                      <Avatar>
                      <AvatarImage src={editor.avatar}/>
                      <AvatarFallback>{editor.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      </div>
                      <span className= "ml-4">{editor.name}</span>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => handleRemoveEditor(editor.id)}>
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between bg-muted p-4 rounded">
            <div className="flex items-center space-x-4">
              <span className="font-semibold">Credits required:</span>
              <span className="text-2xl font-bold">{totalCredits}</span>
            </div>
            <Button>Buy Credits</Button>
          </div>
        </section>

        <Button className="w-full">Create Task</Button>
      </div>
    </div>
  </div>
  )
}