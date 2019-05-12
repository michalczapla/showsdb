import React from 'react';
import classes from './Layout.module.css';

const layout = (props) => (
        <React.Fragment>
            <div>MENU</div>
            <main className={classes.Layout}>
                {props.children}
            </main>
        </React.Fragment>
);

export default layout;  