"use client"
import { useState, useLayoutEffect } from "react"
import { getEntryList } from "@/api/LocalStorageActions"
import { removeEntry } from "@/api/LocalStorageActions"
import CardDetails from "./common/CardDetails"
import { BsXLg } from "react-icons/bs"
import CardDetailsContainer from "./CardDetailsContainer"

type Props = {
  storageKey: "movie" | "tvshow"
  translation: string[]
}

export default function BookmarkedContainer({
  storageKey,
  translation,
}: Props) {
  const [media, setMedia] = useState<Entry[] | null>(null)
  useLayoutEffect(() => {
    setMedia(getEntryList(storageKey))
  }, [storageKey])
  const amount = media ? media.length : 0
  return media && media.length ? (
    <CardDetailsContainer
      label={storageKey === "movie" ? translation[0] : translation[1]}
      maxHeight="max-h-125"
      hasCount={amount}
    >
      {media.map((entry) => (
        <CardDetails
          key={entry.id}
          props={entry}
          button={
            <button
              title="Delete bookmark"
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
      label={storageKey === "movie" ? translation[0] : translation[1]}
    >
      <p>{translation[2]}</p>
    </CardDetailsContainer>
  )
}
