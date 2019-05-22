import React from 'react';
import classes from './MainMenu.module.css';
import Logo from './../../../assets/images/logo_transparent.png';

const mainMenu = (props) => (
    <header className={classes.Menu}>
        <div className={classes.Logo}>
            <img src={Logo} alt="showsdb"/>
        </div>
        <nav >
            <ul>
                <li className={classes.NavigationItem}><a href="/home">Home</a></li>
                <li className={classes.NavigationItem}><a href="/timeline">Timeline</a></li>
            </ul>
        </nav>
    </header>
);

export default mainMenu;