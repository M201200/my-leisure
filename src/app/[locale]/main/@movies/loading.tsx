import CardPopularContainer from "../../_components/CardPopularContainer"
import CardPopularSkeleton from "../../_components/common/CardPopularSkeleton"

export default function Loading() {
  const buttonLabels: [string, string] = ["Prev", "Next"]

  return (
    <div className="grid py-4 gap-y-4">
      <CardPopularContainer label={"Movies"} buttonLabels={buttonLabels}>
        <CardPopularSkeleton />
        <CardPopularSkeleton />
        <CardPopularSkeleton />
        <CardPopularSkeleton />
        <CardPopularSkeleton />
        <CardPopularSkeleton />
        <CardPopularSkeleton />
        <CardPopularSkeleton />
        <CardPopularSkeleton />
        <CardPopularSkeleton />
        <CardPopularSkeleton />
        <CardPopularSkeleton />
        <CardPopularSkeleton />
        <CardPopularSkeleton />
        <CardPopularSkeleton />
        <CardPopularSkeleton />
        <CardPopularSkeleton />
        <CardPopularSkeleton />
        <CardPopularSkeleton />
        <CardPopularSkeleton />
      </CardPopularContainer>
    </div>
  )
}
