import {
  BsFillCheckCircleFill,
  BsCheckCircle,
  BsDashCircle,
  BsDashCircleFill,
} from "react-icons/bs"

type Props = {
  genre: Genre
  withGenreCheck: boolean
  withoutGenreCheck: boolean
  withGenre: (event: React.MouseEvent<HTMLButtonElement>) => void
  withoutGenre: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export default function GenreCheck({
  genre,
  withGenre,
  withoutGenre,
  withGenreCheck,
  withoutGenreCheck,
}: Props) {
  return (
    <div className="flex justify-between px-1 pb-1 rounded-md gap-x-2 hover:outline hover:outline-1 outline-secondary">
      <span className="fluid-base">{genre.name}</span>
      <div className="flex gap-x-2">
        <button
          className="text-green-500 transition-colors hover:text-green-700"
          title="Include"
          name={genre.name}
          onClick={(e) => {
            withGenre(e)
          }}
        >
          {withGenreCheck ? (
            <BsFillCheckCircleFill className="pointer-events-none" />
          ) : (
            <BsCheckCircle className="pointer-events-none" />
          )}
        </button>
        <button
          className="text-red-500 transition-colors hover:text-red-700"
          title="Exclude"
          name={genre.name}
          onClick={(e) => {
            withoutGenre(e)
          }}
        >
          {withoutGenreCheck ? (
            <BsDashCircleFill className="pointer-events-none" />
          ) : (
            <BsDashCircle className="pointer-events-none" />
          )}
        </button>
      </div>
    </div>
  )
}
