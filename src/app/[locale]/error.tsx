"use client"
import { useEffect } from "react"

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
    <div className="grid content-start justify-center h-screen bg-background">
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
