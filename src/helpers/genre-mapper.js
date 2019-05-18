const mapGenre = (list, ids)=>{
// Object.keys(list).findIndex(id =>)
    const genreNames = [];   
    if (ids!==null && typeof ids !=='undefined') 
    ids.forEach(element => {
        const genre = list.find(el=>el.id===element);
        if (genre && (typeof genre !== 'undefined')) genreNames.push(genre.name);
        
    });
    return genreNames.join(', ');
};

export default mapGenre;