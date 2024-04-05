"use client"
import { BsBookmark, BsBookmarkCheckFill } from "react-icons/bs"
import useInitialAndToggle from "../hooks/useInitialAndToggle"
import { usePathname } from "next/navigation"

export default function Bookmark({ props }: { props: MediaEntry | BookEntry }) {
  const [isListed, setAction] = useInitialAndToggle({ details: props })
  const locale = usePathname().slice(1, 3)
  const title =
    locale === "ru"
      ? "Добавить в закладки"
      : locale === "ro"
      ? "Adăugați la marcaje"
      : "Add to bookmarks"
  return (
    <button
      title={title}
      className="p-1 transition-colors text-textPrimary fluid-base hover:text-green-500"
      onClick={() => {
        if (isListed) {
          setAction("remove")
        } else {
          setAction("add")
        }
      }}
    >
      {isListed ? (
        <BsBookmarkCheckFill className="text-green-600" />
      ) : (
        <BsBookmark />
      )}
    </button>
  )
}
