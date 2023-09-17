"use client"
import { useEffect, useState, useRef } from "react"
import { SlArrowDown, SlArrowUp } from "react-icons/sl"
type Props = {
  buttonLabel: string | React.ReactElement
  children: React.ReactNode
  additionalContainerStyles?: string
  buttonStyles?: string
  initialOpen?: boolean
  additionalDropdownStyles?: string
  hasArrow?: boolean
}

export default function Dropdown({
  buttonLabel,
  children,
  additionalContainerStyles,
  additionalDropdownStyles,
  buttonStyles,
  initialOpen = false,
  hasArrow = true,
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
    <div ref={ref} className={`relative z-10 ${additionalContainerStyles}`}>
      <div className="flex">
        <button
          className={`${buttonStyles} px-2`}
          onClick={() => setOpen(!isOpen)}
        >
          {buttonLabel}
        </button>
        {hasArrow ? (
          <button className="translate-y-0.5" onClick={() => setOpen(!isOpen)}>
            {isOpen ? <SlArrowUp /> : <SlArrowDown />}
          </button>
        ) : null}
      </div>

      <div
        className={`overflow-hidden absolute z-10 transition-all ease-in-out ${
          isOpen ? "max-h-max  opacity-100" : "max-h-0  opacity-0"
        } ${additionalDropdownStyles}`}
      >
        {children}
      </div>
    </div>
  )
}
