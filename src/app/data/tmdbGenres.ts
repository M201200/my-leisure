export default function pickGenres(media: "movie" | "tvshow", locale: Locale) {
  const movieGenresEn = [
    {
      id: 28,
      name: "Action",
    },
    {
      id: 12,
      name: "Adventure",
    },
    {
      id: 16,
      name: "Animation",
    },
    {
      id: 35,
      name: "Comedy",
    },
    {
      id: 80,
      name: "Crime",
    },
    {
      id: 99,
      name: "Documentary",
    },
    {
      id: 18,
      name: "Drama",
    },
    {
      id: 10751,
      name: "Family",
    },
    {
      id: 14,
      name: "Fantasy",
    },
    {
      id: 36,
      name: "History",
    },
    {
      id: 27,
      name: "Horror",
    },
    {
      id: 10402,
      name: "Music",
    },
    {
      id: 9648,
      name: "Mystery",
    },
    {
      id: 10749,
      name: "Romance",
    },
    {
      id: 878,
      name: "Science Fiction",
    },
    {
      id: 10770,
      name: "TV Movie",
    },
    {
      id: 53,
      name: "Thriller",
    },
    {
      id: 10752,
      name: "War",
    },
    {
      id: 37,
      name: "Western",
    },
  ]
  const movieGenresRu = [
    {
      id: 28,
      name: "боевик",
    },
    {
      id: 12,
      name: "приключения",
    },
    {
      id: 16,
      name: "мультфильм",
    },
    {
      id: 35,
      name: "комедия",
    },
    {
      id: 80,
      name: "криминал",
    },
    {
      id: 99,
      name: "документальный",
    },
    {
      id: 18,
      name: "драма",
    },
    {
      id: 10751,
      name: "семейный",
    },
    {
      id: 14,
      name: "фэнтези",
    },
    {
      id: 36,
      name: "история",
    },
    {
      id: 27,
      name: "ужасы",
    },
    {
      id: 10402,
      name: "музыка",
    },
    {
      id: 9648,
      name: "детектив",
    },
    {
      id: 10749,
      name: "мелодрама",
    },
    {
      id: 878,
      name: "фантастика",
    },
    {
      id: 10770,
      name: "телевизионный фильм",
    },
    {
      id: 53,
      name: "триллер",
    },
    {
      id: 10752,
      name: "военный",
    },
    {
      id: 37,
      name: "вестерн",
    },
  ]

  const movieGenresRo = [
    {
      id: 28,
      name: "Acțiune",
    },
    {
      id: 12,
      name: "Aventuri",
    },
    {
      id: 16,
      name: "Animaţie",
    },
    {
      id: 35,
      name: "Comedie",
    },
    {
      id: 80,
      name: "Crimă",
    },
    {
      id: 99,
      name: "Documentar",
    },
    {
      id: 18,
      name: "Dramă",
    },
    {
      id: 10751,
      name: "Familie",
    },
    {
      id: 14,
      name: "Fantasy",
    },
    {
      id: 36,
      name: "Istoric",
    },
    {
      id: 27,
      name: "Horror",
    },
    {
      id: 10402,
      name: "Muzică",
    },
    {
      id: 9648,
      name: "Mister",
    },
    {
      id: 10749,
      name: "Romantic",
    },
    {
      id: 878,
      name: "SF",
    },
    {
      id: 10770,
      name: "Film TV",
    },
    {
      id: 53,
      name: "Thriller",
    },
    {
      id: 10752,
      name: "Război",
    },
    {
      id: 37,
      name: "Western",
    },
  ]

  const seriesGenresEn = [
    {
      id: 10759,
      name: "Action & Adventure",
    },
    {
      id: 16,
      name: "Animation",
    },
    {
      id: 35,
      name: "Comedy",
    },
    {
      id: 80,
      name: "Crime",
    },
    {
      id: 99,
      name: "Documentary",
    },
    {
      id: 18,
      name: "Drama",
    },
    {
      id: 10751,
      name: "Family",
    },
    {
      id: 10762,
      name: "Kids",
    },
    {
      id: 9648,
      name: "Mystery",
    },
    {
      id: 10763,
      name: "News",
    },
    {
      id: 10764,
      name: "Reality",
    },
    {
      id: 10765,
      name: "Sci-Fi & Fantasy",
    },
    {
      id: 10766,
      name: "Soap",
    },
    {
      id: 10767,
      name: "Talk",
    },
    {
      id: 10768,
      name: "War & Politics",
    },
    {
      id: 37,
      name: "Western",
    },
  ]

  const seriesGenresRu = [
    {
      id: 10759,
      name: "Боевик и Приключения",
    },
    {
      id: 16,
      name: "мультфильм",
    },
    {
      id: 35,
      name: "комедия",
    },
    {
      id: 80,
      name: "криминал",
    },
    {
      id: 99,
      name: "документальный",
    },
    {
      id: 18,
      name: "драма",
    },
    {
      id: 10751,
      name: "семейный",
    },
    {
      id: 10762,
      name: "Детский",
    },
    {
      id: 9648,
      name: "детектив",
    },
    {
      id: 10763,
      name: "Новости",
    },
    {
      id: 10764,
      name: "Реалити-шоу",
    },
    {
      id: 10765,
      name: "НФ и Фэнтези",
    },
    {
      id: 10766,
      name: "Мыльная опера",
    },
    {
      id: 10767,
      name: "Ток-шоу",
    },
    {
      id: 10768,
      name: "Война и Политика",
    },
    {
      id: 37,
      name: "вестерн",
    },
  ]

  const seriesGenresRo = [
    {
      id: 10759,
      name: "Acţiune & Aventuri",
    },
    {
      id: 16,
      name: "Animaţie",
    },
    {
      id: 35,
      name: "Comedie",
    },
    {
      id: 80,
      name: "Crimă",
    },
    {
      id: 99,
      name: "Documentar",
    },
    {
      id: 18,
      name: "Dramă",
    },
    {
      id: 10751,
      name: "Familie",
    },
    {
      id: 10762,
      name: "Copii",
    },
    {
      id: 9648,
      name: "Mister",
    },
    {
      id: 10763,
      name: "Ştiri",
    },
    {
      id: 10764,
      name: "Reality",
    },
    {
      id: 10765,
      name: "SF & Fantasy",
    },
    {
      id: 10766,
      name: "Soap",
    },
    {
      id: 10767,
      name: "Talk",
    },
    {
      id: 10768,
      name: "Război & Politică",
    },
    {
      id: 37,
      name: "Western",
    },
  ]

  const movieGenres =
    locale === "en"
      ? movieGenresEn
      : locale === "ro"
      ? movieGenresRo
      : locale === "ru"
      ? movieGenresRu
      : movieGenresEn
  const seriesGenres =
    locale === "en"
      ? seriesGenresEn
      : locale === "ro"
      ? seriesGenresRo
      : locale === "ru"
      ? seriesGenresRu
      : movieGenresEn

  return media === "movie" ? movieGenres : seriesGenres
}
