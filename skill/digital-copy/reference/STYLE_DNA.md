# STYLE DNA

The complete writing style of this developer, taken from a real project (the `e-commerce`
Vite + React + Redux + Tailwind v4 app). Every rule below was observed in that code. Follow it so
closely that a reader cannot tell your code from theirs.

Rule IDs in brackets (`[T3]`, `[C7]` ...) are used by the review mode to cite violations.

---

## 0. Authority (read first)

1. **`style_prompt.xml` wins** over everything here for styling (units, layout, breakpoints,
   heights, font-size handling, App.css content). It is the developer's newest, explicit rulebook.
2. **This file** is the second authority: how they write React, TypeScript, Redux, files, names,
   comments and Tailwind strings.
3. **Generic skills** (react, tailwind, typescript, feature-arch, impeccable, ...) and "best
   practice" are the lowest authority. When they disagree with 1 or 2, follow 1 and 2.
4. **Legacy patterns** (section 16) exist in the old code but break `style_prompt.xml`. Never write
   them in new code. Never "clean them up" in existing code unless the user asks.
5. **Inside an existing project, the file you are editing is the closest truth.** Match its
   indent, quotes and spacing exactly, even where it differs from this file.

---

## 1. Stack `[S]`

| Concern | Exactly this | Never |
|---|---|---|
| Build | Vite 8, `@vitejs/plugin-react` | CRA, Next.js, Webpack |
| UI | React 19, function components | class components |
| Language | TypeScript ~6 (`.tsx` / `.ts`) | plain JS |
| Styling | Tailwind CSS v4 via `@tailwindcss/vite` + `src/App.css` | tailwind.config.js, CSS modules, styled-components, inline `style={{}}` |
| State | Redux Toolkit 2 + react-redux 9 (`createSlice`, `configureStore`) | Zustand, Context-for-state, RTK Query |
| Persistence | `store.subscribe` → `localStorage` | redux-persist |
| Routing | react-router-dom 7, `BrowserRouter` + `Routes` + `Route` | data routers, file routing |
| Data | `fetch(...).then(res => res.json())` | axios, TanStack Query, SWR |
| Forms | uncontrolled inputs + `FormData` + `yup` | react-hook-form, zod, Formik |
| Toasts | `react-hot-toast` (`<Toaster position="top-center" />`, `toast.success(...)`) | other toast libs |
| JS breakpoints | `react-responsive` `useMediaQuery` | custom resize listeners |
| Icons | Font Awesome 6.5.2 from CDN, `<i className="fa-solid fa-...">` | icon packages (lucide, react-icons) |
| Fonts | Manrope (body), Inter, Satoshi from `<link>` in `index.html` | `@fontsource` packages |
| Lint | `oxlint` | ESLint, Prettier (code is hand-formatted, see section 5) |
| Helpers | none | `clsx`, `classnames`, `cn()`, `tailwind-merge`, lodash |

`[S1]` Do not add a dependency that is not in this table unless the user names it.

### package.json (exact shape)

```json
{
  "name": "e-commerce",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "oxlint",
    "preview": "vite preview"
  },
  "dependencies": {
    "@reduxjs/toolkit": "^2.13.0",
    "@tailwindcss/vite": "^4.3.3",
    "react": "^19.3.1",
    "react-dom": "^19.3.1",
    "react-hot-toast": "^2.6.1",
    "react-redux": "^9.3.0",
    "react-responsive": "^10.0.1",
    "react-router-dom": "^7.18.4",
    "tailwindcss": "^4.3.3",
    "yup": "^1.7.1"
  },
  "devDependencies": {
    "@types/node": "^24.19.2",
    "@types/react": "^19.3.0",
    "@types/react-dom": "^19.3.0",
    "@vitejs/plugin-react": "^6.1.2",
    "oxlint": "^1.88.0",
    "typescript": "~6.0.3",
    "vite": "^8.3.4"
  }
}
```

Note: `@tailwindcss/vite` and `tailwindcss` sit in `dependencies`, not `devDependencies`. Keep it so.
(The original project also lists `liquid-glass-react`, which is installed but unused. Leave it out of new projects.)

### Config files

`vite.config.ts` (note the space before the comma in the plugins array):

```ts
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react() , tailwindcss()],
})
```

`.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

`tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`: the stock Vite React-TS files
(target `es2023`, `moduleResolution: "bundler"`, `allowImportingTsExtensions: true`,
`verbatimModuleSyntax: true`, `noUnusedLocals`, `noUnusedParameters`, `erasableSyntaxOnly`).
`allowImportingTsExtensions` is what lets imports end in `.tsx` / `.ts` (section 5).
`verbatimModuleSyntax` is why types are imported with `import type` / `type X`.

`index.html` head, in this order: charset, favicon, viewport, two Google Fonts `preconnect`s,
Google Fonts link (Manrope 200..800 + Inter 100..800), Fontshare Satoshi link, Font Awesome 6.5.2 CDN
link, `<title>`.

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;600;700;800&family=Inter:wght@100;200;300;400;500;600;700;800&display=swap" rel="stylesheet" />
<link href="https://api.fontshare.com/v2/css?f[]=satoshi@300,400,500,700,900&display=swap" rel="stylesheet" />
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" />
```

`src/index.css` holds one line: `@import "tailwindcss";` and is imported by `main.tsx`.
`src/App.css` is imported by `App.tsx` (first import line: `import './App.css'`).

---

## 2. File structure `[F]`

```
src/
├── main.tsx                      root render, providers, router, routes, global wrappers (ScrollToTop)
├── App.tsx                       home page (default export) + shared types (Product) + extra home sections as named exports (Trending, SmallBanner)
├── App.css                       design tokens (:root, @theme), reusable classes, font-size @media
├── index.css                     @import "tailwindcss";
├── app/
│   └── store.ts                  configureStore + store.subscribe persistence + RootState / AppDispatch
├── features/
│   ├── authentication/authSlice.ts
│   ├── cart/cartSlice.ts
│   ├── items/itemSlice.ts
│   └── order/orderSlice.ts
├── components/                   FLAT: pages AND small components together, PascalCase.tsx
│   ├── Header.tsx  Footer.tsx  ProductCard.tsx  ProductCardSkeleton.tsx  CategoryButton.tsx ...
│   ├── Cart.tsx  Login.tsx  User.tsx  Order.tsx  Special.tsx  CheckoutNew.tsx  Product.tsx ...
│   └── constants/
│       └── categoryProps.ts      static data arrays (camelCase file)
├── hooks/
│   └── UseScroll.ts              file name PascalCase, hook inside is camelCase (useScroll)
└── assets/                       all images, flat, no subfolders
```

