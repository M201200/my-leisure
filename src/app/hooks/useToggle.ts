import { useEffect, useState } from "react"

type Props = {
  key: string
  value: string
  add?: string
  remove?: string
  initial?: string
}

export default function useToggle({
  key,
  value,
  add = "add",
  remove = "remove",
  initial = "",
}: Props) {
  const [isListed, setState] = useState(false)
  const [action, setAction] = useState(initial)
  useEffect(() => {
    const storage = JSON.parse(localStorage.getItem(key) || "[]") as string[]
    if (storage.includes(value)) setState(true)
    if (action === remove) {
      setState(false)
      localStorage.setItem(
        key,
        JSON.stringify(storage.filter((entry) => entry !== value).sort())
      )
    }
    if (action === add) {
      setState(true)
      storage.push(value)
      localStorage.setItem(key, JSON.stringify(storage.sort()))
    }
  }, [key, value, add, remove, action])

  return [isListed, setAction] as const
}
