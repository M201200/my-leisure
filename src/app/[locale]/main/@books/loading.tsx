import CardPopularContainer from "@/app/[locale]/components/CardPopularContainer"
import CardPopularSkeleton from "@/app/[locale]/components/common/CardPopularSkeleton"

export default function Loading() {
  const buttonLabels: [string, string] = ["Prev", "Next"]

  return (
    <div className="grid py-4 gap-y-4">
      <CardPopularContainer label={"Books"} buttonLabels={buttonLabels}>
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
