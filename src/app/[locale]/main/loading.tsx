import CardPopularContainer from "@/app/[locale]/components/CardPopularContainer"
import CardPopularSkeleton from "@/app/[locale]/components/common/CardPopularSkeleton"

export default function Loading() {
  const buttonLabels: [string, string] = ["Prev", "Next"]

  return (
    <div className="grid gap-3">
      <CardPopularContainer label={"..."} buttonLabels={buttonLabels}>
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
