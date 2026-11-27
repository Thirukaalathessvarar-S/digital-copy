import {useEffect} from 'react'
import {Routes , Route , useLocation} from 'react-router'
import {Toaster} from 'react-hot-toast'
import {AppLayout} from './layout/AppLayout.tsx'
import {Home} from './pages/Home.tsx'
import {Deals} from './pages/Deals.tsx'
import {Wishlist} from './pages/Wishlist.tsx'
import {Contact} from './pages/Contact.tsx'

function ScrollToTop(){
    const {pathname , hash} = useLocation();

    useEffect(()=>{
        if(hash===''){
            window.scrollTo(0 , 0);
        }
    },[pathname])

    return null;
}

function App(){
    return(
        <>
            <ScrollToTop></ScrollToTop>
            <Toaster position="top-center"></Toaster>
            <Routes>
                <Route element={<AppLayout/>}>
                    <Route path="/" element={<Home/>}></Route>
                    <Route path="/deals" element={<Deals/>}></Route>
                    <Route path="/wishlist" element={<Wishlist/>}></Route>
                    <Route path="/contact" element={<Contact/>}></Route>
                </Route>
            </Routes>
        </>
    )
}

export default App
