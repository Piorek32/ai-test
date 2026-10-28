# ai-native

Aplikacja Angular pisana przez AI. Człowiek pełni rolę recenzenta: przegląda i akceptuje zmiany (branch → review → merge do `main`).

## Stack

- Angular 22 (standalone, zoneless — w projekcie nie ma `zone.js`)
- TypeScript 6 (tryb strict jest domyślny)
- SCSS
- Testy jednostkowe: Vitest + jsdom przez builder `@angular/build:unit-test`
- Testy e2e: Playwright (Chromium), testy w `e2e/`, konfiguracja w `playwright.config.ts`
- Formatowanie: Prettier (`.prettierrc`: `printWidth: 100`, `singleQuote: true`)
- Node 24 (`.nvmrc`) — Angular 22 nie działa na Node 20

## Komendy

Przed komendami w nowym terminalu: `nvm use`.

- `npm start` — serwer deweloperski, http://localhost:4200
- `npm run build` — build produkcyjny do `dist/ai-native`
- `npx ng test --watch=false` — testy jednorazowo (bez trybu watch)
- `npm run e2e` — testy e2e w przeglądarce (sam uruchamia `ng serve` albo używa już działającego); raport: `npx playwright show-report`
- `npx playwright install chromium` — jednorazowo po sklonowaniu repo (pobiera przeglądarkę)
- `npx prettier --write <pliki>` — formatowanie
- `npx ng generate component <ścieżka/nazwa>` — nowy komponent (używaj CLI zamiast tworzyć pliki ręcznie)

## Struktura

- `src/app/` — kod aplikacji; `app.ts` to komponent główny, `app.routes.ts` routing, `app.config.ts` providery
- `public/` — statyczne pliki (favicon, obrazy)
- Funkcje grupuj po domenie: `src/app/<feature>/` (komponenty, serwisy, modele i testy danej funkcji razem)
- Wspólne elementy: `src/app/shared/`

## Konwencje Angulara

- Nazwy plików wg nowego style guide, bez sufiksów: `user-list.ts`, `user-list.html`, `user-list.scss`, `user-list.spec.ts` (klasa `UserList`, nie `UserListComponent`)
- Tylko komponenty standalone — bez `NgModule`
- Stan przez signals (`signal`, `computed`, `effect`); RxJS tylko tam, gdzie naprawdę są strumienie (np. HTTP)
- `input()`, `output()`, `model()` zamiast dekoratorów `@Input`/`@Output`
- `inject()` zamiast wstrzykiwania przez konstruktor
- Nowa składnia szablonów: `@if`, `@for` (zawsze z `track`), `@switch` — nie `*ngIf`/`*ngFor`
- `ChangeDetectionStrategy.OnPush` w nowych komponentach
- Prefiks selektorów: `app-`
- Lazy loading tras dla większych funkcji (`loadComponent` / `loadChildren`)
- Pola używane tylko w szablonie oznaczaj jako `protected`

## Zasady pracy AI

- Nigdy nie commituj bezpośrednio na `main`. Każde zadanie to osobny branch: `feat/<krótki-opis>`, `fix/<...>`, `chore/<...>`.
- Jeden branch = jedna funkcja/poprawka. Małe, czytelne zmiany są łatwiejsze do review.
- Przed oddaniem zmian do review muszą przejść: `npm run build`, `npx ng test --watch=false` i `npm run e2e`. Nowy kod formatuj Prettierem.
- Każda nowa funkcja ma testy jednostkowe (`*.spec.ts` obok pliku).
- Każda nowa strona / ścieżka użytkownika ma test e2e w `e2e/<feature>.spec.ts`. Elementy, których dotyka test, oznaczaj `data-testid` i szukaj ich przez `page.getByTestId()`.
- Nie dodawaj nowych zależności npm bez zgody użytkownika — zapytaj i uzasadnij.
- Nie zmieniaj konfiguracji (`angular.json`, `tsconfig*.json`, `package.json`) poza zakresem zadania.
- Commity i kod (nazwy, komentarze) po angielsku; komunikacja z użytkownikiem po polsku.
- Na koniec zadania podsumuj: co zmieniono, na którym branchu, jak to przetestować ręcznie.
