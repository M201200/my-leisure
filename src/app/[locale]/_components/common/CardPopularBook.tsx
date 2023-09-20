import Link from "next-intl/link"
import Image from "next/image"

export default function CardPopularBook(props: CardPopularBook) {
  return (
    <div className="w-32 transition duration-300 text-textPrimary hover:scale-105 shrink-0 snap-start">
      <Link
        href={`/entry/${props.catalog}/${props.id}`}
        title={props.title}
        locale={props.locale}
      >
        <Image
          className="aspect-[0.615] rounded-t-md"
          src={
            props.coverPath
              ? `${props.folderPath}${props.coverPath}-M.jpg`
              : "https://fakeimg.pl/128x192/878787/d1d1d1?text=No+image"
          }
          alt="Cover"
          width={128}
          height={208}
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAADACAYAAADMZmunAAABQUlEQVR42u3SAQ0AAAQAMPLaVFBdD/4Mz66e4K0UQAABBEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAAAQQQQAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEEAAAQQQQAAEQAAEQAAEQAAEQAAEQAAEQAAEQAAEQACuWBc9VVCGM5sbAAAAAElFTkSuQmCC"
        />
      </Link>
      <section className="p-1 truncate rounded-b-md bg-secondary">
        <label className="truncate text-accent fluid-sm" title={props.title}>
          <Link
            href={`/entry/${props.catalog}/${props.id}`}
            title={props.title}
            locale={props.locale}
            className="truncate"
          >
            {props.title}
          </Link>
        </label>
        <div className="flex justify-between">
          <span className="truncate fluid-sm" title={props.author}>
            {props.author}
          </span>
          {props.bookmark}
        </div>
      </section>
    </div>
  )
}
