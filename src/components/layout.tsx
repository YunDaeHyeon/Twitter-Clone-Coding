import { Outlet } from 'react-router-dom';

export default function Layout() {
    return(
        <>
            <h2>메인페이지입니다.</h2>
            <Outlet/>
        </>
    )
}