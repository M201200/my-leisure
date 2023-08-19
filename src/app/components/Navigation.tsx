import Link from "next/link"
import SearchBar from "./SearchBar"

export default function Navigation() {
  return (
    <nav className="flex justify-between col-start-2 col-end-12 row-start-1 row-end-2 gap-4 p-8">
      <h1>
        <Link href={"/"}>My Leisure</Link>
      </h1>
      <SearchBar />
      <ul className="flex gap-4">
        <li>
          <Link href={"/movies/1"}>Movies</Link>
        </li>
        <li>
          <Link href={"/tvshows/1"}>TV Shows</Link>
        </li>
        <li>
          <Link href={"#"}>Books</Link>
        </li>
        <li>
          <Link href={"#"}>Login</Link>
        </li>
      </ul>
    </nav>
  )
}
