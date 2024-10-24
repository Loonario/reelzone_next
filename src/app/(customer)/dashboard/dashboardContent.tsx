"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle, Plus } from "lucide-react"
import Image from "next/image"
import Link from 'next/link';



// Mock data for tasks


const initialTasks = [
  { id: 1, name: "Summer Vacation Reel", status: "On Review", version: "V3", approvedVersion: "V2", image: "/img/placeholder.svg", reels: [
    { name: "Reel 1", lastVersion: "V3", approvedVersion: "V2" },
    { name: "Reel 2", lastVersion: "V2", approvedVersion: "V1" },
  ] },
  { id: 2, name: "Product Launch Video", status: "In Progress", version: "V2", approvedVersion: "V1", image: "/img/placeholder.svg", reels: [
    { name: "Reel 1", lastVersion: "V2", approvedVersion: "V1" },
  ] },
  { id: 3, name: "Wedding Highlights", status: "In Queue", version: "V1", approvedVersion: null, image: "/img/placeholder.svg", reels: [
    { name: "Reel 1", lastVersion: "V1", approvedVersion: null },
    { name: "Reel 2", lastVersion: "V1", approvedVersion: null },
    { name: "Reel 3", lastVersion: "V1", approvedVersion: null },
  ] },
  { id: 4, name: "Corporate Event Recap", status: "On Hold", version: "V2", approvedVersion: "V1", image: "/img/placeholder.svg", reels: [
    { name: "Reel 1", lastVersion: "V2", approvedVersion: "V1" },
  ] },
  { id: 5, name: "Travel Vlog Compilation", status: "Done", version: "V4", approvedVersion: "V4", image: "/img/placeholder.svg", reels: [
    { name: "Reel 1", lastVersion: "V4", approvedVersion: "V4" },
    { name: "Reel 2", lastVersion: "V3", approvedVersion: "V3" },
  ] },
  { id: 6, name: "Music Festival Memories", status: "Archived", version: "V2", approvedVersion: "V2", image: "/img/placeholder.svg", reels: [
    { name: "Reel 1", lastVersion: "V2", approvedVersion: "V2" },
  ] },
  { id: 7, name: "Fitness Transformation", status: "On Review", version: "V1", approvedVersion: null, image: "/img/placeholder.svg", reels: [
    { name: "Reel 1", lastVersion: "V1", approvedVersion: null },
  ] },
  { id: 8, name: "Cooking Show Pilot", status: "In Progress", version: "V3", approvedVersion: "V2", image: "/img/placeholder.svg", reels: [
    { name: "Reel 1", lastVersion: "V3", approvedVersion: "V2" },
    { name: "Reel 2", lastVersion: "V2", approvedVersion: "V1" },
  ] },
  { id: 9, name: "Tech Product Unboxing", status: "In Queue", version: "V1", approvedVersion: null, image: "/img/placeholder.svg", reels: [
    { name: "Reel 1", lastVersion: "V1", approvedVersion: null },
  ] },
  { id: 10, name: "Home Renovation Series", status: "On Hold", version: "V2", approvedVersion: "V1", image: "/img/placeholder.svg", reels: [
    { name: "Reel 1", lastVersion: "V2", approvedVersion: "V1" },
    { name: "Reel 2", lastVersion: "V1", approvedVersion: null },
  ] },
  { id: 11, name: "Graduation Ceremony", status: "Done", version: "V1", approvedVersion: "V1", image: "/img/placeholder.svg", reels: [
    { name: "Reel 1", lastVersion: "V1", approvedVersion: "V1" },
  ]},
  { id: 12, name: "Vintage Car Show", status: "Archived", version: "V3", approvedVersion: "V3", image: "/img/placeholder.svg", reels: [
    { name: "Reel 1", lastVersion: "V3", approvedVersion: "V3" },
    { name: "Reel 2", lastVersion: "V2", approvedVersion: "V2" },
  ] },
]

// const statusOptions = [
//   { value: "on-review", label: "On Review", color: "bg-purple-500" },
//   { value: "done", label: "Done", color: "bg-sky-500" },
//   { value: "in-queue", label: "In Queue", color: "bg-yellow-500" },
//   { value: "on-hold", label: "On Hold", color: "bg-red-500" },
//   { value: "archived", label: "Archived", color: "bg-gray-500" },
// ]

