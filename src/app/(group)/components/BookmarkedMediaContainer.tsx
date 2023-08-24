"use client"
import { useState, useEffect } from "react"
import { getEntryList } from "@/api/LocalStorageActions"
import { removeEntry } from "@/api/LocalStorageActions"
import CardDetails from "./CardDetails"
import { BsXLg } from "react-icons/bs"

type Props = {
  storageKey: "movie" | "tvshow"
}

export default function BookmarkedMediaContainer({ storageKey }: Props) {
  const [media, setMedia] = useState<Entry[] | null>(null)
  const [listLength, setListLength] = useState(0)
  useEffect(() => {
    setMedia(getEntryList(storageKey))
  }, [storageKey])

  useEffect(() => {
    media ? setListLength(media.length) : setListLength(0)
  }, [media])

  return media && media.length ? (
    <section className="flex w-full gap-2 px-2 py-4 overflow-auto bg-gray-500 scrollbar-hide">
      <div>{listLength}</div>
      {media.map((entry) => (
        <div key={entry.id}>
          <CardDetails props={entry} hasBookmark={false} />
          <button
            onClick={() => {
              setMedia((prev) =>
                prev ? prev.filter((media) => media.id !== entry.id) : null
              )
              removeEntry(entry.id, storageKey)
            }}
          >
            {<BsXLg />}
          </button>
        </div>
      ))}
    </section>
  ) : (
    <section>Nothing for now</section>
  )
}
