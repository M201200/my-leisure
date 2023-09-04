export function dictionaryDetails(locale: Locale) {
  switch (locale) {
    case "en":
      return {
        Date: "Release date:",
        Genres: "Genres:",
        Unknown: "Unknown",
        Score: "Score:",
        Votes: "Votes:",
      }

    case "ro":
      return {
        Date: "Data de lansare:",
        Genres: "Genuri:",
        Unknown: "Necunoscut",
        Score: "Scor:",
        Votes: "Voturi:",
      }

    case "ru":
      return {
        Date: "Дата выхода:",
        Genres: "Жанры:",
        Unknown: "Неизвестно",
        Score: "Рейтинг:",
        Votes: "Голоса:",
      }
  }
}

export function dictionaryFilter(locale: Locale) {
  switch (locale) {
    case "en":
      return {
        ReleaseDate: "Release date:",
        Genres: "Genres:",
        Sort: "Sort by:",
        Score: "Score:",
        Votes: "Vote count:",
        Popularity: "Popularity",
        Order: "Descend/Ascend",
        Submit: "Submit",
      }

    case "ro":
      return {
        ReleaseDate: "Data de lansare:",
        Genres: "Genuri:",
        Sort: "Filtrează după:",
        Score: "Scor:",
        Votes: "Număr de voturi:",
        Popularity: "Popularitate",
        Order: "Coborâre/Urcare",
        Submit: "A confirma",
      }

    case "ru":
      return {
        ReleaseDate: "Дата выхода:",
        Genres: "Жанры:",
        Sort: "Сортировать по:",
        Score: "Рейтинг:",
        Votes: "Количество голосов:",
        Popularity: "Популярность",
        Order: "Уменьшение/Возрастание",
        Submit: "Подтвердить",
      }
  }
}

export function dictionarySearchBar(locale: Locale) {
  switch (locale) {
    case "en":
      return {
        Search: "Search",
        Slaceholder: "search for...",
        Movie: "Movie",
        TVShow: "TV Show",
      }
    case "ro":
      return {
        Search: "Căutare",
        Placeholder: "caută...",
        Movie: "Film",
        TVShow: "Serie",
      }
    case "ru":
      return {
        Search: "Поиск",
        Placeholder: "искать...",
        Movie: "Фильм",
        TVShow: "Сериал",
      }
  }
}

export function dictionaryLanguageSwitcher(locale: Locale) {
  switch (locale) {
    case "en":
      return {
        Eng: "English",
        Roman: "Romanian",
        Rus: "Russian",
        Change: "Change",
      }
    case "ro":
      return {
        Eng: "Engleză",
        Roman: "Română",
        Rus: "Rusă",
        Change: "Schimbare",
      }
    case "ru":
      return {
        Eng: "Английский",
        Roman: "Румынский",
        Rus: "Русский",
        Change: "Сменить",
      }
  }
}
