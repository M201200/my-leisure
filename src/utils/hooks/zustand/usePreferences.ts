import { create } from "zustand"

type PreferencesState = {
  locale: Locale
  theme: Theme
  setLocale: (locale: Locale) => void
  setTheme: (theme: Theme) => void
}

export const usePreferences = create<PreferencesState>()((set) => ({
  locale: "en",
  theme: "light",
  setLocale: (locale) => set(() => ({ locale: locale })),
  setTheme: (theme) => set(() => ({ theme: theme })),
}))
