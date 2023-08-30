import React from "react"

type Props = {
  children: React.ReactNode
  label: string
  maxHeight?: string
  hasCount?: number
}

export default function CardDetailsContainer({
  children,
  label,
  maxHeight,
  hasCount = 0,
}: Props) {
  return (
    <div className="grid">
      <h2>{label}</h2>
      {hasCount ? <h3>Amount: {hasCount}</h3> : null}
      <section
        className={`grid w-full gap-2 bg-gray-500 md:grid-cols-2 2xl:grid-cols-4 overflow-auto ${maxHeight}`}
      >
        {children}
      </section>
    </div>
  )
}
