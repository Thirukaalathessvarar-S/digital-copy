import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route , useLocation } from 'react-router-dom'
import App from './App.tsx'
import {Provider} from 'react-redux'
import {store} from './store/store.ts'
import {Cart} from './component/pages/Cart.tsx'
import {Wishlist} from './component/pages/Wishlist.tsx'
import {Contact} from './component/pages/Contact.tsx'
import {Deals} from './component/pages/Deals.tsx'
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
          <Route path="/cart" element={<Cart/>}></Route>
          <Route path="/wishlist" element={<Wishlist/>}></Route>
          <Route path="/contact" element={<Contact/>}></Route>
          <Route path="/deals" element={<Deals/>}></Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
