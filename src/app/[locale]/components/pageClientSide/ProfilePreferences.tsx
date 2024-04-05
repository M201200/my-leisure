"use client"
import { usePreferences } from "@/utils/hooks/zustand/usePreferences"

export default function ProfilePreferences({
  tl,
}: {
  tl: {
    Language: string
    Theme: string
    en: string
    ro: string
    ru: string
    light: string
    dark: string
  }
}) {
  const preferences = usePreferences()

  return (
    <>
      <li className="flex gap-1">
        <span className="text-textHoverPrimary">{tl.Language}:</span>{" "}
        <span className="font-semibold">
          {preferences.locale === "en"
            ? tl.en
            : preferences.locale === "ro"
            ? tl.ro
            : tl.ru}
        </span>{" "}
      </li>
      <li className="flex gap-1">
        <span className="text-textHoverPrimary">{tl.Theme}:</span>{" "}
        <span className="font-semibold">
          {preferences.theme === "dark" ? tl.dark : tl.light}
        </span>
      </li>
    </>
  )
}
