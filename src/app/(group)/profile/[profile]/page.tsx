import type { Metadata } from "next"
import BookmarkedMediaContainer from "../../components/BookmarkedMediaContainer"

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
      <BookmarkedMediaContainer storageKey="movie" />
      <BookmarkedMediaContainer storageKey="tvshow" />
    </div>
  )
}
