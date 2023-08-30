import CardPopularContainer from "./components/CardPopularContainer"
import MoviesList from "./components/lists/PopularMovies"
import SeriesList from "./components/lists/PopularTVShows"

export default function HomePage() {
  return (
    <div className="grid gap-y-4">
      <CardPopularContainer label="Random movies:">
        <MoviesList />
      </CardPopularContainer>
      <CardPopularContainer label="Random series:">
        <SeriesList />
      </CardPopularContainer>
    </div>
  )
}
