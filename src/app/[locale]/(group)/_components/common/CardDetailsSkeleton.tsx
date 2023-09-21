import Image from "next/image"

export default function CardDetailsSkeleton() {
  return (
    <div className="grid bg-secondary text-textPrimary rounded-md fluid-base grid-cols-[8rem_1fr] min-h-48">
      <Image
        className="col-start-1 col-end-2 aspect-auto rounded-l-md min-h-48"
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAADACAYAAADMZmunAAABQUlEQVR42u3SAQ0AAAQAMPLaVFBdD/4Mz66e4K0UQAABBEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAAAQQQQAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEEAAAQQQQAAEQAAEQAAEQAAEQAAEQAAEQAAEQAAEQACuWBc9VVCGM5sbAAAAAElFTkSuQmCC"
        alt="No cover"
        width={128}
        height={192}
      />
      <section className="col-start-2 col-end-3 p-2 truncate">
        <div className="flex justify-between gap-4">
          <label className="font-semibold truncate cursor-pointer fluid-lg  roundedh-[2ch] w-[10ch] bg-slate-700" />
        </div>
        <ul className="flex flex-wrap gap-2 truncate">
          <li className="flex flex-wrap gap-2 truncate">
            <label className="font-semibold truncate h-[2ch] w-[15ch] rounded bg-slate-700" />
          </li>
          <li className="flex flex-wrap gap-x-2">
            <label className="font-semibold truncate h-[2ch] w-[15ch] rounded bg-slate-700" />
          </li>
          <li className="flex truncate gap-x-2">
            <label className="font-semibold truncate h-[2ch] w-[10ch] rounded bg-slate-700" />
          </li>
          <li className="flex truncate gap-x-2">
            <label className="font-semibold truncate h-[2ch] w-[10ch] rounded bg-slate-700" />
          </li>
        </ul>
      </section>
    </div>
  )
}
