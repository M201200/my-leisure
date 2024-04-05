"use client"

import { useState, useTransition } from "react"

import { signOut } from "next-auth/react"

import deleteProfile from "@/utils/actions/deleteProfile"

export default function DeleteProfileButton({
  tl,
  userEmail,
}: {
  tl: {
    Delete: string
    Cancel: string
    DeleteProfile: string
    DeleteDisclaimer: string
  }
  userEmail: string | null | undefined
}) {
  const [isOpen, setIsOpen] = useState(false)

  const [pending, startTransition] = useTransition()
  return userEmail ? (
    <>
      <button
        className="p-2 my-4 text-red-600 border border-red-700 fluid-base rounded-xl"
        onClick={() => setIsOpen(true)}
      >
        {tl.Delete}
      </button>

      {isOpen ? (
        <dialog className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full overflow-auto bg-black bg-opacity-50 backdrop-blur">
          <div className="bg-bgPrimary m-auto p-8 rounded-lg drop-shadow-md max-w-[95%] text-textSecondary">
            <div className="flex flex-col items-center gap-4">
              <h3 className="fluid-lg">{tl.DeleteDisclaimer}</h3>
              <div className="flex items-stretch gap-4">
                <button
                  className="p-2 text-gray-100 bg-red-600 rounded-lg"
                  onClick={() => {
                    startTransition(() => {
                      deleteProfile(userEmail)
                    })
                    signOut()
                    setIsOpen(false)
                  }}
                >
                  {tl.Delete}
                </button>
                <button
                  className="p-2 text-gray-100 bg-gray-600 rounded-lg"
                  onClick={() => setIsOpen(false)}
                >
                  {tl.Cancel}
                </button>
              </div>
            </div>
          </div>
        </dialog>
      ) : null}
    </>
  ) : null
}
