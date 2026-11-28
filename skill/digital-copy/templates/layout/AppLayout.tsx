import {Outlet} from 'react-router'
import {Header} from '../components/Header.tsx'
import {Footer} from '../components/Footer.tsx'

export function AppLayout(){
    return(
        <>
            <div className="flex flex-col min-h-screen">
                <Header></Header>

                <main className="flex-1">
                    <Outlet></Outlet>
                </main>

                <Footer></Footer>
            </div>
        </>
    )
}