const statusOptions = [
  "On Review", 
  "In Progress",
  "In Queue",
  "On Hold",
  "Done",
  "Archived",
]

export default function DashboardContent() {
  const [activeTab, setActiveTab] = useState("On Review")
  const [tasks, setTasks] = useState(initialTasks)

  const filteredTasks = tasks.filter(task => task.status === activeTab)

  const handleNewTask  = () => {
    // Placeholder function for creating a new task
    console.log("Create new task")
  }

  const handleStatusChange = (taskId: number, newStatus: string) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    )
  }


  return (
    <div className="container mx-auto px-12 py-4 relative min-h-screen max-w-[1440px]">
      <h1 className="text-2xl font-bold mb-6">ReelZone Task Dashboard</h1>
      <Tabs defaultValue="On Review" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 mb-4">
          {statusOptions.map((status) => (
            <TabsTrigger key={status} value={status} className="w-full">
              {status}
            </TabsTrigger>
          ))}
        </TabsList>
        {statusOptions.map((status) => (
          <TabsContent key={status} value={status}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTasks.map((task) => (
                <Card key={task.id} className="overflow-hidden">
                  <CardHeader className="p-0">
                    <Image
                      src={task.image}
                      alt={task.name}
                      width={360}
                      height={200}
                      className="w-full h-48 object-cover"
                    />
                  </CardHeader>
                  <CardContent className="p-4">
                    <CardTitle className="text-lg mb-2">{task.name}</CardTitle>
                    <div className="flex items-center justify-between">
                    {task.status  != "In Progress" ? 
                    (<Select
                      value={task.status}
                      onValueChange={(value) => handleStatusChange(task.id, value)}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                      <SelectItem key={'On Review'} value={'On Review'}>
                      <Badge variant='onReview'>On Review</Badge>
                      </SelectItem>
                      <SelectItem key={'In Queue'} value={'In Queue'}>
                      <Badge variant='inQueue'>In Queue</Badge>
                      </SelectItem>
                      <SelectItem key={'On Hold'} value={'On Hold'}>
                      <Badge variant='onHold'>On Hold</Badge>
                      </SelectItem>
                      <SelectItem key={'Done'} value={'Done'}>
                      <Badge variant='done'>Done</Badge>
                      </SelectItem>
                      <SelectItem key={'Archived'} value={'Archived'}>
                      <Badge variant='archived'>Archived</Badge>
                      </SelectItem>
                        {/* {statusOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            <Badge variant={option.toLowerCase().replace(' ', '')}>
                              {option}
                            </Badge>
                          </SelectItem>
                        ))} */}
                      </SelectContent>
                      </Select>) : (
                        <Badge variant='inProgress'>In Progress</Badge>
                      )
                    }
                    <Link href={"/customer/taskDetails"} >
                    <Button variant="default">Task Details</Button>
                    </Link>
                    </div>
                  {/* {
                    {
                      'On Review': <Badge variant='onReview'>{task.status}</Badge>,
                      'In Progress': <Badge variant='inProgress'>{task.status}</Badge>,
                      'In Queue': <Badge variant='inQueue'>{task.status}</Badge>,
                      'On Hold': <Badge variant='onHold'>{task.status}</Badge>,
                      'Done': <Badge variant='done'>{task.status}</Badge>,
                      'Archived': <Badge variant='archived'>{task.status}</Badge>,
                      }[status]
                  } */}
                  </CardContent>
                  <CardFooter className="bg-muted p-4 h-full items-start">
                  <div className="w-full">
                      <div className="text-sm font-semibold mb-2">Reels in this task:</div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {task.reels.map((reel, index) => (
                          <div key={index} className="flex flex-col items-start">
                            <span className="font-medium">{reel.name}</span>
                            <span className="text-sm">Last version: {reel.lastVersion}</span>
                            {reel.approvedVersion && (
                              <div className="flex items-center text-green-600 text-sm">
                                <CheckCircle className="w-3 h-3 mr-1" />
                                <span>Approved: {reel.approvedVersion}</span>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
      <Link href="/newTask">
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