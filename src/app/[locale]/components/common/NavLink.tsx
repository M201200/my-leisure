"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"

type Props = {
  href: string | URL
  children: React.ReactNode
  title?: string
  className?: string
}

export default function NavLink({ href, children, className, title }: Props) {
  const currentPath = usePathname()
  return (
    <Link
      href={href}
      title={title}
      className={`relative after:transition after:origin-center after:duration-100 hover:after:scale-100 after:rounded-sm after:bg-accent after:h-1 after:content-[' '] after:absolute after:left-[5%] after:right-[5%] after:-bottom-2 ${
        currentPath === href ? "after:scale-100" : "after:scale-0"
      } ${className}`}
    >
      {children}
    </Link>
  )
}
