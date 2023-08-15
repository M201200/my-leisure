import Link from "next/link"

export default function Navigation() {
  return (
    <nav>
      <h1>
        <Link href={"/"}>My Leisure</Link>
      </h1>
      <ul>
        <li>
          <Link href={"#"}>Movies</Link>
        </li>
        <li>
          <Link href={"#"}>Series</Link>
        </li>
        <li>
          <Link href={"#"}>TV Shows</Link>
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
