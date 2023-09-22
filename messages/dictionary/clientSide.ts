export function dictionaryDetails(locale: Locale) {
  switch (locale) {
    case "en":
      return {
        Date: "Release date: ",
        Genres: "Genres: ",
        Unknown: "Unknown",
        Score: "Score: ",
        Votes: "Votes: ",
        Editions: "Editions: ",
        Author: "Author: ",
        Languages: "Languages: ",
      }

    case "ro":
      return {
        Date: "Data de lansare: ",
        Genres: "Genuri: ",
        Unknown: "Necunoscut",
        Score: "Scor: ",
        Votes: "Voturi: ",
        Editions: "Ediții: ",
        Author: "Autor: ",
        Languages: "Limbi: ",
      }

    case "ru":
      return {
        Date: "Дата выхода: ",
        Genres: "Жанры: ",
        Unknown: "Неизвестно",
        Score: "Рейтинг: ",
        Votes: "Голоса: ",
        Editions: "Изданий: ",
        Author: "Автор: ",
        Languages: "Языков: ",
      }
  }
}

export function dictionaryMediaFilter(locale: Locale) {
  switch (locale) {
    case "en":
      return {
        ReleaseDate: "Release date",
        Genres: "Genres",
        Sort: "Sort by",
        Score: "Score",
        Votes: "Vote count",
        Popularity: "Popularity",
        Order: "Descend/Ascend",
        Submit: "Submit",
        Reset: "Reset",
      }

    case "ro":
      return {
        ReleaseDate: "Data de lansare",
        Genres: "Genuri",
        Sort: "Filtrează după",
        Score: "Scor",
        Votes: "Număr de voturi",
        Popularity: "Popularitate",
        Order: "Coborâre/Urcare",
        Submit: "A confirma",
        Reset: "Resetați",
      }

    case "ru":
      return {
        ReleaseDate: "Дата выхода",
        Genres: "Жанры",
        Sort: "Сортировать по",
        Score: "Рейтинг",
        Votes: "Количество голосов",
        Popularity: "Популярность",
        Order: "Уменьшение/Возрастание",
        Submit: "Подтвердить",
        Reset: "Сброс",
      }
  }
}

export function dictionaryBookFilter(locale: Locale) {
  switch (locale) {
    case "en":
      return {
        Sort: "Sort by",
        Popularity: "Popularity",
        Order: "Descend/Ascend",
        Submit: "Submit",
        Reset: "Reset",
        Any: "General search",
        ByTitle: "By title",
        ByAuthor: "By author",
        BySubject: "By subject",
        ByPlace: "By place",
        ByPerson: "By person",
        ByLanguage: "By language",
        ByPublisher: "By publisher",
        Relevance: "Relevance",
        Editions: "Number of editions",
        Date: "Publish date",
        Desc: "descend",
        Asc: "ascend",
        Rating: "Rating",
        Random: "Random",
      }

    case "ro":
      return {
        Sort: "Filtrează după",
        Popularity: "Popularitate",
        Order: "Coborâre/Urcare",
        Submit: "A confirma",
        Reset: "Resetați",
        Any: "Căutare generală",
        ByTitle: "Dupa titlu",
        ByAuthor: "După autor",
        BySubject: "După subiect",
        ByPlace: "După loc",
        ByPerson: "După persoană",
        ByLanguage: "După limbă",
        ByPublisher: "De către editor",
        Relevance: "Relevanţă",
        Editions: "Numărul de ediții",
        Date: "Data publicării",
        Desc: "descinde",
        Asc: "ridica",
        Rating: "Evaluare",
        Random: "Aleatoriu",
      }

    case "ru":
      return {
        Sort: "Сортировать по",
        Popularity: "Популярность",
        Order: "Уменьшение/Возрастание",
        Submit: "Подтвердить",
        Reset: "Сброс",
        Any: "Общий поиск",
        ByTitle: "По заголовку",
        ByAuthor: "По автору",
        BySubject: "По теме",
        ByPlace: "По локации",
        ByPerson: "По персонажу",
        ByLanguage: "По языку",
        ByPublisher: "По изданию",
        Relevance: "Актуальность",
        Editions: "Количество изданий",
        Date: "Дата публикации",
        Desc: "убывание",
        Asc: "возрастание",
        Rating: "Рэйтинг",
        Random: "Случайно",
      }
  }
}

export function dictionarySearchBar(locale: Locale) {
  switch (locale) {
    case "en":
      return {
        Search: "Search",
        Placeholder: "search for...",
        Movie: "Movie",
        TVShow: "TV Show",
        Book: "Book",
      }
    case "ro":
      return {
        Search: "Căutare",
        Placeholder: "caută...",
        Movie: "Film",
        TVShow: "Serie",
        Book: "Carte",
      }
    case "ru":
      return {
        Search: "Поиск",
        Placeholder: "искать...",
        Movie: "Фильм",
        TVShow: "Сериал",
        Book: "Книга",
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

export function dictionaryThemeToggle(locale: Locale) {
  switch (locale) {
    case "en":
      return {
        Theme: "Theme",
        Dark: "Dark",
        Light: "Light",
      }
    case "ro":
      return {
        Theme: "Temă",
        Dark: "Întuneri",
        Light: "Ușoară",
      }
    case "ru":
      return {
        Theme: "Тема",
        Dark: "Темная",
        Light: "Светлая",
      }
  }
}

export function dictionaryHomePage(locale: Locale) {
  switch (locale) {
    case "en":
      return {
        Welcome: "Welcome to ",
        MainText:
          "It's a database* with great variety of movies, series and books to find something interesting for yourself.",
        Add: "You can add to bookmarks any media you interesting in.",
        Click: "Just click on 'bookmark' icon",
        Proceed: "Proceed to main page",
        Provided: "*Provided by themoviedb.org and openlibrary.org.",
      }
    case "ro":
      return {
        Welcome: "Bun venit la ",
        MainText:
          "Este o bază de date* cu o mare varietate de serii, de filme și cărți pentru a găsi ceva interesant pentru tine.",
        Add: "Puteți adăuga la marcaje orice conținut media care vă interesează.",
        Click: "Doar faceți clic pe pictograma 'marcajului'",
        Proceed: "Treceți la pagina principală",
        Provided: "*Furnizat de themoviedb.org și openlibrary.org.",
      }
    case "ru":
      return {
        Welcome: "Добро пожаловать на ",
        MainText:
          "Это база данных* с широким выбором сериалов, фильмов и книг, где можно найти что-то интересное для себя.",
        Add: "Вы можете добавить в закладки любые интересующие вас медиа.",
        Click: "Просто нажмите на иконку 'закладки'",
        Proceed: "Перейти на главную страницу",
        Provided: "*Предоставлена themoviedb.org и openlibrary.org.",
      }
  }
}
