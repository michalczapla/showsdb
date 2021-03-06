import React from 'react';
import classes from './ResultItem.module.css';
import ContactIcon from 'react-ionicons/lib/MdContacts';
import CalendarIcon from 'react-ionicons/lib/MdCalendar';
import NoPicture from '../../../../../assets/images/cancel.png';
import {connect} from 'react-redux';
import * as ActionCreator from '../../../../../store/actions/index';
import {Link} from 'react-router-dom';

const resultItem = (props) => (
    <Link to={'/'+props.id}>
        <div className={classes.ResultItem} onClick={()=>props.setCurrentShowID(props.id)}>
            <div className={classes.ResultPoster}>
                <img className={classes.Logo} src={(props.imgsrc) ? props.imgsrc : NoPicture} alt={props.title}/>
            </div>
            <div className={classes.SearchMetaData}>
                <div className={classes.MetaTitle}>{props.title}</div>
                <div className={classes.MetaAkaTitle}>{props.akatitle}</div>
                <div className={classes.MetaAdditionalInfo}>
                    {(props.genres) ? <div><ContactIcon color='white' fontSize='1.2em'/> {props.genres}</div> : null}
                    {(props.year) ? <div><CalendarIcon color='white' fontSize='1.2em'/> {props.year.split('-')[0]}</div> : null}
                </div>
            </div>
        </div>
    </Link>
);

const mapDispatchToProps = (dispatch) => {
    return {
        setCurrentShowID: (id) => dispatch(ActionCreator.setCurrentShowID(id))
    }
}

export default connect(null, mapDispatchToProps)(resultItem);