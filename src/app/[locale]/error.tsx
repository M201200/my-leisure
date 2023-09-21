"use client"
import { useEffect } from "react"
import { Sofia_Sans } from "next/font/google"

const sofia_Sans = Sofia_Sans({
  subsets: ["latin", "latin-ext"],
})

export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div
      className={`grid bg-background justify-center content-start h-screen ${sofia_Sans.className}`}
    >
      <h1 className="p-4 fluid-2xl text-textPrimary">Something went wrong!</h1>
      <button
        onClick={() => reset()}
        className="p-2 fluid-lg text-textPrimary bg-secondary"
      >
        Try again
      </button>
    </div>
  )
}