- `[F1]` Pages are not in a `pages/` folder. They live in `components/` next to small components.
  A page file is named after the thing (`Cart.tsx`, `Order.tsx`, `Special.tsx`); the exported
  function may differ (`Product.tsx` exports `ProductPage`, `CheckoutNew.tsx` exports `CheckOutNew`).
- `[F2]` One slice per feature folder: `features/<folder>/<name>Slice.ts`. The folder can be longer
  or plural, the slice name is short and singular: `authentication/authSlice.ts`,
  `items/itemSlice.ts`.
- `[F3]` No `index.ts` barrel files. No `types/` folder: a type lives in and is exported from the
  file that owns the data (`Product` from `App.tsx`, `Cart` from `cartSlice.ts`, `Order` from
  `orderSlice.ts`, `categoryType` from `categoryProps.ts`).
- `[F4]` Static lists that pair data with imported images go in `components/constants/<camelName>.ts`.
- `[F5]` Small helpers used by one page stay in that page file above the component
  (`ratingCount`, `percentage`, `widthClass` in `Product.tsx`). Small sub-components used by one
  page also stay in that file (`Tile` in `SampleImage.tsx`; `Address`, `Shipping`, `Payment`,
  `LoadingModal` in `CheckoutNew.tsx`).
- `[F6]` A newer version of a page is a new file with a suffix, the old one is kept:
  `Checkout.tsx` (old) and `CheckoutNew.tsx` (routed). Do not delete the old one unless asked.

---

## 3. Asset naming `[A]`

Observed files: `glowing-skin.png`, `bottle-perfume.png`, `desk-lamp.png`, `armchair.png`,
`grocery-banner.png`, `vision-pro.png`, `apple-pay.svg`, `g-pay.svg`, `credit-card.png`,
`not-found.jpg`, `new-banner.png`, `men-shirt.jpg`, `404.png`, `headset.png`, `macbook.png`.

- `[A1]` File name = **what the picture shows**, not where it is used. The furniture category icon
  is `armchair.png`, beauty is `glowing-skin.png`, fragrances is `bottle-perfume.png`,
  home-decoration is `desk-lamp.png`, the empty-state image is `not-found.jpg`.
- `[A2]` lowercase **kebab-case**, short (1 to 3 words): `desk-lamp.png`, `credit-card.png`.
  Brand names are written as one or two plain words: `g-pay.svg`, `apple-pay.svg`, `vision-pro.png`,
  `macbook.png`, `iphone.png`.
- `[A3]` A replacement image gets a `new-` prefix and the old one stays: `banner.png` → `new-banner.png`.
- `[A4]` Order adjectives the way you would say them in a name tag: object first when it is a
  kind of something (`bottle-perfume`, `grocery-banner`, `phone-banner`), adjective first when it
  describes it (`glowing-skin`, `credit-card`).
- `[A5]` Import variable = camelCase of the file name: `glowingSkin`, `bottlePerfume`, `deskLamp`,
  `gPay`, `applePay`, `creditCard`, `notFound`, `groceryBanner`. When the image fills a role on a
  page, the variable is named by the role: `import banner from "./assets/new-banner.png"`.
- `[A6]` Import path casing must match the file exactly (Linux builds are case-sensitive). Old
  files exported from a design tool keep their PascalCase (`Location.png`, `Payment.svg`,
  `Shipping.svg`, `PlayStation.png`); do not rename them, but new files are always kebab-case.

---

## 4. Naming `[N]`

| Thing | Pattern | Examples |
|---|---|---|
| Component | PascalCase function, named export | `export function ProductCard(` |
| Page component | thing name, sometimes + `Page` | `Cart`, `Login`, `ProductPage`, `CheckOutNew` |
| Props type | `<Component>Props` | `HeaderProps`, `MovingLinkProps`, `CategoryButtonProps` |
| Data type | PascalCase, singular | `Product`, `Cart`, `Order`, `Auth` |
| Constant data type | camelCase + `Type` | `categoryType` |
| Form types | `FormValues`, `FormErrors`, `LoginValues`, `CardErrors` | written by hand, field by field (T15) |
| Handler | `handle` + Noun/Verb | `handleCategory`, `handleSearch`, `handleBar`, `handleLink`, `handleAdd`, `handleMinus`, `handleFilter`, `handleLogout`, `handleViewCount` |
| Other actions | plain verb phrase | `reduceCategory`, `increaseCategory`, `placeOrder`, `change` |
| Boolean state | `[isX , setX]` (setter drops `is`) | `[isOpen,setOpen]`, `[isLoading , setLoading]`, `[isBreadCrumb , setBreadCrumb]` |
| "currently selected" state | `[useX , setX]` | `[useCategory , setCategory]`, `[useImage , setImage]` |
| Other state | `[x , setX]` | `[start , setStart]`, `[related , setRelated]`, `[viewCount, setViewCount]` |
| Derived boolean | `isX` / descriptive | `isHome`, `isSearching`, `buttonState` |
| Derived list | `visibleX` | `visibleProducts`, `visibleItems` |
| Load helper in slice | `load<Name>()` | `loadCart()`, `loadOrder()` |
| Slice actions | verb + noun | `addItems`, `addQuantity`, `reduceQuantity`, `clearCart`, `setItems`, `addOrder` |
| Static data const | camelCase or UPPER for module config lists | `categoryProps`, `paymentMethods`, `FONTS`, `COLORS` |
| Section `id` | kebab-case | `product-listing`, `special-category`, `small-banner`, `cart-empty`, `related-product` |
| Route path | lowercase, kebab, `:param` | `/product/:id`, `/special/:category`, `/sample-image/:id` |
| localStorage key | the store key | `'cart'`, `'order'` |
| Class-string const | short noun | `crumb`, `crumbSeparator`, `crumbCurrent` |
| Class-string prop | short noun or `variant` | `variant`, `bg`, `color` |

---

## 5. Code formatting (TS / TSX) `[T]`

This is hand formatting; no Prettier. Reproduce it character for character.

- `[T1]` **Indent 4 spaces** in components, slices and constants. `main.tsx`, `store.ts` and
  `hooks/*.ts` use **2 spaces** (they grew from the Vite template). When editing, keep the file's indent.
- `[T2]` **Imports**: one per line, no spaces inside braces, ` , ` between names, single quotes,
  **no semicolon**, local files keep their extension.
  ```ts
  import {Link} from 'react-router-dom'
  import {useDispatch , useSelector} from 'react-redux'
  import type {AppDispatch , RootState} from '../app/store'
  import {addItems} from '../features/cart/cartSlice.ts'
  import {Header} from './Header.tsx'
  import notFound from '../assets/not-found.jpg'
  import {createSlice , type PayloadAction} from '@reduxjs/toolkit'
  import * as yup from 'yup'
  ```
  The same package may be imported on two lines (`useDispatch` on one, `useSelector` on another).
  Never import React itself; use the global `React.` namespace for types (`React.FormEvent`).
