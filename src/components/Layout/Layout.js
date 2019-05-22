import React from 'react';
import classes from './Layout.module.css';
import Menu from './../UI/MainMenu/MainMenu';

const layout = (props) => (
        <React.Fragment>
            <Menu />
            <main className={classes.Layout}>
                {props.children}
            </main>
        </React.Fragment>
);

export default layout;  