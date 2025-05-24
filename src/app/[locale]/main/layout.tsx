export default function Layout(props: {
  movies: React.ReactNode
  series: React.ReactNode
  // books: React.ReactNode
}) {
  return (
    <section className="grid py-4 gap-y-4">
      {props.movies}
      {props.series}
      {/* {props.books} */}
    </section>
  )
}
