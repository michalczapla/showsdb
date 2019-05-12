import React from 'react';
import classes from './ResultList.module.css';
import ResultItem from './ResultItem/ResultItem';



const resultList = (props) => (
    <div classes={classes.ResultList}>
        {props.results.map(el=>(
                     <ResultItem key={el.id} href={el.id} imgsrc={props.configuration.imagesBase+el.poster_path} title={el.name} akatitle={el.original_name} />
        ))}
    </div>    
);

export default resultList;