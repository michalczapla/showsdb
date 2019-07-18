import React, {useEffect, useState} from 'react';
import classes from './LandingPage.module.css';
import VersionHistory from './../../version.info.json';
import TrendBox from './TrendBox/TrendBox';
import api_key from '../../helpers/APIKey';
import axios from '../../helpers/axios-external';
import * as Mapper from '../../helpers/mappers';
import Loader from '../UI/Loading/Loading';
import {connect} from 'react-redux';


const LandingPage = (props) => {
    const [trending, setTrending] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        if (trending===null && props.configuration!==null) {
            getData();
        }
    },[props.configuration, trending]);

    const getData = async ()=> {
        setLoading(true);
        
        const details_request_url = `https://api.themoviedb.org/3/trending/tv/week?api_key=${api_key}`;
        const response = await axios(details_request_url);
        if (typeof response !== 'undefined') {
            setTrending(Mapper.mapTrendings(response.data.results));
            console.log(response.data.results);
        } else {
            setTrending(null);
        }

        setLoading(false);
    };

    const renderTrendings = () => {
        let trendingsComponents=null;

        if (!loading && trending) {
            trendingsComponents = trending.map(el=>(
                <TrendBox key={el.id} show={el} configuration={props.configuration}/>
            ));
        } else if (loading) {
            trendingsComponents=<Loader />;
        }

        return trendingsComponents;

    }

    return (
    <div className={classes.LandingPage}>
        <h1>Weekly trending</h1>
     
        <div className={classes.TrendingsContainer}>
            {renderTrendings()}
        </div>
        
        <hr/>
        <ul>{VersionHistory.todo.map((el,index)=>(<li key={el+'_'+index}>{el}</li>))}</ul>
        <hr />
        <ul>{VersionHistory.errors.map((el,index)=>(<li key={el+'_'+index}>{el}</li>))}</ul>
        <hr />
        <ul>{VersionHistory.done.map((el,index)=>(<li key={el+'_'+index}>{el}</li>))}</ul>
        <hr />
    </div>
    )
    
};

const mapStateToProps = state => {
    return {
        configuration: state.main.configuration
    }
}


export default connect(mapStateToProps)(LandingPage);