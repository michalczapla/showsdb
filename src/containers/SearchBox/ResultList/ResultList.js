import React from 'react';
import classes from './ResultList.module.css';
import ResultItem from './ResultItem/ResultItem';
import GenreMapper from './../../../helpers/genre-mapper';


const resultList = (props) => (
    <div classes={classes.ResultList}>
        {props.results.map(el=>(
                     <ResultItem key={el.id} href={el.id} imgsrc={(el.poster_path) ? props.configuration.imagesBase+el.poster_path : null} title={el.name} akatitle={el.original_name} genres={GenreMapper(props.configuration.genreList, el.genre_ids)} year={el.first_air_date}/>
        ))}
    </div>    
);

export default resultList;