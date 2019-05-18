import React from 'react';
import classes from './FavoritesBox.module.css';
import Favorite from './../SearchBox/ResultList/ResultItem/ResultItem';
import GenreMapper from './../../helpers/genre-mapper';

const favoritesBox = (props) => {
    let favoritesList = null;
    if (props.favorites && props.configuration){
        favoritesList = props.favorites.favorites.map((el, index)=>{
            return(<Favorite 
                key={el.id + index} 
                href={el.id} 
                imgsrc={(el.poster_path) ? props.configuration.imagesBase+el.poster_path : null} 
                title={el.name} 
                akatitle={el.original_name} 
                genres={el.genres.map(el=>el.name).join(', ')} 
                year={el.first_air_date} 
                selectShow={props.selectShow} 
                id={el.id}/>)});
    }
    
    return(<div className={classes.FavoritesBox}>
        <div className={classes.Title}>Favorites</div>
        {favoritesList}
    </div>)
};

export default favoritesBox;