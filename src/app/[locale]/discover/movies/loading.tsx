import CardDetailsContainer from "@/app/[locale]/components/cards/CardDetailsContainer"
import CardDetailsSkeleton from "@/app/[locale]/components/cards/CardDetailsSkeleton"

export default function Loading() {
  return (
    <CardDetailsContainer label="Movies" locale="en">
      <CardDetailsSkeleton />
      <CardDetailsSkeleton />
      <CardDetailsSkeleton />
      <CardDetailsSkeleton />
      <CardDetailsSkeleton />
      <CardDetailsSkeleton />
      <CardDetailsSkeleton />
      <CardDetailsSkeleton />
      <CardDetailsSkeleton />
      <CardDetailsSkeleton />
      <CardDetailsSkeleton />
      <CardDetailsSkeleton />
      <CardDetailsSkeleton />
      <CardDetailsSkeleton />
      <CardDetailsSkeleton />
      <CardDetailsSkeleton />
      <CardDetailsSkeleton />
      <CardDetailsSkeleton />
      <CardDetailsSkeleton />
      <CardDetailsSkeleton />
    </CardDetailsContainer>
  )
}
