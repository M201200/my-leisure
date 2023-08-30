import Link from "next/link"
import SearchBar from "./common/SearchBar"

export default function Navigation() {
  return (
    <nav className="flex justify-between col-start-2 col-end-12 row-start-1 row-end-2 gap-4 p-8">
      <span>
        <Link href={"/"}>My Leisure</Link>
      </span>
      <SearchBar />
      <ul className="flex gap-4">
        <li>
          <Link
            href={
              '/category/movies/"page":1,"minYear":1900,"maxYear":2023,"minScore":0,"maxScore":10,"sort_by":"popularity","sort_order":"desc","with_genres":[],"without_genres":[]'
            }
          >
            Movies
          </Link>
        </li>
        <li>
          <Link
            href={
              '/category/tvseries/"page":1,"minYear":1900,"maxYear":2023,"minScore":0,"maxScore":10,"sort_by":"popularity","sort_order":"desc","with_genres":[],"without_genres":[]'
            }
          >
            TV Shows
          </Link>
        </li>
        <li>
          <Link href={"#"}>Books</Link>
        </li>
        <li>
          <Link href={"/profile/Guest"}>Guest</Link>
        </li>
      </ul>
    </nav>
  )
}
