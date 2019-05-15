import React from 'react';
import classes from './MetaInfoList.module.css';
import MetaInfo from './MetaInfo/MetaInfo';

const metaInfoList = (props) => (
    <div className={classes.MetaInfoList}>
        <ul>
            {props.metaData.map(el => (<MetaInfo key={el.title} title={el.title} information={el.information}/>))}
        </ul>
    </div>
);

export default metaInfoList;