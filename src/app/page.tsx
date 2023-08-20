import CardContainer from "./components/CardContainer"
import MoviesList from "./components/data/PopularMovies"
import SeriesList from "./components/data/PopularTVShows"

export default function HomePage() {
  return (
    <div className="grid gap-y-4">
      <CardContainer>
        <MoviesList />
      </CardContainer>
      <CardContainer>
        <SeriesList />
      </CardContainer>
    </div>
  )
}
