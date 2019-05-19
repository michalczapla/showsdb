class Favorite {
    constructor() {
    this.favorites = [];
    this.getData();
}
addOrRemoveFavorite = (show)=> {
    if (show) {
        if (show.watched===null || typeof show.watched === 'undefined')
            show.watched=[];

        if (this.favorites.length===0 || !this.isFavorite(show.id)){     // jeżeli pusta tablica lub jeżeli element nie istnieje 
            this.favorites.push(show);
        } else {                // usuwanie elementu      
            const index = this.favorites.findIndex(el=> el.id===show.id);
            this.favorites.splice(index,1);
        }               

    }
    this.saveData();
}

addOrRemoveWatched = (showID, episodeID) => {
    if (showID && episodeID) {
        const show = this.favorites.find(el=>el.id===showID);

        if (this.isWatched(showID, episodeID)){                 // jezeli istnieje to wywalam go z listy
            const index = show.watched.findIndex(el=>el===episodeID);
            show.watched.splice(index,1);
        } else {                                                // dodanie do listy obejrzanyh
            if (show.watched===null || typeof show.watched === 'undefined')         // tworzenie pustej tablicy obejrzanych, jezeli nie istniala
            show.watched=[];

            show.watched.push(episodeID);

        }
        this.saveData();
    }
}



getFavorites() {
    return this.favorites;
}

getWatchedForShow = (showID) => {
    const show = this.favorites.find(el=>el.id===showID);
    if (show.watched===null || typeof show.watched === 'undefined')
            return 0;

    return show.watched;
}

countWatchedForShow = (showID) => {
    const watched = this.getWatchedForShow(showID);
    return watched.length;
}

isWatched = (showID, episodeID) =>{
    if (showID && episodeID) {
        const show = this.favorites.find(el=>el.id===showID);
        
        if (show.watched===null || typeof show.watched === 'undefined')
            return false
        
        const index = show.watched.findIndex(el=>el===episodeID);
        return (index === -1) ? false : true;
    }
}

isFavorite= (id) => {
    const index = this.favorites.findIndex(el=> el.id===id);
    return (index === -1) ? false : true;
}

getData() {
    const data = JSON.parse(localStorage.getItem("favorites"));
    if (data) {
        this.favorites = data;
    }
}

saveData() {
    localStorage.setItem("favorites",JSON.stringify(this.favorites));
}

}

export default Favorite;