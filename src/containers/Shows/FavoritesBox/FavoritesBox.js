import React , {useEffect, useState} from 'react';
import classes from './FavoritesBox.module.css';
import Favorite from '../FavoritesBox/FavoriteItem/FavoriteItem';
import {connect} from 'react-redux';
import * as ActionCreator from '../../../store/actions/index';
import axios from '../../../helpers/axios-firebase';

const FavoritesBox = (props) => {
    
    const [saving, setSaving] = useState(false);

    const saveFavoritesToCloud = (favorites, localId, token) => {
        console.log('Saving favorites to cloud');
        // console.log(favorites);
        axios.put('https://showsdb-787d1.firebaseio.com/'+localId+'.json?auth='+token, favorites)
        .then(response=>{
            // console.log(response.data);
        })
        .catch(err=>{
            console.log(err);
        })
    }

    const getFavoritesFromCloud = () => {
        // console.log('Getting favorites from cloud');
    }


    useEffect(()=>{
        
       if (props.localId && props.favorites) {
            setSaving(true);

           saveFavoritesToCloud(props.favorites, props.localId, props.token);

            setSaving(false)
        } 
    },[props.favorites, props.localId]);
    
    let favoritesList = null;
    if (props.favorites.favorites && props.configuration){
       
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
        configuration: state.main.configuration,
        favorites: state.main.favorites,
        localId: state.auth.localId,
        token: state.auth.token
    }
}

// const mapDispatchToProps = (dispatch) => {
//     return {
//         saveFavoritesToCloud: dispatch()
//     }
// }
export default connect(mapStateToProps)(FavoritesBox);