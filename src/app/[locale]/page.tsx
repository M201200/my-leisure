import { getTranslations } from "next-intl/server"
import Link from "next/link"

type Params = {
  params: {
    locale: Locale
  }
}

export default async function HomePage({ params: { locale } }: Params) {
  const t = await getTranslations("WelcomeScreen")
  return (
    <section className="grid justify-center items-center min-h-[70vh] p-4 m-4 text-center text-textPrimary fluid-base gap-y-12">
      <div className="grid justify-center justify-items-center">
        <p className="font-bold leading-none tracking-wide fluid-3xl">
          {t("MainText1")}
        </p>
        <p className="max-w-xl font-bold leading-none tracking-wide fluid-2xl">
          {t("MainText2")}
        </p>
      </div>

      <Link
        href={`/${[locale]}/main`}
        title={t("Proceed")}
        className="self-start gap-2 p-4 font-bold text-orange-600 transition-colors border rounded-lg fluid-xl hover:bg-accent max-w-max max-h-max justify-self-center border-accent hover:text-secondary"
      >
        {t("Proceed")}
      </Link>
      <div className="self-end text-textHoverPrimary fluid-sm justify-self-center">
        {t("Provided")}
      </div>
    </section>
  )
}
