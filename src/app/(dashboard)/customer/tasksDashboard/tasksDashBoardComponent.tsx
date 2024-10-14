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
  { id: 1, name: "Summer Vacation Reel", status: "On Review", version: "V3", approvedVersion: "V2", image: "/img/placeholder.svg" },
  { id: 2, name: "Product Launch Video", status: "In Progress", version: "V2", approvedVersion: "V1", image: "/img/placeholder.svg" },
  { id: 3, name: "Wedding Highlights", status: "In Queue", version: "V1", approvedVersion: null, image: "/img/placeholder.svg" },
  { id: 4, name: "Corporate Event Recap", status: "On Hold", version: "V2", approvedVersion: "V1", image: "/img/placeholder.svg" },
  { id: 5, name: "Travel Vlog Compilation", status: "Done", version: "V4", approvedVersion: "V4", image: "/img/placeholder.svg" },
  { id: 6, name: "Music Festival Memories", status: "Archived", version: "V2", approvedVersion: "V2", image: "/img/placeholder.svg" },
  { id: 7, name: "Fitness Transformation", status: "On Review", version: "V1", approvedVersion: null, image: "/img/placeholder.svg" },
  { id: 8, name: "Cooking Show Pilot", status: "In Progress", version: "V3", approvedVersion: "V2", image: "/img/placeholder.svg" },
  { id: 9, name: "Tech Product Unboxing", status: "In Queue", version: "V1", approvedVersion: null, image: "/img/placeholder.svg" },
  { id: 10, name: "Home Renovation Series", status: "On Hold", version: "V2", approvedVersion: "V1", image: "/img/placeholder.svg" },
  { id: 11, name: "Graduation Ceremony", status: "Done", version: "V1", approvedVersion: "V1", image: "/img/placeholder.svg"},
  { id: 12, name: "Vintage Car Show", status: "Archived", version: "V3", approvedVersion: "V3", image: "/img/placeholder.svg" },
]

const statusOptions = [
  "On Review", 
  "In Progress",
  "In Queue",
  "On Hold",
  "Done",
  "Archived",
]

export default function TaskDashboardComponent() {
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
    <div className="container mx-auto p-4 relative min-h-screen">
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
                  <CardFooter className="bg-muted p-2 flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-semibold">Last version: {task.version}</span>
                      {task.approvedVersion && (
                        <div className="flex items-center text-green-600">
                          <CheckCircle className="w-4 h-4 mr-1" />
                          <span className="text-sm font-semibold">Approved: {task.approvedVersion}</span>
                        </div>
                      )}
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
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