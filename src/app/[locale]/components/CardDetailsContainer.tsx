type Props = {
  children: React.ReactNode
  label: string
  locale: Locale
  maxHeight?: string
  hasCount?: number
  labelSize?: "fluid-lg" | "fluid-xl" | "fluid-2xl" | "fluid-3xl"
}

export default function CardDetailsContainer({
  children,
  label,
  locale,
  maxHeight,
  hasCount = 0,
  labelSize = "fluid-3xl",
}: Props) {
  const total = locale === "ru" ? "Всего: " : "Total: "
  return (
    <div className="grid gap-2 py-4">
      <h1 className={`font-extrabold ${labelSize} text-accent`}>{label}</h1>
      {hasCount ? (
        <h3 className="flex items-center gap-1 py-1 font-semibold fluid-lg text-textPrimary">
          {total}
          {hasCount}
        </h3>
      ) : null}
      <section
        className={`grid w-full gap-4 p-2 rounded-md md:grid-cols-2 2xl:grid-cols-4 overflow-auto ${maxHeight}`}
      >
        {children}
      </section>
    </div>
  )
}
