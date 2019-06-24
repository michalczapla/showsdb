import React from 'react';
import classes from './DetailsHeader.module.css';
import FavoriteEmpty from 'react-ionicons/lib/MdStarOutline';
import FavoriteFilled from 'react-ionicons/lib/MdStar';
import {connect} from 'react-redux';
import * as ActionCreator from '../../../../store/actions/index';

// import dumbheader from '../../../assets/images/backdrop.jpg';
// import dumbnetwork from '../../../assets/images/netflix.png';

const detailsHeader = (props) => {

    let isFavorite = false;
    if (props.favorites) {
        isFavorite = props.favorites.isFavorite(props.currentShowID);
    }

    return (
    <div className={classes.DetailsHeader}>
    {(props.currentShow.backdrop_path) ? 
        <img className={classes.BackgroungImg} src={props.configuration.backdropBase+props.currentShow.backdrop_path} alt={props.currentShow.name} title={props.currentShow.name}/>
    : null}
    <div className={classes.Title}>
        <div className={classes.NetworkLogoContainer}>
        {props.currentShow.networks.map(el=>(<img key={el.id} className={classes.NetworkLogo} src={props.configuration.backdropBase+el.logo_path} alt={el.name} title={el.name}/>))}
       </div>
        <div className={classes.Text}>{props.currentShow.name}</div>
        <div className={classes.Icon} onClick={()=>props.updateFavorites(props.currentShow)}>
        {isFavorite ? <FavoriteFilled color='white' fontSize='2em'/> : <FavoriteEmpty color='white' fontSize='2em'/>}
        </div>
    </div>
    </div>
    )
};


const mapStateToProps = (state) => {
    return {
        currentShow: state.main.currentShow,
        currentShowID: state.main.currentShowID,
        configuration: state.main.configuration,
        favorites: state.main.favorites
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateFavorites: (show) => dispatch(ActionCreator.updateFavorites(show))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(detailsHeader);