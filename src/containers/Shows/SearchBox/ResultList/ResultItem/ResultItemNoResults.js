import React from 'react';
import classes from './ResultItem.module.css';

const resultItemNoResults = (props) => (
    <div className={classes.ResultItem}>
        <div className={classes.NoResults}>
           No results for query: {props.query}
        </div>
    </div>
);

export default resultItemNoResults;