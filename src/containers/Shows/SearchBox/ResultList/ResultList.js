import React from 'react';
import classes from './ResultList.module.css';
import ResultItem from './ResultItem/ResultItem';
import GenreMapper from '../../../../helpers/genre-mapper';
import {connect} from 'react-redux';


const resultList = (props) => {
    const results = props.results.slice(props.from, props.to);
    return (
    <div classes={classes.ResultList}>
        {results.map((el,index)=>(
                     <ResultItem key={el.id + index} href={el.id} imgsrc={(el.poster_path) ? props.configuration.imagesBase+el.poster_path : null} title={el.name} akatitle={el.original_name} genres={GenreMapper(props.configuration.genreList, el.genre_ids)} year={el.first_air_date} id={el.id}/>
        ))}
    </div>    
    )
};

const mapStateToProps = (state) => {
    return {
        configuration: state.main.configuration
    }
}

export default connect(mapStateToProps)(resultList);