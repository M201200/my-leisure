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
      <h2>{label}</h2>
      <section
        ref={ref}
        className="flex flex-row gap-2 px-2 overflow-auto bg-gray-500 snap-x scroll-pl-2 justify-items-center max-h-96 scrollbar-hide flex-nowrap"
      >
        {children}
      </section>
      <div className="flex justify-center h-8 gap-2">
        <button onClick={() => onClickScroll(-0.9)}>
          <BsChevronDoubleLeft />
        </button>
        <button onClick={() => onClickScroll(0.9)}>
          <BsChevronDoubleRight />
        </button>
      </div>
    </div>
  )
}
