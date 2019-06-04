import * as ActionTypes from './actions';
import Favorite from '../containers/Shows/FavoritesBox/Favorite.class';

const initialState = {
    currentShowID: null,
    favorites: new Favorite(),
    configuration: null
}



const reducer = (state=initialState, action) => {

     const favorites = {...state.favorites}     //kopiowanie obiektu, na którym będzimy wykonywać operacje

    switch (action.type) {
        // Dodanie lub usunięcie odcinka jako ulubionego
        case ActionTypes.ADD_OR_REMOVE_FAVORITE:
            favorites.addOrRemoveFavorite(action.newFavorite);
            // console.log(action.newFavorite);
            // console.log(state.favorites);
            return {
                ...state,
                favorites: favorites
            }
        // ustawienie konfiguracji (TMDB - ścięzki do plików obrazków) 
        case ActionTypes.SET_CONFIGURATION:
                return {
                    ...state,
                    configuration: action.configuration
                }
        // Dodanie lub usunięcie odcinka z obejrzanych
        case ActionTypes.ADD_OR_REMOVE_WATCHED_EPISODE:
            favorites.addOrRemoveWatched(action.show.show, action.show.episodeID);
            return {
                ...state,
                favorites: favorites
            }
        // usatwienie aktualnego odcinka (główny odcinek wyświetlany w szczegółach)
        case ActionTypes.SET_CURRENT_SHOW_ID:
            return {
                ...state,
                currentShowID: action.currentShowID
            }
        // zaznaczenie wszystkich odcinków jako obejrzanych
        case ActionTypes.MARK_ALL_EPISODE_WATCHED:
            favorites.markAll(action.show.show, action.show.episodesArray, action.show.markAllWatched);
            return {
                ...state,
                favorites: favorites
            }
        //dodanie odcinków do serialu
        case ActionTypes.ADD_EPISODES_TO_SHOW:
            favorites.addEpisodesToShow(action.show.showID, action.show.episodes);
            return {
                ...state,
                favorites: favorites
            }
        default:
        return state;   
    }  
}

export default reducer;