type Props = {
  children: React.ReactNode
}

export default function SearchCardContainer({ children }: Props) {
  return (
    <section className="flex w-full gap-2 px-2 py-4 overflow-auto bg-gray-500 scrollbar-hide">
      {children}
    </section>
  )
}
