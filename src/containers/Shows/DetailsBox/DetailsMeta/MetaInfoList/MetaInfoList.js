import React from 'react';
import classes from './MetaInfoList.module.css';
import MetaInfo from './MetaInfo/MetaInfo';
import NoResultsIcon from 'react-ionicons/lib/MdRemove';

const metaInfoList = (props) => (
    <div className={classes.MetaInfoList}>
        <ul>
            {props.metaData.map(el => (<MetaInfo key={el.title} title={el.title} information={(el.information!==''&& el.information.length!==0) ? el.information : <NoResultsIcon fontSize='0.8em' color='#ffffff'/>}/>))}
        </ul>
    </div>
);

export default metaInfoList;