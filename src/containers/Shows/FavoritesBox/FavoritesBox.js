import React from 'react';
import classes from './FavoritesBox.module.css';
import Favorite from '../FavoritesBox/FavoriteItem/FavoriteItem';
import {connect} from 'react-redux';

const favoritesBox = (props) => {
    let favoritesList = null;
    if (props.favorites && props.configuration){
       
        favoritesList = props.favorites.favorites.map((el, index)=>{
            const totalWatchedEpisodes = props.favorites.countWatchedForShow(el.id);
            return(<Favorite 
                key={el.id + "_"+index} 
                href={el.id} 
                imgsrc={(el.backdrop_path) ? props.configuration.backdropBase+el.backdrop_path : null} 
                title={el.name} 
                // genres={el.genres.map(el=>el.name).join(', ')} 
                // year={el.first_air_date} 
                // selectShow={props.selectShow} 
                id={el.id}
                totalEpisodes={el.number_of_episodes}
                totalWatchedEpisodes={totalWatchedEpisodes}
                />)});
    }
    
    return(<div className={classes.FavoritesBox}>
        <div className={classes.Title}>Favorites</div>
        {favoritesList}
    </div>)
};

const mapStateToProps = (state) => {
    return {
        configuration: state.configuration,
        favorites: state.favorites
    }
}

export default connect(mapStateToProps)(favoritesBox);