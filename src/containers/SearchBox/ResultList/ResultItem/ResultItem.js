import React from 'react';
import classes from './ResultItem.module.css';
import image from './../../../../assets/images/big_bang.jpg';
import ContactIcon from 'react-ionicons/lib/MdContacts';
import CalendarIcon from 'react-ionicons/lib/MdCalendar';

const resultItem = (props) => (
    <a className={classes.ResultItem} href={'#'+props.href}>
        <div className={classes.ResultPoster}><img className={classes.Logo} src={props.imgsrc} alt='item'/></div>
        <div className={classes.SearchMetaData}>
            <div className={classes.MetaTitle}>{props.title}</div>
            <div className={classes.MetaAkaTitle}>{props.akatitle}</div>
            <div className={classes.MetaAdditionalInfo}>
                <div><ContactIcon color='white' fontSize='1.2em'/> Comedy, Drama</div>
                <div><CalendarIcon color='white' fontSize='1.2em'/> 2011</div>
            </div>
        </div>
    </a>
);

export default resultItem;