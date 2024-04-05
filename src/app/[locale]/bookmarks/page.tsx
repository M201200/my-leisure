import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import Bookmarks from "../components/pageClientSide/Bookmarks"
import { auth } from "@/app/lib/auth"

type Props = {
  params: {
    profile: string
    locale: Locale
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const title = params.profile

  return {
    title: title,
  }
}

export default async function ProfilePage({ params }: Props) {
  const session = await auth()
  const t = await getTranslations("Bookmarks")
  const tl = {
    Books: t("Books"),
    Movies: t("Movies"),
    Series: t("Series"),
    Nothing: t("Nothing"),
  }
  return (
    <div className="grid content-start gap-4 pb-4">
      {!session ? (
        <p className="font-semibold fluid-sm text-textHoverPrimary">
          {t("Disclaimer")}
        </p>
      ) : null}
      <section className="grid gap-5 py-5">
        <h1 className="font-extrabold fluid-xl text-textPrimary">
          {t("Bookmarks")}
        </h1>
        <Bookmarks
          locale={params.locale}
          userEmail={session?.user?.email}
          tl={tl}
        />
      </section>
    </div>
  )
}
