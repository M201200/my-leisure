import CardDetailsContainer from "../../../_components/CardDetailsContainer"
import CardDetailsSkeleton from "../../../_components/common/CardDetailsSkeleton"

export default function Loading() {
  return (
    <>
      <div className="w-full lg:h-40 h-80 bg-hoverSecondary" />
      <CardDetailsContainer label="Series" locale="en">
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
