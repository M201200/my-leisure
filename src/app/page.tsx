import CardContainer from "./components/CardContainer"
import MoviesList from "./components/PopularMovies"
import SeriesList from "./components/PopularTVShows"

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
