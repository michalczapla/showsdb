export {
    fetchConfiguration
} from './configuration';

export {
    setCurrentShowID,
    fetchCurrentShow,
    clearCurrentShowData
} from './currentShow';

export {
    updateFavorites,
    fetchEpisodesForSeason,
    updateAllWatchedEpisodes,
    updateWatched,
    clearFavorites,
    saveFavoritesToCloud
} from './favorites';

export {
    auth,
    getLoginDataFromLocalStorage,
    authLogout,
    changePassword,
    clearChangePass
} from './auth';