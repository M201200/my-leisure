import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import Bookmarks from "../components/pageClientSide/Bookmarks"
import { auth } from "@/app/lib/auth"

type Props = {
  params: {
    locale: Locale
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const t = await getTranslations("Bookmarks")
  const title = t("Bookmarks")

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
    <div className="grid content-start gap-4 py-4">
      {!session ? (
        <p className="pt-2 pl-6 font-semibold w-80 fluid-sm text-balance text-textHoverPrimary">
          {t("Disclaimer")}
        </p>
      ) : null}
      <section className="grid gap-5">
        <h1 className="font-extrabold fluid-3xl text-textPrimary">
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
