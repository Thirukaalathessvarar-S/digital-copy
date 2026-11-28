import {Navigate} from 'react-router'
import {useSelector} from 'react-redux'
import type {RootState} from '../store/store.ts'
import {AdminLayout} from '../layout/AdminLayout.tsx'

// only the admin login sets isAdmin , a role from the shop login is not enough
export function ProtectedRoute(){
    const auth = useSelector((state:RootState)=>state.auth);

    if(!auth.isAdmin){
        return <Navigate to='/admin/login'></Navigate>
    }

    return(
        <>
            <AdminLayout></AdminLayout>
        </>
    )
}
