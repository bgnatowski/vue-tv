## VueTV - aplikacja zaliczeniowa

## Interfejs
[Projekt Interfejsu (figma)](https://www.figma.com/file/ToCZtfqYqHsnE4Ot6ljAUn/VueTV?type=design&node-id=0%3A1&mode=design&t=svhmutbHMhWSaJMN-1) / [Prototyp](https://www.figma.com/proto/ToCZtfqYqHsnE4Ot6ljAUn/VueTV?type=design&node-id=2-2&t=Pf1pyUOi2yhRJpBO-0&scaling=min-zoom&page-id=0%3A1&starting-point-node-id=2%3A2)
## Opis Aplikacji
VueTV to aplikacja zaprojektowana do zarządzania i śledzenia ulubionych filmów samemu i ze znajomymi. Aplikacja umożliwia zalogowanym użytkownikom przeglądanie listy filmów, dodawanie ich do listy "**obejrzanych**" i "**do obejrzenia**". Dodatkowo zlicza czas, jaki użytkownik spędził przy ulubionych filmach, a także podaje czas, jaki potrzebuje przeznaczyć na kolejne z listy "**do obejrzenia**". Korzystający z aplikacji, mogą przeglądać swoje profile, jak i dodawać  siebie nawzajem do list swoich znajomych.

## Opis Techniczny
Aplikacja została zbudowana w oparciu o Vue 3, wykorzystując Composition API do organizacji kodu. Do zarządzania stanem aplikacji wykorzystano Vuex, a do nawigacji między widokami Vue Router.

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
 * Widok ustawień + popup usunięcia/zmiany hasła

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

## Uruchomienie lokalne (wymaga uzupelniania .env)

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

## Aplikacja dostepna również na:

https://bgnatowski.github.io/vue-tv/

(ale odswieżanie konkretnych stron tu nie działa) 
