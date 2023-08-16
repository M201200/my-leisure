import CardContainer from "./components/CardContainer"
import MoviesList from "./components/MoviesList"
import SeriesList from "./components/SeriesList"

export default function HomePage() {
  return (
    <>
      <CardContainer>
        <MoviesList />
      </CardContainer>
      <CardContainer>
        <SeriesList />
      </CardContainer>
    </>
  )
}
