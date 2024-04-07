"use client"
import { SetStateAction } from "react"

import { Session } from "next-auth"
import Link from "next/link"
import { PiSignIn, PiSignOut } from "react-icons/pi"

export default function SignIn({
  tl,
  session,
  isOpen,
}: {
  tl: {
    signin: string
    signout: string
  }
  session: Session | null
  isOpen: (value: SetStateAction<boolean>) => void
}) {
  return (
    <Link
      className="grid items-center gap-2 p-1 text-center rounded"
      href={!session ? "/api/auth/signin" : "/api/auth/signout"}
      onClick={() => isOpen(false)}
    >
      <span className="fluid-lg justify-self-center">
        {!session ? (
          <PiSignIn className="text-red-600" />
        ) : (
          <PiSignOut className="text-red-600" />
        )}
      </span>
      <span className="font-semibold fluid-sm">
        {!session ? tl.signin : tl.signout}
      </span>
    </Link>
  )
}
