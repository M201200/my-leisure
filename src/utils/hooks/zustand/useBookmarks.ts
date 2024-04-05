import { create } from "zustand"

type BookmarksState = {
  movies: MediaEntry[] | null
  series: MediaEntry[] | null
  books: BookEntry[] | null
  setMovies: (items: MediaEntry[] | null) => void
  setSeries: (items: MediaEntry[] | null) => void
  setBooks: (items: BookEntry[] | null) => void
  addMovie: (item: MediaEntry) => void
  addSeries: (item: MediaEntry) => void
  addBook: (item: BookEntry) => void
  removeMovie: (item: MediaEntry) => void
  removeSeries: (item: MediaEntry) => void
  removeBook: (item: BookEntry) => void
}

export const useBookmarks = create<BookmarksState>()((set) => ({
  movies: null,
  series: null,
  books: null,
  setMovies: (items) => set(() => ({ movies: items })),
  setSeries: (items) => set(() => ({ series: items })),
  setBooks: (items) => set(() => ({ books: items })),
  addMovie: (item) =>
    set((state) => ({
      movies: state.movies ? [...state.movies, item] : [item],
    })),
  addSeries: (item) =>
    set((state) => ({
      series: state.series ? [...state.series, item] : [item],
    })),
  addBook: (item) =>
    set((state) => ({
      books: state.books ? [...state.books, item] : [item],
    })),
  removeMovie: (item) =>
    set((state) => ({
      movies: state.movies
        ? state.movies.filter((i) => i.id !== item.id)
        : null,
    })),
  removeSeries: (item) =>
    set((state) => ({
      series: state.series
        ? state.series.filter((i) => i.id !== item.id)
        : null,
    })),
  removeBook: (item) =>
    set((state) => ({
      books: state.books ? state.books.filter((i) => i.id !== item.id) : null,
    })),
}))
