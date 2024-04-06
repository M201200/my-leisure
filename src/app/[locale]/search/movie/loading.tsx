import CardDetailsContainer from "@/app/[locale]/components/CardDetailsContainer"
import CardDetailsSkeleton from "@/app/[locale]/components/common/CardDetailsSkeleton"

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
