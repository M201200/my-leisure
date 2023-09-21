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
  hasArrow?: boolean
}

export default function Dropdown({
  buttonLabel,
  children,
  additionalContainerStyles = "",
  additionalDropdownStyles = "",
  buttonStyles = "",
  initialOpen = false,
  hasArrow = true,
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
      <div className={`flex ${buttonContainerStyles}`}>
        <button
          className={`${buttonStyles} pr-2`}
          onClick={() => setOpen(!isOpen)}
        >
          {buttonLabel}
        </button>
        {hasArrow ? (
          <button
            className={`${buttonStyles} translate-y-0.5`}
            onClick={() => setOpen(!isOpen)}
          >
            {isOpen ? (
              <SlArrowUp className="pointer-events-none" />
            ) : (
              <SlArrowDown className="pointer-events-none" />
            )}
          </button>
        ) : null}
      </div>

      <div
        className={`absolute transition z-30 origin-top duration-150 ease-in-out ${
          isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0"
        } ${additionalDropdownStyles}`}
      >
        {children}
      </div>
    </div>
  )
}
