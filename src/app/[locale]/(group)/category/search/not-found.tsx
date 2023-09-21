import Link from "next/link"

export default function NotFound() {
  return (
    <div className="grid content-start justify-center h-screen bg-background">
      <h1 className="p-4 fluid-2xl text-textPrimary">Not Found</h1>
      <p className="p-4 fluid-base text-textPrimary">This page is not exist!</p>
      <Link
        href="/"
        className="p-2 transition-colors rounded fluid-lg text-textPrimary bg-secondary hover:bg-green-600"
      >
        Return to Home page
      </Link>
    </div>
  )
}
