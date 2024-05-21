## VueTV - aplikacja zaliczeniowa 

(english below)

### Aplikacja jest dostępna pod adresem:

https://bai-vue-tv.web.app/

uruchomienie lokalne wymaga .env z credentialami api

## Interfejs

[Projekt Interfejsu (figma)](https://www.figma.com/file/ToCZtfqYqHsnE4Ot6ljAUn/VueTV?type=design&node-id=0%3A1&mode=design&t=svhmutbHMhWSaJMN-1) / [Prototyp](https://www.figma.com/proto/ToCZtfqYqHsnE4Ot6ljAUn/VueTV?type=design&node-id=2-2&t=Pf1pyUOi2yhRJpBO-0&scaling=min-zoom&page-id=0%3A1&starting-point-node-id=2%3A2)

## Opis Aplikacji

VueTV to aplikacja zaprojektowana do zarządzania i śledzenia ulubionych filmów samemu i ze znajomymi. Aplikacja
umożliwia zalogowanym użytkownikom przeglądanie listy filmów, dodawanie ich do listy "**obejrzanych**" i "**do
obejrzenia**". Dodatkowo zlicza czas, jaki użytkownik spędził przy ulubionych filmach, a także podaje czas, jaki
potrzebuje przeznaczyć na kolejne z listy "**do obejrzenia**". Korzystający z aplikacji, mogą przeglądać swoje profile,
jak i dodawać siebie nawzajem do list swoich znajomych.

## Opis Techniczny

Aplikacja została zbudowana w oparciu o Vue 3, wykorzystując Composition API do organizacji kodu. Do zarządzania stanem
aplikacji wykorzystano Pinia, a do nawigacji między widokami Vue Router. Aplikacja jest również w pełni dostosowana do widoku mobilnego.

## Widoki

* Widok rejestracji
* Widok logowania
* Widok główny: strona użytkownika z podglądem recenzji znajomych
* Widok listy obejrzanych filmów
* Widok listy filmów do obejrzenia
* Widok listy ze znajomymi
* Widok listy z zaproszeniami do znajomych
* Widok wyszukiwarki filmów i znajomych
* Widok swojego profilu
* Widok ustawień + pop-up usunięcia/zmiany hasła
* Widok dodawania recenzji i notatki jako pop-up
* Widok szczegółów o filmie, jako pop-up i jako osobna strona

## Funkcjonalności

* Rejestracja
* Logowanie
* (Również przy użyciu Google)
* Ustawienia użytkownika (zmiana hasła, usunięcie profilu, wylogowanie)
* Dodawanie zdjęcia do swojego profilu
* Dodawanie/usuwanie filmów z listy "obejrzane" oraz "do obejrzenia"
* Ocenianie obejrzanych filmów w skali 1-10
* Wyświetlanie informacji o czasie spędzonym na oglądaniu
* Wyszukiwanie filmów
* Wyszukiwanie znajomych
* Dodawanie i usuwanie znajomych
* Podgląd swojego profilu i profili innych użytkowników
* Ustawianie prywatności filmów na swoich listach
* Reaktywny nawigacyjny side-bar
* Dodawanie, edytowanie i usuwanie recenzji i notatek
* Powiadomienie w momencie otrzymania zaproszenia do znajomych
* Lista recenzji napisanych przez znajomych

## Biblioteki dodatkowe

* firebase - dostarcza narzędzia i usługi do szybkiego budowania aplikacji mobilnych i webowych, oferując funkcje takie jak bazy danych w czasie rzeczywistym czy uwierzytelnianie.
* normalize.css - zapewnia spójność stylów HTML między różnymi przeglądarkami, poprawiając ich kompatybilność i wygląd, tzw. css reset.
* pinia - biblioteka zarządzania stanem dla Vue.js, umożliwiająca efektywne i reaktywne przechowywanie danych aplikacji.
* primevue - biblioteka UI dla Vue.js, z której wykorzystano komponent Rating do dodawania systemu oceniania gwiazdkowego.
* vue-dragscroll - umożliwia przewijanie elementów poprzez przeciąganie, co poprawia interakcję użytkownika.

## TheMovieDB API

The Movie Database (TMDb) API - dostęp do bogatej bazy danych filmów, seriali telewizyjnych, aktorów oraz ich filmografii. API udostępnia informacje takie jak tytuły, opisy, oceny, daty premiery, obsady filmów, zdjęcia oraz wiele innych szczegółów.

## Uruchomienie lokalne (wymagany .env z credentialami)

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Zalecane jest korzystanie z Microsoft Edge, na innych przeglądarkach czasem występują bugi w UI

## VueTV App (ENG)

### Hosting:

https://bai-vue-tv.web.app/

uruchomienie lokalne wymaga .env z credentialami api

## Interfejs

[Interface project (figma)](https://www.figma.com/file/ToCZtfqYqHsnE4Ot6ljAUn/VueTV?type=design&node-id=0%3A1&mode=design&t=svhmutbHMhWSaJMN-1)

## App description

VueTV is an application designed to manage and track favorite movies individually and with friends. User can browse, add movies to "watched" and "to watch" lists, track viewing time, see movies details, search friends, view profiles, add to friends and a lot more.

## Tech description

The application was built using Vue 3, leveraging the Composition API for code organization. Pinia is used for state management, and Vue Router for view navigation. The application is also fully optimized for mobile view.

## Widoki

* Registration view
* Login view
* Main view: user dashboard with friends' reviews preview
* Watched movies list view
* To watch movies list view
* Friends list view
* Friend requests list view
* Movie and friend search view
* Profile view
* Settings view with password change/delete pop-up
* Add review and note pop-up view
* Movie details view, both as a pop-up and a separate page

## Features

* Registration
* Login (including with Google)
* User settings (change password, delete profile, logout)
* Add profile picture
* Add/remove movies from "watched" and "to watch" lists
* Rate watched movies on a scale of 1-10
* Display viewing time information
* Search for movies
* Search for friends
* Add and remove friends
* View own and other users' profiles
* Set movie privacy on lists
* Reactive sidebar navigation
* Add, edit, and delete reviews and notes
* Notifications for friend requests
* List of reviews written by friends

## Additional libraries

* firebase - Provides tools and services for quickly building mobile and web applications, offering features like real-time databases and authentication.
* normalize.css - Ensures consistency of HTML styles across different browsers, improving compatibility and appearance, also known as a CSS reset.
* pinia - A state management library for Vue.js, allowing efficient and reactive data storage for the application.
* primevue - A UI library for Vue.js, used for its Rating component to implement a star rating system.
* vue-dragscroll - Enables scrolling of elements by dragging, enhancing user interaction.

## TheMovieDB API

The Movie Database (TMDb) API - provides access to a rich database of movies, TV shows, actors, and their filmographies. The API offers information such as titles, descriptions, ratings, release dates, cast details, images, and many other specifics.

## Local deploy (required .env with credentials)

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### It is recommended to use Microsoft Edge, as other browsers may occasionally have UI bugs.