- `[T3]` **Comma spacing**: ` , ` (space both sides) in destructuring, parameter lists, arrays,
  object literals and type literals:
  `const {homeRef , exploreRef , trendingRef} = useScroll(hasLoaded);`,
  `(sum , item)=>sum + item.price`, `{category:'beauty' , label:'Beauty' , image:glowingSkin}`,
  `categoryProps.slice(start , start + visibleCount)`.
- `[T4]` **Colons**: no space in object keys and type members: `id:number;`, `name:'cart'`,
  `{behavior:'smooth'}`. Spaces around the colon before a props type in a signature:
  `({isSearch , resultRef} : HeaderProps)`. Return types: `function loadCart(): Cart[] {`.
- `[T5]` **Keywords hug parens and braces**: `if(cond){`, `else if(cond){`, `else{`, `try{`,
  `catch{`, `catch(err){`, `return(`, `function handleBar(){`, `export function Cart(){`.
  `else` / `else if` / `catch` start a **new line** after the closing brace:
  ```ts
  if(viewCount===1){
      setViewCount(3);
  }
  else{
      setViewCount(1);
  }
  ```
- `[T6]` **Arrows**: no spaces around `=>` in handlers and selectors: `()=>setOpen(false)`,
  `(state:RootState)=>state.cart`, `prev=>!prev`, `.map((item)=>(`. Inside `fetch` chains spaces
  are used: `.then(res => res.json())`, `.then(data => setRelated(data.products))`.
- `[T7]` **Equality** usually without spaces: `start===0`, `userName===''`, `hash==='#product-listing'`,
  `item.id!==action.payload.id`. Relational operators usually with spaces: `cartCount > 0`,
  `(item.quantity ?? 0) > 0`.
- `[T8]` **Semicolons** end statements inside functions. Imports and the final
  `export const {...} = slice.actions` / `export default slice.reducer` have none.
- `[T9]` **Quotes**: single quotes in logic (`'beauty'`, `'/cart'`). In JSX, `className`, `id`,
  `alt`, `placeholder` use double quotes; `to='/'` may use either. Template literals for dynamic
  strings and classes.
- `[T10]` **Types** use `type`, never `interface`. Members end with `;` and no space after colon:
  ```ts
  type HeaderProps = {
      isSearch:boolean;
      resultRef?:React.RefObject<HTMLElement | null>;
      query?:string;                       // current search term , owned by the page
      onSearch?:(query:string)=>void;      // tells the page a search was submitted
  }
  ```
  Combine with intersection: `Product & {index?:number}`, `StepProps & {address:FormValues | null;}`.
  Small components may type props inline: `({label , content , icon} : {label:string , content:string , icon:string})`.
- `[T11]` `useState` always gets an explicit generic: `useState<boolean>(false)`,
  `useState<string>('')`, `useState<number | null>(null)`, `useState<ProductType[]>([])`.
- `[T12]` `??` for fallbacks everywhere (`item.quantity ?? 0`, `location.state ?? []`), `?.` for
  optional refs and callbacks (`resultRef?.current?.scrollIntoView(...)`, `onSearch?.(...)`).
- `[T13]` No `useMemo`, no `useCallback`, no `React.memo`. Derived values are plain `const`s
  computed in the body.
- `[T15]` **Beginner-friendly types only.** Allowed: `type X = {...}` with plain members,
  optional `?`, unions (`'cart' | 'wish'`, `number | null`), arrays (`Product[]`), `A & {x?:number}`,
  and the generics a library needs (`useState<T>`, `PayloadAction<T>`, `React.FormEvent<HTMLFormElement>`,
  `React.RefObject<HTMLElement | null>`). Never: `Omit`, `Pick`, `Partial`, `Record`, `Required`,
  `Readonly`, `Exclude`, `Extract`, `ReturnType`, `Parameters`, `keyof`, `typeof` in a type,
  `yup.InferType`, mapped or conditional types, or a generic you write yourself.
  The one exception is `RootState` / `AppDispatch` at the end of `store.ts` (Redux needs them).
- `[T14]` Money: `₹` sign, `.toFixed(2)`. Written `₹ {total.toFixed(2)}` in cart/order lists and
  `₹{actualPrice}` on product cards and product page.

---

## 6. Component anatomy `[C]`

### 6.1 Declaration

- `[C1]` `export function Name(){ ... }` (named export, `function` keyword). The only default
  export component is `App` (`function App() { ... }` then `export default App` at the bottom).
  Never arrow components, never `React.FC`.
- `[C2]` Body order: route params / location → `dispatch` → selectors → `useState`s → derived
  `const`s → `useEffect`s → handler functions → early returns → `return(`. (Order is loose in long
  pages; never move existing code to "fix" it.)
- `[C3]` Handlers are inner `function` declarations, not `const x = () =>`:
  ```tsx
  function handleCategory(category:string){
      setCategory(category);
      setSlice('');
  }
  ```

### 6.2 JSX

- `[C4]` Return shape: `return(` newline, fragment `<>`, content, `</>`, newline `)`.
- `[C5]` **Explicit closing tags** for own components and for `img`, `input`, `textarea`:
  `<Footer></Footer>`, `<Header isSearch={false}></Header>`, `<ProductCard ...></ProductCard>`,
  `<img src={x} alt="..." className="..."></img>`, `<input name="city" ... className="input"></input>`.
  `<br/>` is self-closed. In `main.tsx` routes both forms appear; new routes use
  `<Route path="/x" element={<X/>}></Route>`.
- `[C6]` (retired) JSX blocks no longer get a label comment. Existing `{/* label */}` comments in a
  file you edit stay as they are.
- `[C7]` `className` is **one line**. No line breaks inside it, no `clsx`. More than 12 utilities
  → move the static part into a named App.css class (`[X7]`).
- `[C8]` Short rows are written on a single line:
  `<div className="flex justify-between items-center"><span className="label">Subtotal</span><span className="label">₹ {subtotal.toFixed(2)}</span></div>`.
  Icons inside buttons on the same line: `<button ... className="btn-outline gap-[8px]"><i className="fa-solid fa-xmark"></i>Clear search</button>`.
- `[C9]` Conditional rendering, in order of preference:
  - `{cond && <X></X>}` or with the element on the next line:
    ```tsx
    {discountPercentage > 0 &&
        <p className="price-was ...">...</p>
    }
    ```
  - two-way ternary with `?` and `:` at line ends:
    ```tsx
    {buttonState ?
        <Link to='/cart' className="btn-outline ...">Go to Cart</Link>
        : <button onClick={handleLink} className="btn ...">Add to Cart</button>
    }
    ```
  - chained ternary for loading / empty / list, a blank line between branches:
    ```tsx
    {loading ?
        <div className="container flex flex-wrap gap-[20px]">...</div> :

        products.length===0 ?
        <div className="container flex flex-col items-center justify-center">...</div> :

        <div className="container flex flex-wrap gap-[20px]">...</div>
    }
    ```
  - `: ''` as the empty branch: `{isLoading ? <LoadingModal></LoadingModal> : ''}`.
