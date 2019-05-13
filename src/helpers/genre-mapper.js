const mapGenre = (list, ids)=>{
// Object.keys(list).findIndex(id =>)
    const genreNames = [];    
    ids.forEach(element => {
        const genre = list.find(el=>el.id===element);
        if (genre && (typeof genre !== 'undefinded')) genreNames.push(genre.name);
        
    });
    return genreNames.join(', ');
};

export default mapGenre;