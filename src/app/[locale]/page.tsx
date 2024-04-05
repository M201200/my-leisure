import { dictionaryHomePage } from "../../../messages/dictionary/clientSide"
import { Dancing_Script } from "next/font/google"
import { BsBookmark, BsBookmarkCheckFill, BsArrowRight } from "react-icons/bs"
import Link from "next/link"

type Params = {
  params: {
    locale: Locale
  }
}

const dancingScript = Dancing_Script({
  subsets: ["latin"],
})

export default function HomePage({ params: { locale } }: Params) {
  const t = dictionaryHomePage(locale)
  return (
    <section className="grid justify-center py-4 text-center text-textPrimary fluid-base gap-y-6">
      <h1 className="pt-4 fluid-3xl">
        {t.Welcome}{" "}
        <span className={`${dancingScript.className} whitespace-nowrap`}>
          <span className="text-orange-600">My</span> Leisure
        </span>
      </h1>

      <p className="lg:fluid-xl max-w-prose">{t.MainText}</p>

      <Link
        href={`/${[locale]}/main`}
        title={t.Proceed}
        className="self-start p-3 transition-colors border rounded-lg fluid-lg bg-secondary hover:bg-accent max-w-max max-h-max justify-self-center border-accent hover:text-secondary"
      >
        {t.Proceed}
      </Link>
      <div className="grid self-center gap-2 p-4 border rounded fluid-sm border-accent max-w-max max-h-max justify-self-center">
        <p>{t.Add}</p>
        <div className="grid justify-center gap-2">
          {t.Click}{" "}
          <span className="flex justify-center translate-y-1 gap-x-1">
            <BsBookmark className="text-green-600" /> <BsArrowRight />{" "}
            <BsBookmarkCheckFill className="text-green-600" />
          </span>
        </div>
      </div>
      <div className="self-center mt-4 fluid-sm max-w-max max-h-max justify-self-center">
        {t.Provided}
      </div>
    </section>
  )
}