- `[C10]` Conditional classes via template literal with `''` as the else:
  ``className={`link text-nowrap ${isHome && hash==='' ? 'link-active' : ''}`}``.
  Hiding is often done with a class instead of not rendering: `${index>3 ? 'hidden' : ''}`.
- `[C11]` Lists: `.map((x)=>(` ... `))`, `key` first, and **every prop passed explicitly** (no spread):
  ```tsx
  {visibleProducts.map((product , index)=>(
      <ProductCard key={product.id} id={product.id} title={product.title} price={product.price} category={product.category} rating={product.rating} discountPercentage={product.discountPercentage} images={product.images} index={index}></ProductCard>
  ))}
  ```
  Small fixed data may be an inline array literal mapped in JSX (`[{label:'Excellent' , rating:5}, ...].map((row)=>{ ... return( ... ) })`).
- `[C12]` Skeletons while loading: `Array.from({length:4}).map((_ , i)=>(<ProductCardSkeleton key={i}></ProductCardSkeleton>))`.
- `[C13]` Icons: Font Awesome `<i className="fa-solid fa-cart-shopping"></i>`,
  `fa-regular`, `fa-brands`. Icon-only buttons and links get a short `title` (`title="Remove"`).
- `[C28]` **No ARIA at all**: no `aria-label`, `aria-hidden`, `aria-expanded` or any `aria-*`, and
  no `role`.
- `[C29]` **Images**: every `<img>` has an `alt` that describes the picture (`alt={title}`,
  `alt="No deals found"`); never `alt=""`, never a missing `alt`, never `loading="lazy"`.

### 6.3 Page template

Every page component returns this shape:

```tsx
return(
    <>
        <Header isSearch={false}></Header>
        <section id="cart" className="bg-[var(--bg-soft)] p-[30px_0px]">
            <div className="container mb-[30px]">
                <h2>Shopping Cart</h2>
            </div>

            <div className="container flex flex-wrap gap-[30px] max-lg:gap-[20px]">
                ...
                ...
            </div>
        </section>
        <Footer></Footer>
    </>
)
```

- `[C14]` Header is per page, not in a layout route (`isSearch={true}` only on home, which also
  passes `resultRef`, `query`, `onSearch`). Footer closes every page.
- `[C15]` Each `<section>` has a kebab-case `id` and vertical padding as shorthand with explicit
  `0px`: `p-[30px_0px]`, `p-[60px_0px]`, `p-[90px_0px] max-md:p-[60px_0px]`,
  `p-[0px_0px_90px_0px] max-md:p-[0px_0px_60px_0px]`. The `.container` div inside gives width.
- `[C16]` White card on a soft page: section `bg-[var(--bg-soft)]` (old code: `bg-[#F5F6FA]`),
  card `bg-[#ffffff] rounded-[24px] p-[30px] max-sm:p-[20px]`, or the `.card` class.
- `[C17]` Empty states show `notFound` image + `h2` + `text-muted-sm` line + `btn` link back.

### 6.4 Effects and data

- `[C18]` Fetch inside `useEffect` with a `.then` chain. When a newer request can race, use the
  `ignore` flag with its comment:
  ```tsx
  useEffect(()=>{
    let ignore = false;      // skip a stale response
    setLoading(true);
    fetch(url)
        .then(res => res.json())
        .then(data => {
          if(!ignore){
            dispatch(setItems(data.products));
          }
        })
        .finally(()=>{
          if(!ignore){
            setLoading(false);
          }
        });
    return ()=>{
      ignore = true;
    };
  },[useCategory , searchQuery])
  ```
  Simple fetches skip the flag: `.then(res => res.json()).then(data => setRelated(data.products));`.
  Errors: `.then(res => res.ok ? res.json() : Promise.reject()).catch(()=>setFailed(true));`.
- `[C19]` Lists fetched from the API go into Redux (`dispatch(setItems(data.products))`);
  page-only extras (`related`, `productExtra`) stay in `useState`.
- `[C20]` Dependency arrays list what is read, written `[id]`, `[category]`, `[useCategory , searchQuery]`.
  Exhaustive-deps is not enforced; do not add `dispatch` or setters.
- `[C21]` Timers: `const timer = setTimeout(()=>setLoading(false) , 2000); return ()=>clearTimeout(timer);`.

### 6.5 Forms (yup)

```tsx
const schema = yup.object({
    name:yup.string().required('name is required'),
    phone:yup.string().required('phone number is required').matches(/^[6-9]\d{9}$/, "Enter a valid phone number"),
    pincode:yup.string().required('pincode is required').matches(/^\d+$/ , 'pincode must contain only digits').min(6 , 'pincode must be at least 6 digits'),
})

type FormErrors = {
    name?:string;
    phone?:string;
    pincode?:string;
}

type Field = 'name' | 'phone' | 'pincode'
```

- `[C22]` Schema and its types at module top, above the component. Types are written by hand
  (`[T15]`): one optional `string` per field in `FormErrors`, and a `Field` union of the field names.
- `[C23]` Inputs are uncontrolled (`name`, `id`, `placeholder`, `defaultValue`). Submit handler:
  ```tsx
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>){
      event.preventDefault();
      const formElement = event.currentTarget;
      const form = new FormData(formElement);
      const data = Object.fromEntries(form);
      try{
          const values = await schema.validate(data , {abortEarly:false});
          setErrors({});
          ...
      }
      catch(err){
          if (err instanceof yup.ValidationError) {
              const newErrors: FormErrors = {};

              err.inner.forEach((error) => {
                  const field = error.path as Field;

                  if (field && !newErrors[field]) {
                      newErrors[field] = error.message;
                  }
              });
              setErrors(newErrors);
              return;
          }
          throw err;
      }
  }
  ```
  (The `catch` body keeps the spaced style `if (...) {` exactly as shown; it was pasted in and kept.)
- `[C24]` Field block:
  ```tsx
  <div>
      <label htmlFor="city" className="block eyebrow">City / Town</label>
      <input name="city" placeholder="delhi" id="city" className="input mt-[8px]"></input>
      {errors.city && <p className="red-text">{errors.city}</p>}
  </div>
  ```
  Clearing an error on type: `onChange={() => setErrors(prev => ({ ...prev, city: '' }))}`.
- `[C25]` After success: `toast.success('...')`, `formElement.reset()`, `navigate('/')`.

### 6.6 Copy and locale

