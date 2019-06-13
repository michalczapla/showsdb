import * as ActionTypes from './actionTypes';
import axios from '../../helpers/axios-external';
import api_key from '../../helpers/APIKey';
// import * as Mapper from '../../helpers/mappers';

export const updateFavorites = (show) => {
    return {
        type: ActionTypes.ADD_OR_REMOVE_FAVORITE,
        newFavorite: show
    }
}

const saveEpisodesInSeason = (episodes) =>{
    return {
        type: ActionTypes.SET_EPISODES_IN_SEASON,
        episodes: episodes
    }
}

export const fetchEpisodesForSeason = (showID, seasonID) => {
    return async dispatch => {
        let episodes = null;
        if (showID!==null && seasonID !==null) {
            const details_request_url = `https://api.themoviedb.org/3/tv/${showID}/season/${seasonID}?api_key=${api_key}`;
            const response = await axios(details_request_url);
            if (typeof response !== 'undefined') {
                episodes = response.data.episodes;
            } else {
                episodes=null;
            }
        };
        dispatch(saveEpisodesInSeason(episodes));
    }
}

export const updateAllWatchedEpisodes = (show, episodesArray, markAllWatched) => {
    return {
        type: ActionTypes.MARK_ALL_EPISODE_WATCHED,
        show: { show:show, 
                episodesArray: episodesArray, 
                markAllWatched: markAllWatched}
    }
}

export const updateWatched = (show, episodeID) => {
    return {
        type:  ActionTypes.ADD_OR_REMOVE_WATCHED_EPISODE,
        show: {show: show, episodeID: episodeID}
    }
}