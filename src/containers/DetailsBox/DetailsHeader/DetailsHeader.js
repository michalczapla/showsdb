import React from 'react';
import classes from './DetailsHeader.module.css';
import FavoriteEmpty from 'react-ionicons/lib/MdStarOutline';
import FavoriteFilled from 'react-ionicons/lib/MdStar';


// import dumbheader from '../../../assets/images/backdrop.jpg';
// import dumbnetwork from '../../../assets/images/netflix.png';

const detailsHeader = (props) => (
    <div className={classes.DetailsHeader}>
    {(props.currentShow.backdrop_path) ? 
        <img className={classes.BackgroungImg} src={props.imageBasePath+props.currentShow.backdrop_path} alt={props.currentShow.name} title={props.currentShow.name}/>
    : null}
    <div className={classes.Title}>
        <div className={classes.NetworkLogoContainer}>
        {props.currentShow.networks.map(el=>(<img key={el.id} className={classes.NetworkLogo} src={props.imageBasePath+el.logo_path} alt={el.name} title={el.name}/>))}
       </div>
        <div className={classes.Text}>{props.currentShow.name}</div>
        <div className={classes.Icon} onClick={props.updateFavorites}>
        {props.isFavorite ? <FavoriteFilled color='white' fontSize='2em'/> : <FavoriteEmpty color='white' fontSize='2em'/>}
        </div>
    </div>
    </div>
);

export default detailsHeader;