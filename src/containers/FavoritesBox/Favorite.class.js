class Favorite {
    constructor() {
    this.favorites = [];
    this.getData();
}
addOrRemoveFavorite = (show)=> {
    if (show) {
        if (this.favorites.length===0 || !this.isFavorite(show.id)){     // jeżeli pusta tablica lub jeżeli element nie istnieje 
            this.favorites.push(show);
        } else {                // usuwanie elementu      
            const index = this.favorites.findIndex(el=> el.id===show.id);
            this.favorites.splice(index,1);
        }               

    }
    localStorage.setItem("favorites",JSON.stringify(this.favorites));
}

getFavorites() {
    return this.favorites;
}

isFavorite= (id) => {
    const index = this.favorites.findIndex(el=> el.id===id);
    if (index === -1)
        return false;
        else
    return true;
}

getData() {
    const data = JSON.parse(localStorage.getItem("favorites"));
    if (data) {
        this.favorites = data;
    }
}

}

export default Favorite;