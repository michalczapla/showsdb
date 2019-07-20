import React from 'react';
// import classes from './Layout.module.css';
import Menu from './../UI/MainMenu/MainMenu';
// import classes from '*.module.scss';

const layout = (props) => (
        <React.Fragment>
            <Menu />
            <main>
                {props.children}
            </main>
        </React.Fragment>
);

export default layout;  