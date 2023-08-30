type Props = {
  genre: {
    id: number
    name: string
  }
  withGenreCheck: boolean
  withoutGenreCheck: boolean
  withGenre: (event: React.ChangeEvent<HTMLInputElement>) => void
  withoutGenre: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export default function GenreCheck({
  genre,
  withGenre,
  withoutGenre,
  withGenreCheck,
  withoutGenreCheck,
}: Props) {
  return (
    <div className="flex justify-between">
      <span>{genre.name}</span>
      <div>
        <input
          title="Include"
          type="checkbox"
          name={genre.name}
          checked={withGenreCheck}
          onChange={(e) => {
            withGenre(e)
          }}
        />
        <input
          title="Exclude"
          type="checkbox"
          name={genre.name}
          checked={withoutGenreCheck}
          onChange={(e) => {
            withoutGenre(e)
          }}
        />
      </div>
    </div>
  )
}
