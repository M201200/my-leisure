"use client"
import { BsHeart, BsHeartFill } from "react-icons/bs"
import useToggle from "../hooks/useToggle"

type Props = {
  id: number
  catalog: string
}

export default function AddToFav({ id, catalog }: Props) {
  const [isFav, setAction] = useToggle({ key: catalog, value: id.toString() })

  return (
    <button
      onClick={() => {
        if (isFav) {
          return setAction("remove")
        } else {
          return setAction("add")
        }
      }}
    >
      {isFav ? <BsHeartFill className="text-red-600" /> : <BsHeart />}
    </button>
  )
}
