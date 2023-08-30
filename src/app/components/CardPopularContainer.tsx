"use client"
import { useLayoutEffect, useRef } from "react"

type Props = {
  children: React.ReactNode
  label: string
}

export default function CardPopularContainer({ children, label }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (ref.current) {
      const elWidth = ref.current.offsetWidth / 2
      ref.current.scrollLeft = ref.current.scrollWidth / 2 - elWidth
    }
  }, [ref])
  return (
    <div className="grid">
      <h2>{label}</h2>
      <section
        ref={ref}
        className="grid w-full grid-cols-2 gap-4 px-2 py-4 overflow-auto bg-gray-500 justify-items-center max-h-96 scrollbar-hide sm:flex sm:flex-row sm:flex-nowrap"
      >
        {children}
      </section>
    </div>
  )
}
