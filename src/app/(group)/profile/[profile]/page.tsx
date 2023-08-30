import type { Metadata } from "next"
import BookmarkedContainer from "../../components/BookmarkedContainer"

type Props = {
  params: { profile: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const title = params.profile

  return {
    title: title,
  }
}

export default function ProfilePage() {
  return (
    <div className="grid gap-4">
      <h1>Bookmarks:</h1>
      <BookmarkedContainer storageKey="movie" />
      <BookmarkedContainer storageKey="tvshow" />
    </div>
  )
}
