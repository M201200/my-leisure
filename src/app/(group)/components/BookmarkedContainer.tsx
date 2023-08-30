"use client"
import { useState, useLayoutEffect } from "react"
import { getEntryList } from "@/api/LocalStorageActions"
import { removeEntry } from "@/api/LocalStorageActions"
import CardDetails from "./common/CardDetails"
import { BsXLg } from "react-icons/bs"
import CardDetailsContainer from "./CardDetailsContainer"

type Props = {
  storageKey: "movie" | "tvshow"
}

export default function BookmarkedContainer({ storageKey }: Props) {
  const [media, setMedia] = useState<Entry[] | null>(null)
  useLayoutEffect(() => {
    setMedia(getEntryList(storageKey))
  }, [storageKey])
  const amount = media ? media.length : 0
  return media && media.length ? (
    <CardDetailsContainer
      label={storageKey === "movie" ? "Movies:" : "Series:"}
      maxHeight="max-h-125"
      hasCount={amount}
    >
      {media.map((entry) => (
        <CardDetails
          key={entry.id}
          props={entry}
          hasBookmark={false}
          entryDelete={
            <button
              className="p-1 border-2 border-black rounded"
              onClick={() => {
                setMedia((prev) =>
                  prev ? prev.filter((media) => media.id !== entry.id) : null
                )
                removeEntry(entry.id, storageKey)
              }}
            >
              <BsXLg />
            </button>
          }
        />
      ))}
    </CardDetailsContainer>
  ) : (
    <CardDetailsContainer
      label={storageKey === "movie" ? "Movies:" : "Series:"}
    >
      <p>Nothing for now</p>
    </CardDetailsContainer>
  )
}
