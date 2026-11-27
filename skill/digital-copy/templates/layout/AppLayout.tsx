import {Outlet} from 'react-router'
import {Header} from '../components/Header.tsx'
import {Footer} from '../components/Footer.tsx'

export function AppLayout(){
    return(
        <>
            <Header></Header>

            <main>
                <Outlet></Outlet>
            </main>

            <Footer></Footer>
        </>
    )
}
