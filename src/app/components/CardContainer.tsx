type Props = {
  children: React.ReactNode
}

export default function CardContainer({ children }: Props) {
  return (
    <section className="flex max-w-full gap-2 px-12 py-8 overflow-auto justify-self-center">
      {children}
    </section>
  )
}
