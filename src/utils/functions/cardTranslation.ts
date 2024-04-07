export default function cardTranslation(locale: Locale) {
  switch (locale) {
    case "en":
      return {
        Date: "Release date",
        Genres: "Genres",
        Unknown: "Unknown",
        Score: "Score",
        Votes: "Votes",
        Editions: "Editions",
        Author: "Author",
        Languages: "Languages",
      }

    case "ro":
      return {
        Date: "Data de lansare",
        Genres: "Genuri",
        Unknown: "Necunoscut",
        Score: "Scor",
        Votes: "Voturi",
        Editions: "Ediții",
        Author: "Autor",
        Languages: "Limbi",
      }

    case "ru":
      return {
        Date: "Дата выхода",
        Genres: "Жанры",
        Unknown: "Неизвестно",
        Score: "Рейтинг",
        Votes: "Голоса",
        Editions: "Изданий",
        Author: "Автор",
        Languages: "Языков",
      }
  }
}
