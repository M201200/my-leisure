export function hasEntry(storageKey: string, id: number) {
  const storageString = localStorage.getItem(storageKey)
  if (!storageString) return false
  const storage: Entry[] = JSON.parse(storageString)
  return storage.some((entry) => entry.id === id)
}

export function getEntryList(storageKey: "movie" | "tvshow") {
  if (!localStorage.getItem(storageKey)) return null
  else return JSON.parse(localStorage.getItem(storageKey)!) as Entry[]
}

export function addEntry(entry: Entry) {
  const storageValue: string | null = localStorage.getItem(entry.catalog)
  if (storageValue) {
    const storage: Entry[] = JSON.parse(storageValue)
    storage.push(entry)
    localStorage.setItem(entry.catalog, JSON.stringify(storage))
  } else localStorage.setItem(entry.catalog, JSON.stringify([entry]))
}

export function removeEntry(id: number, catalog: string) {
  const storage: Entry[] = JSON.parse(localStorage.getItem(catalog)!)
  const filtered = storage.filter((entry) => entry.id !== id)
  if (!filtered.length) localStorage.removeItem(catalog)
  else localStorage.setItem(catalog, JSON.stringify(filtered))
}
