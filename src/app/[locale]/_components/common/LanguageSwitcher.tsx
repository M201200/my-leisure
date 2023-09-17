"use client"
import { dictionaryLanguageSwitcher } from "../../../../../messages/dictionary/clientSide"
import { usePathname, useRouter } from "next-intl/client"
import { useSearchParams } from "next/navigation"

export default function LanguageSwitcher({ locale }: { locale: Locale }) {
  const t = dictionaryLanguageSwitcher(locale)
  const currentPath = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()
  const url = `${currentPath}?${searchParams}`
  return (
    <div>
      <select
        defaultValue={locale}
        onChange={(e) => {
          router.replace(url, { locale: e.target.value })
        }}
      >
        <option value={"en"}>{t.Eng}</option>
        <option value={"ro"}>{t.Roman}</option>
        <option value={"ru"}>{t.Rus}</option>
      </select>
    </div>
  )
}
