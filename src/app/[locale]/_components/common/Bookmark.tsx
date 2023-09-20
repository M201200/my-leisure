"use client"
import { BsBookmark, BsBookmarkCheckFill } from "react-icons/bs"
import useInitialAndToggle from "../hooks/useInitialAndToggle"

export default function Bookmark({ props }: { props: MediaEntry | BookEntry }) {
  const [isListed, setAction] = useInitialAndToggle({ details: props })
  return (
    <button
      title="Add to bookmarks"
      className="p-1 transition-colors fluid-base hover:text-green-500"
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
