---
name: new-feature
description: Implement a new feature or fix in this Angular app end to end — branch off main, write code and tests, build, push and open a GitHub pull request for review. Use when the user asks to add, build or change something in the app.
argument-hint: <opis funkcji>
---

# Nowa funkcja → Pull Request

Zadanie: $ARGUMENTS

Zasady kodu są w `CLAUDE.md` — trzymaj się ich. Ten skill opisuje tylko kolejność kroków.

## 1. Przygotowanie

1. Jeśli opis zadania jest niejasny albo da się go zrobić na kilka istotnie różnych sposobów — dopytaj użytkownika, zanim zaczniesz.
2. Sprawdź, że drzewo robocze jest czyste (`git status`). Jeśli nie — zatrzymaj się i zapytaj, co zrobić ze zmianami.
3. Zaktualizuj `main` i utwórz branch:
   ```bash
   git checkout main && git pull --ff-only
   git checkout -b feat/<krotki-opis>   # albo fix/..., chore/...
   ```

## 2. Implementacja

- Nowe komponenty / serwisy generuj przez CLI, np. `npx ng generate component <feature>/<nazwa>` (pliki trafiają do `src/app/<feature>/`).
- Nowa strona = nowa trasa w `src/app/app.routes.ts` z `loadComponent`.
- Każda zmiana zachowania ma testy w `*.spec.ts` obok pliku. Testuj to, co widzi użytkownik (DOM), a nie prywatne szczegóły.
- Nowa strona / ścieżka użytkownika ma test e2e w `e2e/<feature>.spec.ts` (Playwright): wejdź na URL, przeklikaj główny scenariusz, sprawdź wynik. Elementy oznaczaj `data-testid`.
- Nie dodawaj zależności npm bez zgody użytkownika.

## 3. Weryfikacja

Najpierw `nvm use` (projekt wymaga Node 24), potem:

```bash
npx prettier --write <zmienione pliki>
npm run build
npx ng test --watch=false
npm run e2e -- --reporter=list
```

Wszystko musi przejść. Jeśli coś pada — napraw, nie omijaj.

## 4. Commit i Pull Request

1. Commit po angielsku, w trybie rozkazującym (np. `Add todo list page`), z krótkim opisem „dlaczego” w treści.
2. `git push -u origin <branch>`
3. Otwórz PR do `main`:
   ```bash
   gh pr create --base main --title "<tytuł>" --body "<opis>"
   ```
   Opis PR zawiera:
   - **Summary** — co się zmieniło (punkty)
   - **Test plan** — checklista: build, testy jednostkowe i e2e (z liczbą), oraz krok ręcznego sprawdzenia (jaki URL otworzyć, co kliknąć)

## 5. Raport dla użytkownika (po polsku)

Link do PR, lista zmienionych plików, wynik testów i jak to sprawdzić ręcznie. Nie merguj PR — to robi użytkownik.
