import * as ActionTypes from './actions/actionTypes'
import Favorite from '../containers/Shows/FavoritesBox/Favorite.class';


const initialState = {
    currentShowID: null,
    currentShow: null,
    episodesInSeason: null,
    favorites: new Favorite(),
    configuration: null
}



const reducer = (state=initialState, action) => {

     const favorites = {...state.favorites}     //kopiowanie obiektu, na którym będzimy wykonywać operacje

    switch (action.type) {
        // Dodanie lub usunięcie serialu jako ulubionego
        case ActionTypes.ADD_OR_REMOVE_FAVORITE:
            favorites.lastUpdate = 0;    
            favorites.addOrRemoveFavorite(action.newFavorite);
            return {
                ...state,
                favorites: favorites
            }
        //zamiana ulubioych pobranymi z RESTapi
        case ActionTypes.REPLACE_FAVORITES:
        favorites.replaceFavorites(action.favorites);    
        // console.log('reducer');
        // console.log(action.favorites);
        // console.log(favorites.favorites);
        return {
                ...state,
                favorites: favorites
            }
        //wyczyszczenie listy uubionych
        case ActionTypes.CLEAR_FAVORITES:
            favorites.lastUpdate = 0;  
            favorites.clearFavorites();
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
                favorites.lastUpdate = 0; //powoduje iz za kazdym nacisnieciem opcji wymusi odswiezenie TIMELINE  
            favorites.addOrRemoveWatched(action.show.show, action.show.episodeID);
            return {
                ...state,
                favorites: favorites
            }
        // usatwienie aktualnego odcinka (główny odcinek wyświetlany w szczegółach)
        case ActionTypes.SET_CURRENT_SHOW_ID:
                return {
                    ...state,
                    currentShowID: action.id,
                    episodesInSeason: null      //czyści pobrane odcinki w wyświetlonym sezonie
                }
            
        // zaznaczenie wszystkich odcinków jako obejrzanych
        case ActionTypes.MARK_ALL_EPISODE_WATCHED:
                favorites.lastUpdate = 0;   //powoduje iz za kazdym nacisnieciem opcji wymusi odswiezenie TIMELINE 
            favorites.markAll(action.show.show, action.show.episodesArray, action.show.markAllWatched);
            return {
                ...state,
                favorites: favorites
            }
        //dodanie wszystkich odcinków do serialu (Timeline)
        case ActionTypes.ADD_EPISODES_TO_SHOW:
                favorites.lastUpdate = new Date();    
            favorites.addEpisodesToShow(action.show.showID, action.show.episodes);
            return {
                ...state,
                favorites: favorites
            }
        // zapisanie szczegółów aktualnie przeglądanego serialu
        // case ActionTypes.SET_CURRENT_SHOW_ID:
        case ActionTypes.SET_CURRENT_SHOW:
            // const currentShowID = (action.currentShow===null) ? null : (action.id) ? action.id : state.currentShowID; //jezeli nie zostana pobrane dane serialu, rowniez ID wyswietlanego serialu musi pozostac puste
            const currentShowID = (action.currentShow===null) ? null : state.currentShowID; //jezeli nie zostana pobrane dane serialu, rowniez ID wyswietlanego serialu musi pozostac puste
            // if (state.currentShowID!==null) {
                return {
                    ...state,
                    currentShow: action.show,
                    currentShowID: currentShowID
                }
            // } 
            // else {
            //     return {
            //         ...state
            //     }
            // }
      
        //zapisanie listy odcinków z przeglądanego sezonu
        case ActionTypes.SET_EPISODES_IN_SEASON:
            return {
                ...state,
                episodesInSeason: action.episodes
            }
        case ActionTypes.SAVE_FAVORITES_TO_CLOUD:
            return {
                ...state
            }
        case ActionTypes.CLEAR_CURRENT_SHOW_DATA:
            return {
                ...state,
                currentShow: null,
                currentShowID: null
            }
        default:
        return state;   
    }  
    
}

export default reducer;