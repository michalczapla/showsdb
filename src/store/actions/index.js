export {
    fetchConfiguration
} from './configuration';

export {
    setCurrentShowID,
    fetchCurrentShow
} from './currentShow';

export {
    updateFavorites,
    fetchEpisodesForSeason,
    updateAllWatchedEpisodes,
    updateWatched,
    getFavoritesFromCloud,
    saveFavoritesToCloud
} from './favorites';

export {
    auth,
    getLoginDataFromLocalStorage,
    authLogout
} from './auth';