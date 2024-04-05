import CardDetailsContainer from "../../../components/CardDetailsContainer"
import CardDetailsSkeleton from "../../../components/common/CardDetailsSkeleton"

export default function Loading() {
  return (
    <>
      <div className="w-full lg:h-40 h-80 bg-hoverSecondary" />
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
    </>
  )
}
