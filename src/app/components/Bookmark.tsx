"use client"
import { BsBookmark, BsBookmarkCheckFill } from "react-icons/bs"
import useInitialAndToggle from "./hooks/useInitialAndToggle"

export default function Bookmark({
  props,
  className,
}: {
  props: Entry
  className?: string
}) {
  const [isListed, setAction] = useInitialAndToggle({ details: props })
  return (
    <button
      className={className}
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
