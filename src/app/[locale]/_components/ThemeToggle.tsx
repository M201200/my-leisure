"use client"
import { useMediaQuery } from "./hooks/useMediaQuery"
import { useEffect, useState } from "react"
import { dictionaryThemeToggle } from "../../../../messages/dictionary/clientSide"

type Theme = "dark" | "light"

export default function ThemeToggle({ locale }: { locale: Locale }) {
  const isDarkMode = useMediaQuery("(prefers-color-scheme:dark)")
  const [theme, setTheme] = useState<Theme | null>()
  const t = dictionaryThemeToggle(locale)

  useEffect(() => {
    const storage = localStorage.getItem("theme") as Theme | null
    setTheme(storage ? storage : isDarkMode ? "dark" : "light")
    document.body.className = theme || "dark"
  }, [theme, isDarkMode])

  return (
    <select
      title={t.Theme}
      className="w-full cursor-pointer bg-primary"
      name="theme select"
      value={theme || "dark"}
      onChange={(e) => {
        setTheme(e.target.value as Theme)

        document.body.className = e.target.value
        localStorage.setItem("theme", e.target.value)
      }}
    >
      <option value="light">{t.Light}</option>
      <option value="dark">{t.Dark}</option>
    </select>
  )
}
