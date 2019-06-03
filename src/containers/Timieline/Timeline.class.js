class Timeline {
    constructor() {
    this.timeline = [];
    this.lastUpdateTimestamp = null;
    this.getData();
    }

    setTimeline = (shows)=> {
        if (show) {
            if (typeof show.watched === 'undefined')
                show.watched=[];

            if (this.favorites.length===0 || !this.isFavorite(show.id)){     // jeżeli pusta tablica lub jeżeli element nie istnieje 
                this.favorites.push(show);
            } else {                // usuwanie elementu      
                const index = this.favorites.findIndex(el=> el.id===show.id);
                this.favorites.splice(index,1);
            }               
            this.saveData();
            return show;
        }
        
    }

// addOrRemoveWatched = (showDetails, episodeID) => {
//     if (showDetails && episodeID) {
//         let show = this.favorites.find(el=>el.id===showDetails.id);



//         if (typeof show === 'undefined') {              //jezeli serial nie byl w ogole polubiony
//             show = this.addOrRemoveFavorite(showDetails);
//         }

//         if (this.isWatched(showDetails.id, episodeID)){                 // jezeli istnieje to wywalam go z listy
//             const index = show.watched.findIndex(el=>el===episodeID);
//             show.watched.splice(index,1);
//         } else {                                                // dodanie do listy obejrzanyh
//             if (typeof show.watched === 'undefined')         // tworzenie pustej tablicy obejrzanych, jezeli nie istniala
//             show.watched=[];

//             show.watched.push(episodeID);

//         }
//         this.saveData();
//     }
// }

// markAll=(showDetails,episodeArray,markAllWatched) => {
//     if (showDetails && episodeArray) {
//         let show = this.favorites.find(el=>el.id===showDetails.id);
//             if (typeof show === 'undefined') {              //jezeli serial nie byl w ogole polubiony
//             show = this.addOrRemoveFavorite(showDetails);
//             }
        
        
//             episodeArray.forEach((el)=>{
//                 if (markAllWatched) {
//                     if (!this.isWatched(show.id,el.id)) this.addOrRemoveWatched(showDetails,el.id);
//                 } else {
//                     if (this.isWatched(show.id,el.id)) this.addOrRemoveWatched(showDetails,el.id);
//                 }
//             })
    
//     }
// }

// ifAllWatched = (showID, episodeArray) => {      // zwraca 1 kiedy wszystkie sa zaznaczona, a -1 kiedy wszystkie sa odznaczone. 0 kiedy sa pomieszane
//     if (showID && episodeArray) {
//         const show = this.favorites.find(el=>el.id===showID);
        
//         if (typeof show === 'undefined' || typeof show.watched === 'undefined')
//         return undefined;

//         // let checks = 0;
//         // episodeArray.every(el=>{
//         //     if (show.watched.includes(el.id))
//         //         checks++;
//         // })

//         // if (checks===0)
//         //     return -1
//         // else if (checks === episodeArray.length)
//         //     return 1
//         // else if (checks>0 && checks < episodeArray.length)
//         //     return 0;


//         let result = true;
//         episodeArray.forEach(episode => {
//             const check = show.watched.findIndex(el=>el===episode.id);
//             if (check===-1)
//                 result = false;
//         });
//         return result;
//     }
// }

// getFavorites() {
//     return this.favorites;
// }

// getWatchedForShow = (showID) => {
//     const show = this.favorites.find(el=>el.id===showID);
//     if (typeof show.watched === 'undefined')
//             return 0;

//     return show.watched;
// }

// countWatchedForShow = (showID) => {
//     const watched = this.getWatchedForShow(showID);
//     return watched.length;
// }

// isWatched = (showID, episodeID) =>{
//     if (showID && episodeID) {
//         const show = this.favorites.find(el=>el.id===showID);
        
//         if ((typeof show === 'undefined' || typeof show.watched === 'undefined'))
//             return false
        
//         const index = show.watched.findIndex(el=>el===episodeID);
//         return (index === -1) ? false : true;
//     }
// }

// isFavorite= (id) => {
//     const index = this.favorites.findIndex(el=> el.id===id);
//     return (index === -1) ? false : true;
// }

    getData() {
        const data = JSON.parse(localStorage.getItem("timeline"));
        if (data) {
            this.timeline = data;
        }
    }

    saveData() {
        localStorage.setItem("timeline",JSON.stringify(this.timeline));
    }

}

export default Timeline;