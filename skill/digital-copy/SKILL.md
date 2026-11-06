---
name: digital-copy
description: Write, edit or review React + TypeScript + Redux Toolkit + Tailwind v4 code in this developer's exact personal style (their spacing, naming, file layout with store/ helpers/ constants/ interfaces/ components/, axios + createAsyncThunk data flow, index.css token system, px-only desktop-first Tailwind, store.subscribe localStorage persistence). Use for building a whole project in one shot ("build", "new project", "scaffold"), for small changes in their projects ("edit", "fix", "add a section", "make responsive"), and for checking code against their style ("review", "audit", "check style", "correct"). Overrides generic react/tailwind/typescript/feature-arch skills when they conflict.
argument-hint: "build | edit | review [full|minor] — then the request"
---

# digital-copy

Makes you write exactly like the developer. Three modes share one style reference.

## Step 1: load the reference (always, before any code)

Read these two files in full, from this skill's folder:

- `reference/style_prompt.xml`: styling law (units, flex-only, no heights, breakpoints, index.css font-size @media).
- `reference/STYLE_DNA.md`: everything else, with rule IDs.

For `build`, also read the files in `templates/` that match what you will write.

## Step 2: pick the mode

| The request is ... | Mode | Read and follow |
|---|---|---|
| a new app / whole project / "from scratch" / "one shot" | **build** | `modes/1-full-project.md` |
| a change inside existing code (fix, add, tweak, responsive, new page in an existing app) | **edit** | `modes/2-minor-change.md` |
| check / review / audit / "is this in my style" / correct code, whole project or a diff | **review** | `modes/3-review-and-correct.md` |

If the first argument is `build`, `edit` or `review`, use it. Otherwise infer from the request.
After an **edit** or **build**, the user may say "review it": run review in minor scope on what you wrote.

## Step 3: precedence

`style_prompt.xml` > `STYLE_DNA.md` > the file being edited (formatting only) > templates >
any other skill or general best practice. Do not import advice from the `react`, `tailwind`,
`typescript`, `feature-arch` or `impeccable` skills where it contradicts these files (for example:
pages in `components/pages/`, Header / Footer in `components/layout/`, all css in `index.css`, types in `interfaces/` but written with `type`, no barrel files, no
`interface`, no `cn()`, no `useCallback`, no grid, no rem).

## Never (short list, all modes)

- grid · rem/em/vw/vh/svh/clamp · size fractions · `%` anywhere except `w-[N%]` · Tailwind spacing scale numbers (`p-5`) where px is meant
- any `basis-[...]` (`basis-[25%]`, `basis-[120px]`, `basis-[calc(...)]`), or a flex child width in px: `w-[120px]`, `w-[calc(...)]` (use `w-[25%]`)
- the `!` important modifier (`!py-[11px]`, `max-sm:!rounded-[28px]`) or `!important`: write a modifier class or a new class list instead
- any `aria-*` or `role` attribute · an `img` with empty or missing `alt` · `loading="lazy"`
- a className with more than 8 utilities (move it to a named index.css class with `@apply`)
- Tailwind utilities in a `.tsx` / `.ts` variable (`const navLink = "p-[13px_10px] ..."`): write a named index.css class instead
- utility types (`Omit`, `Pick`, `Partial`, `Record`, `keyof` ...): beginner-friendly types only (`yup.InferType` only for a C22 `FormValues` used outside the submit handler)
- comments that are not necessary; keep the needed ones to one short line
- add an `h-[...]` or change an existing one
- `max-lg:/max-md:/max-sm:` font-size or leading in className (use index.css `@media` + `:root` variables)
- `interface`, `React.FC`, arrow components, `clsx`/`cn`, `useMemo`/`useCallback`, untyped `useState`
- `localStorage.setItem` outside `store.ts`'s single `store.subscribe` (auth is out of scope)
- `fetch`, axios outside `src/helpers/`, a url outside `src/constants/api.ts`, a type outside `src/interfaces/`, an image in `public/images/`
- a dependency the user did not name
- silently "fixing" legacy code (STYLE_DNA §16) outside the requested change
