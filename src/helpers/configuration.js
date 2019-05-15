import api_key from './APIKey';
import axios from './axios-external';

const configuration = async () => {
    const image_conf_url = `https://api.themoviedb.org/3/configuration?api_key=${api_key}`;
    const genre_conf_url = `https://api.themoviedb.org/3/genre/tv/list?api_key=${api_key}&language=en-US`;
    try {
        const resultImageConf = await axios(image_conf_url);
        const images_base_url = resultImageConf.data.images.base_url + 'w92'; //wybrany rozmiar obrazkow do wynikow wyszukiwania   
        const backdrop_base_url = resultImageConf.data.images.base_url + 'w780'; //wybrany rozmiar obrazkow do tła szczegółow i logo sieci
        const still_base_url = resultImageConf.data.images.base_url + 'w300'; //wybrany rozmiar obrazkow do podglądu odcinka  

        const resultGenreConf = await axios(genre_conf_url);        // lista mozliwych typow seriali
        const resultGenres = resultGenreConf.data.genres;
  
        return {
            imagesBase: images_base_url,
            genreList: resultGenres,
            backdropBase: backdrop_base_url,
            stillBase: still_base_url
        }
    

    } catch (exception) {
        console.log(exception);
    }
}

export default configuration;