import React from 'react';
import classes from './MainMenu.module.css';
import Logo from './../../../assets/images/logo_transparent.png';
import {Link} from 'react-router-dom';
import LoaderPanel from './LoaderPanel/LoaderPanel';

const MainMenu = (props) => {
    


    return (
    <header className={classes.Menu}>
        <div className={classes.Logo}>
            <img src={Logo} alt="showsdb"/>
        </div>
        <nav >
            <ul>
                <li className={classes.NavigationItem}><Link to="/">Home</Link></li>
                <li className={classes.NavigationItem}><Link to="/timeline">Timeline</Link></li>
                <li>
                    <LoaderPanel />
                </li>
            </ul>
        </nav>
    </header>
    );
};


export default MainMenu;