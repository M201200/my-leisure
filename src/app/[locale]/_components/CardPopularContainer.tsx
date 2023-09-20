"use client"
import { BsChevronDoubleLeft, BsChevronDoubleRight } from "react-icons/bs"
import { useRef } from "react"

type Props = {
  children: React.ReactNode
  label: string
}

export default function CardPopularContainer({ children, label }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  function onClickScroll(range: number) {
    const element = ref.current
    if (element) {
      element.scrollTo({
        left: element.scrollLeft + element.offsetWidth * range,
        behavior: "smooth",
      })
    }
  }
  return (
    <div className="grid">
      <h2 className="p-2 font-bold fluid-lg text-accent">{label}</h2>
      <section
        ref={ref}
        className="flex flex-row gap-2 p-2 overflow-auto border rounded-lg bg-primary snap-x scroll-pl-2 justify-items-center max-h-96 scrollbar-hide flex-nowrap"
      >
        {children}
      </section>
      <div className="flex justify-center h-8 gap-4 mt-2">
        <button
          className="px-4 py-2 transition-colors bg-accent text-background rounded-xl hover:bg-hoverAccent"
          onClick={() => onClickScroll(-0.9)}
          title="Previous"
        >
          <BsChevronDoubleLeft />
        </button>
        <button
          className="px-4 py-2 transition-colors bg-accent text-background rounded-xl hover:bg-hoverAccent"
          onClick={() => onClickScroll(0.9)}
          title="Next"
        >
          <BsChevronDoubleRight />
        </button>
      </div>
    </div>
  )
}
