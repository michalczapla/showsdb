import React from 'react';
import classes from './SeasonsPagination.module.css';
import properDigitNumber from '../../../../../helpers/proper-digit-number';
import {connect} from 'react-redux';

const seasonsPagination = (props) => (
    <div className={classes.SeasonsPagination}>
        {props.seasons.map(el=>{
            const linkName=(el.season_number===0) ? el.name : "S"+properDigitNumber(el.season_number);
            const active = (el.season_number === props.activeSeasonID) ? classes.active : null;
            return(<button key={el.id} className={[classes.Button, active].join(' ')} title={el.name} onClick={() => props.setActiveSeason(el.season_number)}>{linkName}</button>)
        })}
    </div>
);

const mapStateToProps = state => {
    return {
        seasons: state.currentShow.seasons
    }
  }

export default connect(mapStateToProps)(seasonsPagination);