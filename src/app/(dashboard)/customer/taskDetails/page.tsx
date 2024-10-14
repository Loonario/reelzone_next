import CustomerTaskDetailsComponent from './taskDetailsComponent';

enum Complexity {
  "Video Only", "Video + Credits", "Video + Motion", "Animation Only"
}

interface IVersion{
  id: number,
  name: string,
  version: string,
  preview: string,
  videoUrl: string,
}

interface IReel{
  id: number,
  name: string,
  complexity: "Video Only" | "Video + Credits" | "Video + Motion" | "Animation Only",
  versions: IVersion[] 
}
const reelsData: IReel[] = [
  {
    id: 1,
    name: "Summer Vibes",
    complexity: "Video Only",
    versions: [
      { id: 5, name: "Summer Vibes", version: "V5", preview: "/img/placeholder.svg", videoUrl: "/videos/summer-v1.mp4" },
      { id: 4, name: "Summer Vibes", version: "V4", preview: "/img/placeholder.svg", videoUrl: "/videos/summer-v2.mp4" },
      { id: 3, name: "Summer Vibes", version: "V3", preview: "/img/placeholder.svg", videoUrl: "/videos/summer-v2.mp4" },
      { id: 2, name: "Summer Vibes", version: "V2", preview: "/img/placeholder.svg", videoUrl: "/videos/summer-v2.mp4" },
      { id: 1, name: "Summer Vibes", version: "V1", preview: "/img/placeholder.svg", videoUrl: "/videos/summer-v2.mp4" },
    ]
  },
  {
    id: 2,
    name: "Winter Vibes",
    complexity: "Video + Credits",
    versions: [
      { id: 5, name: "Winter Vibes", version: "V5", preview: "/img/placeholder.svg", videoUrl: "/videos/summer-v1.mp4" },
      { id: 4, name: "Winter Vibes", version: "V4", preview: "/img/placeholder.svg", videoUrl: "/videos/summer-v2.mp4" },
      { id: 3, name: "Winter Vibes", version: "V3", preview: "/img/placeholder.svg", videoUrl: "/videos/summer-v2.mp4" },
      { id: 2, name: "Winter Vibes", version: "V2", preview: "/img/placeholder.svg", videoUrl: "/videos/summer-v2.mp4" },
      { id: 1, name: "Winter Vibes", version: "V1", preview: "/img/placeholder.svg", videoUrl: "/videos/summer-v2.mp4" },
    ]
  },
  {
    id: 3,
    name: "Spring Vibes",
    complexity: "Video + Motion",
    versions: [
      { id: 3, name: "Spring Vibes", version: "V3", preview: "/img/placeholder.svg", videoUrl: "/videos/summer-v1.mp4" },
      { id: 2, name: "Spring Vibes", version: "V2", preview: "/img/placeholder.svg", videoUrl: "/videos/summer-v2.mp4" },
      { id: 1, name: "Spring Vibes", version: "V1", preview: "/img/placeholder.svg", videoUrl: "/videos/summer-v2.mp4" },

    ]
  },
  // Add more reels as needed
]

export default function CustomerTaskDetails() {
  return (
    <CustomerTaskDetailsComponent
      taskName="Create Summer Campaign"
      initialStatus="in-queue"
      reels={reelsData}
    />
  )
}