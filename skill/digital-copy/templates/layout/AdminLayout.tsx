import {Outlet} from 'react-router'
import {AdminSidebar} from '../components/navigation/AdminSidebar.tsx'

export function AdminLayout(){
    return(
        <>
            <div className="flex max-lg:flex-col min-h-screen">
                <AdminSidebar></AdminSidebar>

                <main className="flex-1 min-w-0 flex flex-col px-[32px] max-sm:px-[16px] pt-[30px] bg-[var(--bg-soft)]">
                    <Outlet></Outlet>
                </main>
            </div>
        </>
    )
}
