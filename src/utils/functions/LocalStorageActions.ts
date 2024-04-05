export function hasEntry(storageKey: string, id: number | string) {
  const storageString = localStorage.getItem(storageKey)
  if (!storageString) return false
  const storage: MediaEntry[] | BookEntry[] = JSON.parse(storageString)
  return storage.some((entry) => entry.id === id)
}

export function getEntryList(storageKey: "movie" | "tvshow" | "book") {
  if (!localStorage.getItem(storageKey)) return null
  else
    return JSON.parse(localStorage.getItem(storageKey)!) as
      | MediaEntry[]
      | BookEntry[]
}

export function addEntry(entry: MediaEntry | BookEntry) {
  const storageValue: string | null = localStorage.getItem(entry.catalog)
  if (storageValue && entry.catalog === "book") {
    const storage: BookEntry[] = JSON.parse(storageValue)
    storage.push(entry)
    localStorage.setItem(entry.catalog, JSON.stringify(storage))
  } else if (storageValue && entry.catalog !== "book") {
    const storage: MediaEntry[] = JSON.parse(storageValue)
    storage.push(entry)
    localStorage.setItem(entry.catalog, JSON.stringify(storage))
  } else localStorage.setItem(entry.catalog, JSON.stringify([entry]))
}

export function removeEntry(id: number | string, catalog: string) {
  const storage: MediaEntry[] | BookEntry[] = JSON.parse(
    localStorage.getItem(catalog)!
  )
  const filtered = storage.filter((entry) => entry.id !== id)
  if (!filtered.length) localStorage.removeItem(catalog)
  else localStorage.setItem(catalog, JSON.stringify(filtered))
}
