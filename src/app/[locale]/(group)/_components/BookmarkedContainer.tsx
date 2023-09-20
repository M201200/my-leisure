"use client"
import { useState, useEffect } from "react"
import { getEntryList } from "@/api/LocalStorageActions"
import { removeEntry } from "@/api/LocalStorageActions"
import CardMediaDetails from "./common/CardMediaDetails"
import { BsXLg } from "react-icons/bs"
import CardDetailsContainer from "./CardDetailsContainer"
import CardBookDetails from "./common/CardBookDetails"

type Props = {
  storageKey: "movie" | "tvshow" | "book"
  translation: Translation
  locale: Locale
  label: string
}
type Translation = {
  nothing: string
  delete: string
}
export default function BookmarkedContainer({
  storageKey,
  translation,
  locale,
  label,
}: Props) {
  const [media, setMedia] = useState<MediaEntry[] | BookEntry[] | null>(null)
  useEffect(() => {
    setMedia(getEntryList(storageKey))
  }, [storageKey])
  const amount = media ? media.length : 0
  const t = translation
  return media && media.length ? (
    <CardDetailsContainer
      label={label}
      maxHeight="max-h-125"
      hasCount={amount}
      locale={locale}
      labelSize="fluid-xl"
    >
      {media.map((entry) =>
        "genreIds" in entry ? (
          <CardMediaDetails
            key={entry.id}
            props={entry}
            locale={locale}
            button={
              <button
                title={t.delete}
                className="p-1 transition-colors bg-red-600 rounded-md fluid-base h-max hover:bg-red-500 text-slate-200"
                onClick={() => {
                  /* @ts-ignore */
                  setMedia((prev: MediaEntry[] | null) =>
                    prev ? prev.filter((media) => media.id !== entry.id) : null
                  )
                  removeEntry(entry.id, storageKey)
                }}
              >
                <BsXLg />
              </button>
            }
          />
        ) : (
          <CardBookDetails
            key={entry.id}
            props={entry}
            locale={locale}
            button={
              <button
                title={t.delete}
                className="p-1 transition-colors bg-red-600 rounded-md fluid-base h-max hover:bg-red-500 text-slate-200"
                onClick={() => {
                  /* @ts-ignore */
                  setMedia((prev: BookEntry[] | null) =>
                    prev ? prev.filter((media) => media.id !== entry.id) : null
                  )
                  removeEntry(entry.id, storageKey)
                }}
              >
                <BsXLg />
              </button>
            }
          />
        )
      )}
    </CardDetailsContainer>
  ) : (
    <CardDetailsContainer label={label} locale={locale} labelSize="fluid-xl">
      <p className="fluid-lg text-textSecondary">{t.nothing}</p>
    </CardDetailsContainer>
  )
}
