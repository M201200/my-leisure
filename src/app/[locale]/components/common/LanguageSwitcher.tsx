"use client"
import { dictionaryLanguageSwitcher } from "@/dictionary/clientSide"
import { usePathname, useRouter } from "next-intl/client"

export default function LanguageSwitcher({ locale }: { locale: Locale }) {
  const t = dictionaryLanguageSwitcher(locale)
  const currentPath = usePathname()
  const router = useRouter()
  return (
    <div>
      <select
        defaultValue={locale}
        onChange={(e) => {
          router.replace(currentPath, { locale: e.target.value })
        }}
      >
        <option value={"en"}>{t.Eng}</option>
        <option value={"ro"}>{t.Roman}</option>
        <option value={"ru"}>{t.Rus}</option>
      </select>
    </div>
  )
}
