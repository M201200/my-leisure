import CardDetailsContainer from "../_components/CardDetailsContainer"
import CardDetailsSkeleton from "../_components/common/CardDetailsSkeleton"

export default function LoadingMain() {
  return (
    <>
      <div className="w-full lg:h-80 max-h-125 bg-hoverSecondary" />
      <CardDetailsContainer label="Books" locale="en">
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
