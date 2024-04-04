## VueTV - aplikacja zaliczeniowa

## Interfejs
[Projekt Interfejsu (figma)](https://www.figma.com/file/ToCZtfqYqHsnE4Ot6ljAUn/VueTV?type=design&node-id=0%3A1&mode=design&t=svhmutbHMhWSaJMN-1) / [Prototyp](https://www.figma.com/proto/ToCZtfqYqHsnE4Ot6ljAUn/VueTV?type=design&node-id=2-60&t=Pf1pyUOi2yhRJpBO-0&scaling=min-zoom&page-id=0%3A1&starting-point-node-id=2%3A2)
## Opis Aplikacji
VueTV to prosty klon popularnej aplikacji TV-TIME, zaprojektowany do zarządzania i śledzenia ulubionych filmów. Aplikacja umożliwia zalogowanym użytkownikom przeglądanie listy filmów, dodawanie ich do listy "**obejrzanych**" i "**do obejrzenia**". Dodatkowo zlicza czas, jaki użytkownik spędził przy ulubionych filmach, a także podaje czas, jaki potrzebuje przeznaczyć na kolejne z listy "**do obejrzenia**". 

## Opis Techniczny
Aplikacja została zbudowana w oparciu o Vue 3, wykorzystując Composition API do organizacji kodu. Do zarządzania stanem aplikacji wykorzystano Vuex, a do nawigacji między widokami Vue Router.

## Widoki
 * Widok rejestracji
 * Widok logowania
 * Widok główny: strona użytkownika 
 * Widok listy obejrzanych filmów
 * Widok listy filmów do obejrzenia
 * Widok wyszukiwarki filmów
 * Widok ustawień + popup usunięcia/zmiany hasła

## Funkcjonalności
 * Rejestracja
 * Logowanie
 * Ustawienia użytkownika (zmiana hasła, usunięcie profilu, wylogowanie)
 * Dodawanie/usuwanie filmów z listy "obejrzane" oraz "do obejrzenia"
 * Ocenianie obejrzanych filmów w skali 1-5
 * Wyświetlanie informacji o czasie spędzonym na oglądaniu
 * Wyszukiwanie filmów

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```
