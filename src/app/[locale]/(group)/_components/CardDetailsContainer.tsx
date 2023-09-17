type Props = {
  children: React.ReactNode
  label: string
  locale: Locale
  maxHeight?: string
  hasCount?: number
}

export default function CardDetailsContainer({
  children,
  label,
  locale,
  maxHeight,
  hasCount = 0,
}: Props) {
  const total = locale === "ru" ? "Всего: " : "Total: "
  return (
    <div className="grid">
      <h2>{label}</h2>
      {hasCount ? (
        <h3 className="flex items-center gap-1">
          {total}
          {hasCount}
        </h3>
      ) : null}
      <section
        className={`grid w-full gap-2 bg-gray-500 md:grid-cols-2 2xl:grid-cols-4 overflow-auto ${maxHeight}`}
      >
        {children}
      </section>
    </div>
  )
}
