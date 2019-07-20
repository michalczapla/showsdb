import React, {useState} from 'react';
import classes from './MainMenu.module.css';
import Logo from './../../../assets/images/logo_transparent.png';
import {Link} from 'react-router-dom';
import LoaderPanel from './LoaderPanel/LoaderPanel';
import MenuIcon from 'react-ionicons/lib/MdMenu';

const MainMenu = (props) => {
    const [reactive, setReactive] = useState(false);


    return (
    <header className={[classes.Menu,(reactive) ? classes.MenuReactive : null ].join(' ')}>
        <div className={classes.Logo}>
            <img src={Logo} alt="showsdb"/>
        </div>
        <nav>
            <ul>
                <li className={classes.NavigationItem}><Link to="/">Home</Link></li>
                <li className={classes.NavigationItem}><Link to="/timeline">Timeline</Link></li>
                <li>
                    <LoaderPanel />
                </li>
                <li><button className={classes.ButtonIcon} onClick={()=>setReactive(!reactive)}><MenuIcon color='white'/></button> </li>
            </ul>
        </nav>
    </header>
    );
};


export default MainMenu;