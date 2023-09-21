"use client"
import { Sofia_Sans } from "next/font/google"

const sofia_Sans = Sofia_Sans({
  subsets: ["latin", "latin-ext"],
})

export default function GlobalError({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  return (
    <html>
      <body
        className={`grid bg-background justify-center content-center h-screen w-screen ${sofia_Sans.className}`}
      >
        <h1 className="p-4 fluid-2xl text-textPrimary">
          Something went wrong!
        </h1>
        <button onClick={() => reset()} className="p-2 fluid-lg bg-secondary">
          Try again
        </button>
      </body>
    </html>
  )
}
