import { auth } from "@/app/lib/auth"

import DeleteProfileButton from "../components/common/DeleteProfileButton"
import ProfilePreferences from "../components/pageClientSide/ProfilePreferences"
import { getTranslations, unstable_setRequestLocale } from "next-intl/server"

type ProfilePageParams = {
  params: {
    locale: Locale
  }
}

export default async function ProfilePage({ params }: ProfilePageParams) {
  unstable_setRequestLocale(params.locale)
  const session = await auth()

  const tlAsync = await getTranslations("Profile")

  const profilePreferencesTl = {
    Language: tlAsync("Language"),
    Theme: tlAsync("Theme"),
    en: tlAsync("En"),
    ro: tlAsync("Ro"),
    ru: tlAsync("Ru"),
    light: tlAsync("Light"),
    dark: tlAsync("Dark"),
  }

  const deleteButtonTl = {
    Delete: tlAsync("Delete"),
    Cancel: tlAsync("Cancel"),
    DeleteProfile: tlAsync("DeleteProfile"),
    DeleteDisclaimer: tlAsync("DeleteDisclaimer"),
  }

  return (
    <main className="text-textPrimary">
      <h1 className="p-4 font-bold fluid-2xl">{tlAsync("Profile")}</h1>
      <ul className="grid gap-2 p-4 px-6 fluid-lg">
        {session ? (
          <>
            <li className="flex flex-wrap gap-1">
              <span className="text-textHoverPrimary">{tlAsync("Name")}:</span>
              <span className="font-semibold">{session.user?.name}</span>
            </li>
            <li className="flex flex-wrap gap-1">
              <span className="text-textHoverPrimary">{tlAsync("Email")}:</span>{" "}
              <span className="font-semibold">{session.user?.email}</span>
            </li>
          </>
        ) : (
          <li className="flex gap-1">
            <span className="text-textHoverPrimary">{tlAsync("Name")}:</span>
            <span className="font-semibold">{tlAsync("DefaultName")}</span>
          </li>
        )}
        <ProfilePreferences tl={profilePreferencesTl} />
        {session ? (
          <li>
            <DeleteProfileButton
              tl={deleteButtonTl}
              userEmail={session?.user?.email}
            />
          </li>
        ) : null}
      </ul>
    </main>
  )
}