- `[C26]` Messages are short and lowercase: `toast.success('added to cart')`, `'order placed'`,
  `toast.error('you need to login')`, yup `'name is required'`. Placeholders lowercase:
  `"search"`, `"enter your address"`, `"delhi"`, `"000000"`. Headings are Title Case.
- `[C27]` Indian locale: `₹`, pincode, phone regex `/^[6-9]\d{9}$/`,
  `toLocaleDateString('en-in' , {year:'numeric' , month:'short' , day:'numeric'})`.

---

## 7. Comments `[K]`

- `[K1]` **Comment only when necessary**: when the code alone does not show *why* (a race guard,
  a workaround, a non-obvious rule). Never comment what the code already says.
- `[K2]` **Short**: one line, lowercase, plain English, space before commas:
  `// last one removed , so drop the whole cart entry`, `// currentTarget is null after an await`.
- `[K3]` (retired) No `//action creator` on reducers.
- `[K4]` (retired) No section banners.
- `[K5]` (retired) No JSX block labels. A tricky element may get one short `{/* ... */}` line.
- `[K6]` A size that comes from App.css may get a short pointer: `// size from --breadcrumb-size`.
- `[K7]` A file may end with a note listing API fields:
  ```ts
  // tages = string[]
  // stock : number
  ```
  Keep such notes when editing.

---

## 8. Redux `[R]`

### 8.1 Slice (exact pattern)

```ts
import {createSlice , type PayloadAction} from '@reduxjs/toolkit'

export type Cart = {
    id:number;
    category:string;
    title:string;
    image:string;
    quantity?:number | undefined;
    price:number;
}
function loadCart(): Cart[] {
    try{
        return JSON.parse(localStorage.getItem('cart') ?? '[]');
    }
    catch{
        return [];
    }
}

const initialState: Cart[] = loadCart();

const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers:{
        addItems(state , action : PayloadAction<Cart>){
            if(action.payload.quantity==undefined){
                action.payload.quantity=1;
            }
            state.push(action.payload);
        },
        addQuantity(state,action:PayloadAction<Cart>){
            const item = state.find((cartItem)=>cartItem.id===action.payload.id);
            if(item){
                item.quantity = (item.quantity ?? 0) + 1;
            }
        },
        clearCart(){
            return [];
        }
    },
})

export const {addItems , addQuantity , clearCart} = cartSlice.actions
export default cartSlice.reducer
```

- `[R1]` The state **is** the array (or the object), not wrapped: `Cart[]`, `Product[]`, `Order[]`, `Auth`.
- `[R2]` Type exported at the top; the `load<Name>()` function follows **with no blank line**.
- `[R3]` `const initialState: X = loadX();` (or `= [];` when not persisted).
- `[R4]` Reducers are method shorthand. Replace state by `return action.payload;` / `return [];`.
  Unused state param is `_state`. Payload is typed `action : PayloadAction<X>` (spaces around the
  colon on the first reducer; later reducers may be `state,action:PayloadAction<X>`).
- `[R5]` Guard clauses with early `return;`; a short why-comment only when the reason is not obvious.
- `[R6]` Bottom two lines, no semicolons: `export const {...} = xSlice.actions` and
  `export default xSlice.reducer`.

### 8.2 Store + store.subscribe persistence

```ts
import { configureStore } from '@reduxjs/toolkit'
import itemReducer from '../features/items/itemSlice'
import cartReducer from '../features/cart/cartSlice'
import orderReducer from '../features/order/orderSlice'

export const store = configureStore({
  reducer: {
    items:itemReducer,
    cart:cartReducer,
    order:orderReducer
  },
})

let lastCart = store.getState().cart;
let lastOrder = store.getState().order;
store.subscribe(()=>{
  const {cart , order} = store.getState();

  if(cart!==lastCart){
    lastCart = cart;
    try{
      localStorage.setItem('cart' , JSON.stringify(lastCart));
    }
    catch{

    }
  }

  if(order!==lastOrder){
    lastOrder = order;
    try{
      localStorage.setItem('order' , JSON.stringify(lastOrder));
    }
    catch{

    }
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
```

- `[R7]` **Write** to localStorage only in `store.ts`, through **one** `store.subscribe`.
  **Read** from localStorage only in the slice's `load<Name>()`.
- `[R8]` Per persisted slice: a `let last<Name> = store.getState().<key>;` above the subscribe, a
  reference check `if(x!==lastX){`, update `lastX`, then `try{ localStorage.setItem('<key>' , JSON.stringify(lastX)); }` and an **empty** `catch{` with a blank line inside.
- `[R9]` localStorage key = store key = slice `name` (`'cart'`, `'order'`).
- `[R10]` Reducer imports are `<name>Reducer` default imports without extension; store keys are
  `key:reducer` with no space. Only data the user must keep across reloads is persisted
  (cart, order). The list from the API (`items`) is not.
- `[R11]` Components read with `useSelector((state:RootState)=>state.cart)` and write with
  `const dispatch = useDispatch<AppDispatch>();` (`useDispatch()` without the generic also appears).
  No typed `useAppSelector` hooks file.
- (Authentication storage is out of scope of this DNA. Do not copy the login/localStorage approach
  from `Login.tsx` / `User.tsx`.)

---

## 9. Constants: `components/constants/categoryProps.ts` `[D]`

```ts
import glowingSkin from '../../assets/glowing-skin.png'
import bottlePerfume from '../../assets/bottle-perfume.png'
import armchair from '../../assets/armchair.png'

export type categoryType ={
    category:string ,
    label:string,
    image:string
}
export const categoryProps : categoryType[] = [
    {category:'beauty' , label:'Beauty' , image:glowingSkin},
    {category:'fragrances' , label:'Fragrances' , image:bottlePerfume},
    {category:'furniture' , label:'Furniture' , image:armchair}
]
```

- `[D1]` Images imported at the top (`../../assets/...`), type then array, **one object per line**,
  ` , ` between fields, no trailing comma after the last item.
- `[D2]` `category` = the API slug (used in URLs and fetches), `label` = display text,
  `image` = imported asset.
- `[D3]` The type is camelCase + `Type` and written `={` (no space after `=`).
- `[D4]` Consumed by slicing a window for a carousel and mapping to a component with explicit props:
  ```tsx
  const categoryList = categoryProps.slice(start , start + visibleCount);
  ...
  {categoryList.map((prop)=>(
      <CategoryButton key={prop.category} useCategory={useCategory} category={prop.category} label={prop.label} image={prop.image} handleCategory={handleCategory}></CategoryButton>
  ))}
  ```
  Prev / next buttons are disabled at the ends:
  `disabled={start===0}`, `disabled={start+visibleCount>=categoryProps.length}`.
- `[D5]` Small lists used by one component stay at the top of that component file instead
  (`paymentMethods` in `Footer.tsx`).

