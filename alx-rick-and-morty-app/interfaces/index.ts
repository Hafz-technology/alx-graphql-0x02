interface InfoProps {
    pages: number
    next: number | null // Use 'null' as next/prev can be null when on the last/first page
    prev: number | null
    count: number
}

// Define the full structure of the 'episodes' query result (excluding the top-level 'data' object)
export interface EpisodesQueryResult {
  info: InfoProps
  results: EpisodeProps[]
}

// Define the structure of a single Episode object
export interface EpisodeProps {
  id: number
  name: string
  air_date: string
  episode: string
}

// Utility type: used for the props of the EpisodeCard component
export type EpisodeCardProps = Pick<EpisodeProps, 'id' | 'name'| 'air_date' | "episode">



