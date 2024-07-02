import {useEffect} from 'react';
import {Outlet} from 'react-router-dom';

import {useUser} from '../../context/User.context.jsx';

import Header from '../../components/Header/Header.jsx';
import AsideBar from '../../components/AsideBar/AsideBar.jsx';

import styles from './MainLayout.module.scss';

function MainLayout() {
    const {getUser} = useUser();

    useEffect(() => {
        getUser();
    }, [getUser]);

    return (
        <>
            <Header/>
            <div className={styles["container"]}>
                <AsideBar/>
                <div className={styles["outlet"]}>
                    <Outlet/>
                </div>
            </div>
        </>
    )
}

export default MainLayout;
