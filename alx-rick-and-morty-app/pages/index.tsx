// alx-rick-and-morty-app/pages/index.tsx
import { useQuery } from "@apollo/client"
import { GET_EPISODES } from "@/graphql/queries"
// We import the specific types needed for our component
import { EpisodeProps, EpisodesQueryResult } from "@/interfaces" 
import EpisodeCard from "@/components/common/EpisodeCard"
import { useEffect, useState } from "react"
import React from "react" // Required for React.FC

const Home: React.FC = () => {

  const [page, setPage] = useState<number>(1)

  // Use the useQuery hook to execute the GET_EPISODES query
  const { loading, error, data, refetch } = useQuery<{episodes: EpisodesQueryResult}>(GET_EPISODES, {
    // Pass the current 'page' state as a variable to the query
    variables: {
      page: page
    }
  })
  // 

  // useEffect is used to automatically refetch data whenever the 'page' state changes
  useEffect(() => {
    refetch() 
  }, [page, refetch])

  if (loading) return <h1 className="text-center p-10 text-2xl">Loading...</h1>
  // Display a friendly error message
  if (error) return <h1 className="text-center p-10 text-2xl text-red-600">Error: Could not fetch data</h1>

  // Destructure data safely, ensuring data?.episodes is not null
  const results: EpisodeProps[] = data?.episodes.results || []
  const info = data?.episodes.info

  // The main component render with Tailwind CSS styling
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#A3D5E0] to-[#F4F4F4] text-gray-800">
      {/* Header */}
      <header className="bg-[#4CA1AF] text-white py-6 text-center shadow-md">
        <h1 className="text-4xl font-bold tracking-wide">Rick and Morty Episodes (Page {page} of {info?.pages})</h1>
        <p className="mt-2 text-lg italic">Explore the multiverse of adventures!</p>
      </header>

      {/* Main Content */}
      <main className="flex-grow p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {results.map((episode: EpisodeProps, index: number) => (
            <EpisodeCard
              id={episode.id}
              name={episode.name}
              air_date={episode.air_date}
              episode={episode.episode}
              key={index}
            />
          ))}
        </div>

        {/* Pagination Buttons */}
        <div className="flex justify-center gap-10 mt-10">
          <button 
            onClick={() => setPage(prev => prev - 1)}
            disabled={!info?.prev} // Disable if 'prev' is null (first page)
            className="bg-[#45B69C] disabled:bg-gray-400 text-white font-semibold py-2 px-6 rounded-lg shadow-lg hover:bg-[#3D9B80] transition duration-200 transform hover:scale-105"
          >
            Previous
          </button>
          <button 
            onClick={() => setPage(prev => prev + 1)}
            disabled={!info?.next} // Disable if 'next' is null (last page)
            className="bg-[#45B69C] disabled:bg-gray-400 text-white font-semibold py-2 px-6 rounded-lg shadow-lg hover:bg-[#3D9B80] transition duration-200 transform hover:scale-105"
          >
            Next
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#4CA1AF] text-white py-4 text-center shadow-md">
        <p>&copy; 2024 Rick and Morty Fan Page</p>
      </footer>
    </div>
  )
}

export default Home


