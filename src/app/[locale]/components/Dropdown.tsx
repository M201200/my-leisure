"use client"
import { useEffect, useState, useRef } from "react"
import { SlArrowDown, SlArrowUp } from "react-icons/sl"
type Props = {
  buttonLabel: string | React.ReactElement
  children: React.ReactNode
  additionalContainerStyles?: string
  buttonStyles?: string
  buttonContainerStyles?: string
  initialOpen?: boolean
  additionalDropdownStyles?: string
}

export default function Dropdown({
  buttonLabel,
  children,
  additionalContainerStyles = "",
  buttonStyles = "",
  initialOpen = false,
  buttonContainerStyles = "",
}: Props) {
  const [isOpen, setOpen] = useState(initialOpen)
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Element)) {
        setOpen(false)
      }
    }
    document.addEventListener("click", checkIfClickedOutside)
    return () => {
      document.removeEventListener("click", checkIfClickedOutside)
    }
  }, [setOpen])

  return (
    <div ref={ref} className={`relative ${additionalContainerStyles}`}>
      <div className={`grid text-textPrimary ${buttonContainerStyles}`}>
        <button
          className={`${buttonStyles} pr-2`}
          onClick={() => setOpen(!isOpen)}
        >
          {buttonLabel}
        </button>
      </div>

      <div
        className={`flex flex-wrap justify-end gap-3 gap-x-6 lg:relative absolute w-fit lg:w-full lg:opacity-100 lg:visible lg:translate-x-0 lg:bg-transparent  transition-[visibility,opacity,transform] ease-in-out drop-shadow rounded bg-secondary z-20 p-4 ${
          isOpen
            ? "opacity-100 visible translate-x-0 translate-y-2"
            : "invisible overflow-hidden opacity-0 -translate-x-8 translate-y-2"
        }`}
      >
        {children}
      </div>
    </div>
  )
}