---

## 10. main.tsx and wrapper components `[M]`

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route , useLocation } from 'react-router-dom'
import App from './App.tsx'
import {Provider} from 'react-redux'
import {store} from './app/store.ts'
import {Cart} from './components/Cart.tsx'
import {Toaster} from 'react-hot-toast'
import {useEffect} from 'react'

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash === '') {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ScrollToTop />
        <Toaster position="top-center" />
        <Routes>
          <Route path="/" element={<App />}></Route>
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/cart" element={<Cart/>} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
```

- `[M1]` Nesting order: `StrictMode` > `Provider store={store}` > `BrowserRouter` > global
  wrappers (`<ScrollToTop />`, `<Toaster position="top-center" />`, floating panels) > `Routes`.
- `[M2]` Behaviour-only wrappers (render `null`) are plain `function` declarations **inside
  main.tsx** above `createRoot`, not exported, not in their own file. This file keeps the Vite
  template spacing (`{ useLocation }`, `if (...) {`, 2-space indent).
- `[M3]` Every page is imported on its own line with its extension, then listed as a `Route`.
  Flat routes, no nested layouts.
- `[M4]` Hash sections: the Header links to `/#product-listing`, `/#special-category`; the
  `useScroll(ready)` hook in `hooks/UseScroll.ts` returns refs (`homeRef`, `exploreRef`,
  `trendingRef`) and scrolls to them once the page has loaded.

---

## 11. Tailwind in .tsx / .ts `[W]`

Rules from `style_prompt.xml` apply in full. Observed habits on top of them:

- `[W1]` Arbitrary **px** values for everything: `gap-[20px]`, `mb-[30px]`, `rounded-[24px]`,
  `w-[80px]`, `border-[1px]`. Zero is written `0px`: `p-[30px_0px]`, `p-[0px_0px_90px_0px]`.
- `[W2]` Multi-side padding/border as one underscore shorthand: `p-[10px_42px_10px_10px]`,
  `p-[44px_0px_44px_56px]`, `border-[0px_0px_1px_0px]`, `p-[4px_12px]`.
- `[W3]` Borders spell out every part: `border-solid border-[1px] border-[var(--line)]`.
- `[W4]` Colors from variables. In className the usual forms are `bg-[var(--tint)]`,
  `text-[var(--muted)]`, `border-[var(--line-strong)]`; `style_prompt.xml` patterns
  (`text-[color:var(--muted)]`, `bg-(color:--surface)`, `border-(color:--line-strong)`) are also used
  and are preferred in new code. One-off design colors are hex literals: `bg-[#000000]`,
  `text-[#909090]`, `bg-[#EDEDED]`, `bg-[#ffffff]`.
- `[W5]` Font size + line height always together:
  `text-[length:var(--breadcrumb-size)] leading-[calc(var(--breadcrumb-size)+4px)]`.
  Typography otherwise comes from App.css classes (`h2`, `.eyebrow`, `.card-title`, `.price`,
  `.text-muted-sm`, `.label`) placed in `className`.
- `[W6]` Weights: `font-bold`, `font-extrabold`, `font-medium`, `font-semibold`, numeric
  `font-[100]`, `font-[300]`, `font-[400]`. Families: `font-inter`, `font-satoshi`
  (Manrope is the body default).
- `[W7]` Flex children widths: **only** `basis-[N%]` (`basis-[45%]` + `basis-[55%]`, `basis-[50%]`,
  `basis-[66.66%]` + `basis-[33.33%]`, `basis-[100%]`). Never `basis-[Npx]`, never `basis-[calc(...)]`,
  never `w-[Npx]` on a flex child. With a gap, round down so the gaps fit:
  `basis-[23%] max-md:basis-[31%] max-sm:basis-[70%]` for 4 / 3 per row with `gap-[20px]`.
  `min-w-0` / `shrink-0` beside them. `flex-1` for "take the rest".
- `[W8]` Property groups in a className: each property is followed **immediately** by its own
  breakpoint overrides, largest to smallest:
  `p-[20px] max-md:p-[16px] max-sm:p-[12px]`, `gap-[40px] max-lg:gap-[24px] max-md:gap-[20px]`,
  `flex-row ... max-md:flex-col`.
- `[W9]` Overriding a reusable class from App.css in one place uses the `!` prefix:
  `!text-[var(--primary)]`, `!py-[11px]`, `!px-[20px]`, `!pl-[40px]`, `!p-2` (never for font size
  at breakpoints, see `style_prompt.xml`).
- `[W10]` Reusable classes compose with utilities: `className="btn-outline gap-[8px]"`,
  `className="card flex-1 self-start p-[30px] max-sm:p-[20px]"`, `className="input !pl-[40px]"`.
- `[W11]` State variants used: `hover:`, `group` / `group-hover:`, `peer` / `peer-checked:`,
  `has-[:checked]:`, `group-has-[:checked]:`, `disabled:`, `active:`, `last:`, `focus:`.
  Transitions: `transition-colors duration-300`, `transition-[opacity,visibility] duration-300 ease-in-out`,
  `transition-transform duration-300`, `transition-opacity hover:opacity-70`.
- `[W12]` Repeated class strings in one file go in a `const` with a comment
  (`.ts`-side Tailwind):
  ```tsx
  // bread crumb text , size follows --breadcrumb-size from App.css
  const crumb = "shrink-0 hover:underline text-[length:var(--breadcrumb-size)] leading-[calc(var(--breadcrumb-size)+4px)] font-semibold text-[color:var(--muted)]";
  ```
  Use as `className={crumb}` or ``className={`${crumb} capitalize`}``.
- `[W13]` Components accept class strings as props, with a default:
  `bg = 'text-[var(--muted-soft)]'`, `variant?:string` applied as ``className={`${variant} flex ...`}``.
- `[W14]` Dynamic arbitrary classes are built by a helper and **safelisted** in App.css:
  `function widthClass(percent:number){ return \`w-[${percent}%]\`; }` +
  `@source inline("w-[{0..100}%]");`. Any helper that builds class names needs a matching `@source inline(...)`.
- `[W15]` Images keep ratio with `aspect-square object-contain`, sized by `max-w-[...]` per
  breakpoint and the padding around them.
- `[W16]` Layout width comes from `.container`. A section never sets its own width.

---

## 12. App.css `[X]`

### 12.1 File order

```css
@import "tailwindcss";
@source inline("w-[{0..100}%]");

:root { ... }

@theme { ... }

/* reusable classes */

/* @media font-size blocks, largest to smallest, at the very bottom */
```

### 12.2 `:root`

Groups separated by one blank line, in this order:

1. **Font sizes** `--<thing>-size`: `--h1-size: 32px;`, `--h2-size: 24px;`, `--h3-size: 18px;`,
   `--eyebrow-size: 12px;`, `--text-muted-sm-size: 14px;`, `--card-title-size: 16px;`,
   `--price-size: 20px;`, `--price-lg-size: 36px;`, `--btn-size: 15px;`, `--badge-size: 12px;`,
   `--label-size: 14px;`, `--input-size: 16px;`, `--rating-size: 13px;`, `--breadcrumb-size: 14px;` ...
2. **Spacing** used inside classes: `--btn-px: 20px;`, `--btn-py: 12px;`, `--btn-lg-py: 16px;`,
   `--btn-outline-px: 16px;`, `--btn-new-px: 56px;`, `--btn-new-py: 16px;`.
3. **Brand**: `--primary`, `--secondary`, `--tertiary`, `--button` (uppercase hex: `#FFFFFF`, `#424846`, `#D99A2B`, `#151823`).
4. **Neutrals**: `--surface`, `--ink`, `--heading`, `--muted`, `--muted-strong`, `--muted-soft`,
   `--line`, `--line-strong`, `--tint`, `--bg-soft` (lowercase or uppercase hex as found).
5. **Accents** in pairs, color then `-tint`: `--accent-coral` / `--accent-coral-tint`,
   `--accent-sky` / `--accent-sky-tint`, ..., `--secondary-tint`, `--tertiary-tint`.
6. **Dark**: `--dark-soft`, `--dark-softer`.

- `[X1]` Names are kebab-case and describe the role, never the value (`--muted-soft`, not `--gray-400`).
- `[X2]` A new size gets `--<element>-size`; a line height that is not size+4px gets
  `--<element>-leading`; a value used in more than one place becomes a variable first.

### 12.3 `@theme`

```css
@theme {
  --font-manrope: "Manrope", system-ui, sans-serif;
  --font-inter: "Inter", system-ui, sans-serif;
  --font-satoshi: "Satoshi", system-ui, sans-serif;
  --color-muted: var(--muted);
  --color-muted-strong: var(--muted-strong);
  --color-muted-soft: var(--muted-soft);
}
```

Fonts (→ `font-manrope`, `font-inter`, `font-satoshi`) and color aliases pointing to `:root` vars.

### 12.4 Classes

```css
.eyebrow {
    @apply 
    text-[length:var(--eyebrow-size)] 
    leading-[calc(var(--eyebrow-size)+4px)] 
    font-bold
    uppercase;
}
```

- `[X3]` 4-space indent, `@apply` alone on its line, **one utility per line**, `;` only after the last.
- `[X4]` Utility order inside a typography class: size → leading → weight → color → extras.
  Inside a button/chip class: display → `py` → cursor → align/justify → radius → border → bg → `px`
  → size → leading → weight → text color → decoration → `hover:` states.
- `[X5]` Sizes and colors inside classes always come from variables
  (`py-[var(--btn-py)]`, `px-[var(--btn-px)]`, `bg-[var(--ink)]`, `text-[length:var(--btn-size)]`).
- `[X6]` Families of classes: base + modifiers with a hyphen suffix:
  `.btn` `.btn-lg` `.btn-block` `.btn-outline` `.btn-plain` `.btn-text` `.btn-icon`,
  `.chip` `.chip-sm` `.chip-active` `.chip-check`, `.badge` `.badge-discount` `.badge-warning`
  (shared base via grouped selector `.badge,\n.badge-discount,\n.badge-warning {`),
  `.price` `.price-lg` `.price-was`, `.link` `.link-active`.
  Semantic text classes: `.text-muted-sm`, `.green-text`, `.red-text`, `.label`, `.card-title`.
  Box classes: `.card`, `.input`, `.img-placeholder`, `.container`.
- `[X7]` A `className` with **more than 12 utilities** moves into a new App.css class with
  `@apply` (one utility per line, same order as in className). Name it kebab-case after what the
  element is (`.search-bar`, `.rating-chip`). Conditional parts (`${isOpen ? ... : ''}`) stay in
  `className`. App.css classes are unlayered, so a utility that must override one still needs `!`
  (`[W9]`). Shorter lists stay in `className` unless the user asks for `@apply`. Reuse existing
  classes freely.
  ```css
  .search-bar {
      @apply
      self-end
      ms-auto
      flex
      items-center
      gap-[10px]
      basis-[40%]
      max-lg:basis-[30%]
      max-md:basis-[100%]
      max-md:order-4
      shrink
      p-[0px_20px]
      rounded-full
      border-solid
      border-[1px]
      border-(color:--line)
      bg-(color:--surface)
      focus-within:outline-2
      focus-within:outline-offset-2
      focus-within:outline-(color:--primary);
  }
  ```
  Used as `<form className="search-bar">`.

### 12.5 Font-size `@media` blocks

```css
@media (max-width:1023px){
    :root {
        --h1-size: 30px;
        --h2-size: 23px;
        --btn-px: 18px;
    }
}

@media (max-width:767px){
    :root {
        --h1-size: 28px;
        --h2-size: 22px;
    }
}

@media (max-width:639px){
    :root {
        --h1-size: 26px;
        --h2-size: 20px;
    }
}
```

- `[X8]` Written as `@media (max-width:NNNpx){` (no space after the colon, none before `{`),
  4-space `:root {`, 8-space variables.
- `[X9]` Only `:root` inside, only variables that **change** at that width, font sizes first then
  a blank line then spacing variables. Steps of 1px to 2px for text, 2px to 16px for spacing.
- `[X10]` Blocks at the bottom of the file, largest width first.

---

## 13. Screen widths and breakpoints `[B]`

| Layer | Widths in the current project | Rule for new code |
|---|---|---|
| App.css `@media` (font/spacing variables) | `980px`, `767px`, `565px` (+ one legacy `480px` for `#banner`) | `1023px`, `767px`, `639px` (from `style_prompt.xml`) |
| Tailwind in className | `max-lg:` (<1024), `max-md:` (<768), `max-sm:` (<640); also `max-[1120px]:` in `.container`, `max-[767px]:`, `max-[650px]:`, `max-xl:`, `md:` | `max-lg:`, `max-md:`, `max-sm:` only; arbitrary `max-[Npx]:` only with a comment saying why |
| JS (`react-responsive`) | `isMobile` = `{minWidth:300, maxWidth:600}`, `isTablet` = `{minWidth:600, maxWidth:980}` | `isMobile` = `{maxWidth:639}`, `isTablet` = `{minWidth:640, maxWidth:1023}` |
| Page width | `.container` = `w-[1120px] max-[1120px]:w-[90%] mx-auto` | fixed px per step: `w-[1120px] max-xl:w-[960px] max-lg:w-[720px] max-md:w-[600px] max-sm:w-[340px] mx-auto` (see `templates/App.css`) |

- `[B1]` Desktop first. The base class is the desktop value; overrides go down with `max-*`.
- `[B2]` JS breakpoints exist only to change **counts** (how many categories show), written as:
  ```tsx
  let visibleCount = 5;
  const isMobile = useMediaQuery({
    maxWidth:639
  })

  const isTablet = useMediaQuery({
    minWidth:640,
    maxWidth:1023
  })

  if(isTablet){
    visibleCount=3;
  }

  if(isMobile){
    visibleCount=2;
  }
  ```
- `[B3]` **Editing a project that already has `980 / 767 / 565` blocks**: put new variable values
  into the existing blocks. Do not add a parallel `1023` / `639` set beside them, and do not
  rewrite the widths unless the user asks. Review mode reports them as legacy.

---

## 14. Responsive recipe (how they actually shrink a layout)

- **lg** (`max-lg:`): same row, smaller gap and padding (`gap-[40px] max-lg:gap-[24px]`), images get a smaller `max-w`.
- **md** (`max-md:`): `flex-wrap` or `max-md:flex-col` (`flex-col-reverse` when the image should come
  first), basis goes to fewer per row or `max-md:basis-[100%]`, desktop-only parts `max-md:hidden`,
  mobile-only parts `hidden max-md:flex`.
- **sm** (`max-sm:`): one per row or centered narrower card (`max-sm:mx-auto max-sm:basis-[70%]`),
  `max-sm:flex-col max-sm:items-center`, padding to `12px`/`16px`/`20px`.
- Section padding: `p-[90px_0px] max-md:p-[60px_0px]`; card padding `p-[30px] max-sm:p-[20px]`.

---

## 15. Interaction details they always add

- Disabled arrows: `disabled:opacity-40 disabled:cursor-default`.
- Links: `.link` (muted, underline on hover via `decoration-transparent` → `hover:decoration-current`).
- Hover on cards / tiles: `hover:bg-[var(--line)] hover:border-[var(--line-strong)] transition-colors duration-300`.
- Arrow nudge: `group` on the link, `group-hover:translate-x-[4px] transition-transform duration-300` on the icon.
- Mobile menu: absolute full-screen overlay with `data-open={isOpen}`, opacity/visibility transition,
  and the `body:has(#menu[data-open="true"]){ overflow:hidden; }` rule in App.css.
- Cart count badge on the cart icon (`absolute -bottom-[3px] -right-[3px] ... rounded-full`).

---

## 16. Legacy patterns: present in the old code, never write them new `[L]`

| ID | Pattern in old code | Where | New code does |
|---|---|---|---|
| L1 | `grid grid-cols-4 col-span-2 row-span-2 col-start-3` | `App.tsx` SmallBanner | flex + `basis-[N%]` |
| L2 | `w-[50%]`, `w-[40%]`, `w-[70%]`, `max-[1120px]:w-[90%]`, `w-full` on wrappers | Cart, Login, Order, User, `.container` | fixed `w-[Npx]` / `max-w-[Npx]` per breakpoint, or `basis-[N%]` on a flex child |
| L3 | `h-[100svh]`, `min-h-[100svh]`, `h-[70svh]`, `max-md:h-[10vh]`, `w-[100vw] h-[100vh]`, `w-[min(1100px,calc(100vw-96px))]` | Header, Cart, User, LoadingModal | no viewport units; height from content |
| L4 | `max-md:!text-[length:15px] max-md:!leading-[19px]`, `max-lg:text-[56px]` in className | ProductCard, App.tsx | a `--x-size` variable reassigned in App.css `@media` |
| L5 | spacing scale numbers `p-8`, `py-5`, `px-4`, `mt-3`, `gap-1`, `py-3`, `size-10`, `w-11` | various, App.css chips | `p-[32px]`, `py-[20px]` ... |
| L6 | `h-[...]` on boxes | various | never add one; never change an existing one |
| L7 | `@media (max-width:980px)`, `(max-width:565px)`, `(max-width:480px)` | App.css | `1023px`, `767px`, `639px` (see B3 for edits) |
| L8 | element rules in App.css (`h1 {`, `h2 {`, `body {`, `#banner {`, `a:focus-visible`) and raw CSS (`font-size:60px;`) | App.css | only `@theme`, `:root`, classes, min/max-width `@media` |
| L9 | `md:` (min-width) variants mixed with `max-*` | Special.tsx | `max-*` only, desktop first |
| L10 | import path case not matching file (`playstation.png` for `PlayStation.png`) | App.tsx | exact case |
| L11 | `.map` without `key` (`Review` list, stars) | Product.tsx, Review.tsx | always `key` |
| L12 | duplicate `.btn` block in App.css | App.css | one block per class |
| L13 | `rem`, `em`, size fractions `w-1/2`, `basis-1/3` | none yet, keep it that way | px values / `basis-[N%]` |
| L14 | `basis-[480px]`, `basis-[calc((100%-60px)/4)]`, `w-[80px]` on a flex child | ProductCard, Wishlist, Contact (old code) | `basis-[N%]` only |
| L15 | `aria-label`, `aria-hidden`, `role` | old components | no ARIA; `title` on icon-only buttons |
| L16 | `yup.InferType`, `Partial<Record<keyof ...>>`, other utility types | old forms | hand-written types (T15) |
| L17 | `{/* label */}` on every block, `//action creator`, banner comments | everywhere in old code | comments only when necessary, one short line |

The one accepted positioning idiom: an icon or button centred inside a `relative` input wrapper is
`absolute top-[50%] right-[20px] -translate-y-1/2` (or `left-[14px] top-1/2 -translate-y-1/2`).
It is positioning, not sizing, appears everywhere, and is not a violation.

---

## 17. Final checklist (run before you answer)

- [ ] Stack and dependencies unchanged (S1). No new library.
- [ ] Files in the right place and named per F / A / N.
- [ ] Formatting: indent of the file, ` , ` commas, `if(`, `else{` on a new line, `()=>`, no semicolon on imports, `.tsx` extensions on local imports.
- [ ] Explicit closing tags on components and `img` / `input`; className on one line, at most 12 utilities (longer → App.css class).
- [ ] No `aria-*` or `role`; every `img` has a descriptive `alt` and no `loading="lazy"`.
- [ ] Flex child widths are `basis-[N%]` only.
- [ ] Types with `type`, beginner-friendly only (T15), explicit `useState<T>`, no useMemo/useCallback.
- [ ] Redux: slice pattern R1..R6, persistence only via `store.subscribe` R7..R9.
- [ ] Every `style_prompt.xml` `<before_you_finish>` check passes.
- [ ] No legacy pattern from section 16 newly written; no legacy pattern silently changed.
- [ ] Comments only where necessary, one short lowercase line, ` , ` before commas.
