import Image from "next/image"

export default function CardPopularSkeleton() {
  return (
    <div className="w-32 transition duration-300 shrink-0 snap-start text-textPrimary hover:scale-105">
      <Image
        className="rounded-t-md min-h-48"
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAADACAYAAADMZmunAAABQUlEQVR42u3SAQ0AAAQAMPLaVFBdD/4Mz66e4K0UQAABBEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAAAQQQQAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEEAAAQQQQAAEQAAEQAAEQAAEQAAEQAAEQAAEQAAEQACuWBc9VVCGM5sbAAAAAElFTkSuQmCC"
        alt="Cover"
        width={128}
        height={192}
      />
      <section className="p-1 rounded-b-md bg-secondary">
        <label className="truncate h-[2ch] w-[10ch] rounded bg-slate-700 fluid-sm" />

        <div className="flex justify-between gap-2 rounded">
          <span className="flex gap-1">
            <span className="h-[1ch] w-[5ch] rounded bg-slate-700" />
            <span className="h-[1ch] w-[3ch] rounded bg-slate-700" />
          </span>
          <span className="h-[2ch] w-[2ch] rounded bg-slate-700" />
        </div>
      </section>
    </div>
  )
}
