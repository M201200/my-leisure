"use client"
import { BsBookmark, BsBookmarkCheckFill } from "react-icons/bs"
import useInitialAndToggle from "../hooks/useInitialAndToggle"

export default function Bookmark({ props }: { props: MediaEntry | BookEntry }) {
  const [isListed, setAction] = useInitialAndToggle({ details: props })
  return (
    <button
      className="p-1 border-2 border-black rounded"
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
