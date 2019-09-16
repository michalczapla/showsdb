import React from 'react';
import classes from './DetailsMeta.module.css';
import MetaInfoList from './MetaInfoList/MetaInfoList';
import ReactCountryFlag from 'react-country-flag';
import {connect} from 'react-redux';
import {limitWords} from '../../../../helpers/limitWords';

// HELPERS
import genreMapper from '../../../../helpers/genre-mapper';

const detailsMeta =(props) => {

        const genreList = ()=> {
            const genres = [];
            props.currentShow.genres.map(el=>(genres.push(el.id)));
            return genres;
        }
        const countryFlags = (list) =>{
            const flags = [];
            list.map(flag=>(flags.push(<ReactCountryFlag key={flag} code={flag} svg/>)));
            return flags;
        }
        const avgRunTime = (list) => {
            let sum=0;
            list.forEach(el => {
                sum+=el;
            });
            return (list.length!==0) ? Math.floor(sum/list.length) : '-';
        }
        const meta = [
            {title: 'genres', information: limitWords(genreMapper(props.genres, genreList()), 2)},   //genreMapper(props.genres,props.currentShow.genres)
            {title: 'country', information: countryFlags(props.currentShow.origin_country)},
            {title: 'vote', information: props.currentShow.vote_average+' ('+props.currentShow.vote_count+')'},
            {title: 'first air date', information: props.currentShow.first_air_date},
            {title: 'last air date', information: props.currentShow.last_air_date},
            {title: 'in production', information: (props.currentShow.in_production) ? 'yes' : 'no'},
            {title: 'episodes', information: props.currentShow.number_of_episodes},
            {title: 'seasons', information: props.currentShow.number_of_seasons},
            {title: 'espisode run time', information: avgRunTime(props.currentShow.episode_run_time) +' min'},
        ]

        return (
            <div className={classes.DetailsMeta}>
                <div className={classes.MetaDescription}>
                {(props.currentShow.overview==='') ? 'No description available' : props.currentShow.overview}
                </div>
                <div className={classes.MetaData}>
                   <MetaInfoList metaData={meta.slice(0,3)} />
                   <MetaInfoList metaData={meta.slice(3,6)} />
                   <MetaInfoList metaData={meta.slice(6,9)} />
                </div>  
            </div>
        );
};

const mapStateToProps = (state) => {
    return {
        genres: state.main.configuration.genreList,
        currentShow: state.main.currentShow
    }
}

export default connect(mapStateToProps)(detailsMeta);