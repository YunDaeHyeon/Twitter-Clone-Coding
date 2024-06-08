import { Outlet } from 'react-router-dom';

export default function Layout() {
    return(
        <>
            <h2>layout component</h2>
            <Outlet/>
        </>
    )
}