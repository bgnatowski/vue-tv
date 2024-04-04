## VueTV - aplikacja zaliczeniowa

Projekt Interfejsu: ***linkacz do figmy czy cos tam***

## Opis Aplikacji
VueTV to prosty klon popularnej aplikacji TV-TIME, zaprojektowany do zarządzania i śledzenia ulubionych programów telewizyjnych oraz filmów. Aplikacja umożliwia użytkownikom przeglądanie aktualnych programów, dodawanie ich do listy ulubionych, otrzymywanie powiadomień o nowych odcinkach oraz dzielenie się swoimi refleksjami na temat oglądanych treści.

## Opis Techniczny
Aplikacja została zbudowana w oparciu o Vue 3, wykorzystując Composition API do organizacji kodu. Do zarządzania stanem aplikacji wykorzystano Vuex, a do nawigacji między widokami Vue Router. Aplikacja składa się z kilku głównych widoków:
 * Ekran Główny: Wyświetla listę dostępnych programów telewizyjnych i filmów, umożliwiając filtrowanie i wyszukiwanie według różnych kryteriów.
 * Ekran Ulubionych: Prezentuje listę ulubionych programów użytkownika, gdzie może zarządzać nimi, dodawać nowe oraz usuwać.
 * Ekran Szczegółów Programu: Zapewnia szczegółowe informacje o wybranym programie, takie jak opis, sezon i odcinki, oceny użytkowników itp.
 * Ekran Ustawień: Pozwala użytkownikowi dostosować preferencje aplikacji, takie jak powiadomienia czy preferowane kategorie programów

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```
