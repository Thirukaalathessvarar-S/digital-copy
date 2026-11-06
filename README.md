# digital-copy

A copy of my coding style that an AI can follow exactly: React 19 + TypeScript + Redux Toolkit +
Tailwind v4 (Vite), taken from my `e-commerce` project and my `style_prompt.xml` rules.

It ships as **one Claude Code skill with three modes**, plus the same three prompts as
**standalone system prompts** for any other chat tool.

| Mode | Use it for | File |
|---|---|---|
| 1. Full project | building a whole app in one shot | `system-prompts/1-full-project.md` |
| 2. Minor change | fixes, new sections, responsive tweaks, a new page in an existing app | `system-prompts/2-minor-change.md` |
| 3. Review & correct | checking a whole project or one change against my style, then fixing on request | `system-prompts/3-review-and-correct.md` |

## What's inside

```
digital-copy/
├── README.md
├── CLAUDE.md.example              drop into a project root as CLAUDE.md
├── system-prompts/                the 3 prompts, for ChatGPT / claude.ai Projects / any API
│   ├── 1-full-project.md
│   ├── 2-minor-change.md
│   └── 3-review-and-correct.md
└── skill/digital-copy/            the Claude Code skill
    ├── SKILL.md                   entry point: loads the reference, picks the mode
    ├── modes/                     same 3 prompts as system-prompts/
    ├── reference/
    │   ├── STYLE_DNA.md           the full style, with rule IDs ([T3], [C7], [R8] ...)
    │   └── style_prompt.xml       my original styling rules (highest authority)
    └── templates/                 real files written in the style, laid out like src/
        ├── App.css  main.tsx
        ├── store/                 store.ts · slice/product/productSlice.ts · slice/wish/wishSlice.ts · asyncThunk/productThunk.ts
        ├── helpers/api.ts         axios fetch method
        ├── constants/             api.ts (urls) · categoryProps.ts
        ├── interfaces/            product.ts · wish.ts · category.ts · props.ts · form.ts
        ├── component/             card/ProductCard.tsx · common/Button.tsx · pages/Deals.tsx Wishlist.tsx Contact.tsx
        └── hooks/UseScroll.ts
```

`STYLE_DNA.md` covers: stack and exact `package.json`, config files, folder layout
(`store/` · `helpers/` · `constants/` · `interfaces/` · `component/` · `assets/images` + `assets/vector`), asset naming,
naming table, character-level formatting (` , ` commas, `if(`, `else{` on a new line, `()=>`,
no semicolons on imports), component anatomy, JSX habits, forms with yup, comments, Redux slices,
axios helpers + `createAsyncThunk`, `store.subscribe` + localStorage, `constants/categoryProps.ts`, `main.tsx` + `ScrollToTop`,
Tailwind in `.tsx` / `.ts`, App.css (`:root`, `@theme`, classes, `@media`), screen widths in CSS,
Tailwind and JS, and a list of legacy patterns not to repeat.

## Use in Claude Code

Install the skill once for all projects:

```bash
git clone https://github.com/Thirukaalathessvarar-S/digital-copy.git
cp -r digital-copy/skill/digital-copy ~/.claude/skills/
```

or for one project only: copy `skill/digital-copy` into `<project>/.claude/skills/`.
Optionally copy `CLAUDE.md.example` to `<project>/CLAUDE.md` so every session uses it.

Then:

```
/digital-copy build an online bookstore with categories, cart, wishlist and checkout
/digital-copy edit make the footer stack into one column on phones
/digital-copy review full
/digital-copy review minor   (checks what was just changed)
```

Without the slash command, Claude picks the skill up when you ask for work "in my style",
a review or a style check.

## Use anywhere else (ChatGPT, claude.ai Projects, API)

1. Set the system prompt (or project instructions) to one file from `system-prompts/`.
2. Attach `skill/digital-copy/reference/STYLE_DNA.md` and `skill/digital-copy/reference/style_prompt.xml`
   as files / project knowledge. For mode 1 also attach the files in `templates/`.

The prompts stop and ask if the reference files are missing, so they never fall back to a generic style.

## Rules of precedence

`style_prompt.xml` > `STYLE_DNA.md` > the file being edited (formatting only) > templates >
anything else. Old code that breaks `style_prompt.xml` (grid, `%` widths, `svh`, 980/565 media
queries, font sizes in className) is listed as **legacy**: never written again, never changed
unless asked.

## Notes

- The templates show the shape of each kind of file. They import `Header`, `Footer` and others that
  are not included, so they are a reference, not a runnable app.
- Breakpoints: the original App.css uses `980 / 767 / 565px`; `style_prompt.xml` sets
  `1023 / 767 / 639px`. New projects use `1023 / 767 / 639`. Edits to a project that already has
  `980 / 767 / 565` blocks add to those blocks instead of creating a second set.
- Out of scope by choice: theme feature (`store/slice/theme/`) and the login/auth localStorage approach.
- Old projects with `app/`, `features/`, a flat `components/` and `fetch` are legacy (STYLE_DNA L20, L21):
  edits follow their existing layout; new projects use the new one.
- When `system-prompts/` and `skill/digital-copy/modes/` disagree, edit both. They are meant to be identical.
