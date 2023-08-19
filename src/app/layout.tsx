import "./globals.css"
import type { Metadata } from "next"
import Navigation from "./components/Navigation"

export const metadata: Metadata = {
  title: "My Leisure",
  description: "Search movies, series and books you interested in",
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="grid grid-cols-12 ">
        <Navigation />
        <main className="col-start-2 col-end-12 row-start-2">
          {props.children}
        </main>
      </body>
    </html>
  )
}
