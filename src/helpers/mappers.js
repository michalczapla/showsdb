// MAPOWANIE SERIALU - dane szczegółowe
export const mapShow = show => {
    // SPECYFICZNE WŁAŚCIWOŚCI:
    // numer najniższego sezonu:
    const minSeasonNo = () => {
        if (show.seasons.length!==0) {
            return show.seasons[0].season_number;
        } else {
            return 1;
        }
    };
    // numer najwyższego sezonu
    const maxSeasonNo = () => {
        if (show.seasons.length!==0) {
            return show.seasons[show.seasons.length-1].season_number;
        } else {
            return 0;
        }
    };

    const acceptedShow = {
        backdrop_path: show.backdrop_path,
        episode_run_time: show.episode_run_time,
        first_air_date: show.first_air_date,
        genres: show.genres,
        id: show.id,
        in_production: show.in_production,
        languages: show.languages,
        last_air_date: show.last_air_date,
        name: show.name,
        networks: show.networks,
        number_of_episodes: show.number_of_episodes,
        number_of_seasons: show.number_of_seasons,
        origin_country: show.origin_country,
        original_language: show.original_language,
        original_name: show.original_name,
        overview: show.overview,
        poster_path: show.poster_path,
        production_companies: show.production_companies,
        seasons: show.seasons,
        vote_average: show.vote_average,
        vote_count: show.vote_count,

        //PONIŻEJ SPECYFICZNE WŁAŚCIWOŚCI:
        // numer najniższego sezonu:
        min_season_no: minSeasonNo(),
        max_season_no: maxSeasonNo()
    }

    return acceptedShow;
};

//MAPOWANIE LISTY ODCINKÓW SEZONU
export const mapSeason = (season) => {
    if (season) {
        const acceptesShowsArray = [];
        for (let show of season) {
            acceptesShowsArray.push(mapSeasonShow(show));
        }
        return acceptesShowsArray;
    }
};


// MAPOWANIE ODCINKA DLA SEZONU
const mapSeasonShow = (show) => {

    const acceptedShow = {
        air_date: new Date(show.air_date),
        crew: show.crew,
        episode_number: show.episode_number,
        guest_stars: show.guest_stars,
        id: show.id,
        name: show.name,
        overview: show.overview,
        production_code: show.production_code,
        season_number: show.season_number,
        show_id: show.show_id,
        still_path: show.still_path,
        vote_average: show.vote_average,
        vote_count: show.vote_count

    };

    return acceptedShow;
};

//MAPOWANIE LISTY REKOMENDACJI
export const mapRecommendations = (recommendations) => {
    if (recommendations) {
        const acceptesRecommArray = [];
        for (let recomm of recommendations) {
            acceptesRecommArray.push(mapRecommendation(recomm));
        }
        return acceptesRecommArray;
    }
};
// MApowanie pojedynczego wyniku rekomendacji
const mapRecommendation = (recomm) => {
    const acceptedRecomm = {
        backdrop_path: recomm.backdrop_path,
        first_air_date: recomm.first_air_date,
        genre_ids: recomm.genre_ids,
        id: recomm.id,
        name: recomm.name,
        origin_country: recomm.origin_country,
        original_language: recomm.original_language,
        original_name: recomm.original_name,
        overview: recomm.overview,
        poster_path: recomm.poster_path,
        vote_average: recomm.vote_average,
        vote_count: recomm.vote_count,
        networks: recomm.networks,
        popularity: recomm.popularity
    };

    return acceptedRecomm;
}

//Mapowanie lisy polecanych z tygodnia (landing page)
export const mapTrendings = (trending) => {
    if (trending) {
        const acceptedTrendingArray = [];
        for (let trend of trending) {
            acceptedTrendingArray.push(mapTrend(trend));
        }
        return acceptedTrendingArray;
    }
}

const mapTrend = (trend) => {
    const acceptedTrend ={
        original_name: trend.original_name,
        id: trend.id,
        name: trend.name,
        vote_count: trend.vote_count,
        vote_average: trend.vote_average,
        first_air_date: trend.first_air_date,
        poster_path: trend.poster_path,
        genre_ids: trend.genre_ids,
        original_language: trend.original_language,
        backdrop_path: trend.backdrop_path,
        overview: trend.overview,
        origin_country: trend.origin_country,
        popularity: trend.popularity
    }
    return acceptedTrend;
}

//Mapowanie listy sciaganych mediaow dla serialu - obsluga tylko YOUTUBE
export const mapMediaMovies = (movies) => {
    if (movies) {
        const acceptedMoviesArray = [];
        for (let movie of movies) {
            if (movie.site==="YouTube") {
                acceptedMoviesArray.push(mapMediaMovie(movie));
            }
        }
        return acceptedMoviesArray;
    }
}

const mapMediaMovie = (movie) => {
    const acceptedMovie ={
        id: movie.id,
        iso_639_1: movie.iso_639_1,
        iso_3166_1: movie.iso_3166_1,
        key: movie.key,
        name: movie.name,
        site: movie.site,
        size: movie.size,
        type: movie.type
    }
    return acceptedMovie;
}