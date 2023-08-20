"use client"
import { BsBookmark, BsBookmarkCheckFill } from "react-icons/bs"
import useToggle from "../hooks/useToggle"

type Props = {
  id: number
  catalog: string
}

export default function AddToList({ id, catalog }: Props) {
  const [isListed, setAction] = useToggle({
    key: catalog,
    value: id.toString(),
  })

  return (
    <button
      onClick={() => {
        if (isListed) {
          return setAction("remove")
        } else {
          return setAction("add")
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
