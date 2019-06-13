import React, {useState, useEffect} from 'react';
import classes from './RecommendationBox.module.css';
import {connect} from 'react-redux';
import api_key from '../../../../helpers/APIKey';
import axios from '../../../../helpers/axios-external';
import * as Mapper from '../../../../helpers/mappers';
import Loader from '../../../../components/UI/Loading/Loading';

const RecommendationBox =(props)=> {
    const [loading, setLoading] = useState(false);
    const [recommendations, setRecommendations] = useState(null);

    const getRecommendations = async (id) => {
        setLoading(true);
        
        if (id!==null) {
            const details_request_url = `https://api.themoviedb.org/3/tv/${id}/recommendations?api_key=${api_key}&language=en-US&page=1`;
            const response = await axios(details_request_url);
            if (typeof response !== 'undefined') {
                setRecommendations(Mapper.mapRecommendations(response.data.results));
            } else {
                setRecommendations(null);
            }
        };

        setLoading(false);
    }

    useEffect(()=>{
        getRecommendations(props.currentShowID);
    },[props.currentShowID]);


    let response = null;
    if (loading) {
        response = <Loader />
    } else {
        response =
            (<div className={classes.RecommendationBox}>
                <div className={classes.RecommendationCarousel}>
                    {recommendations!==null ? recommendations.map((el)=>(
                        <div>{el.name}</div>
                    )) : null}
                </div>
                <div className={classes.RecommendationDescription}>
    
                </div>
            </div>)
    }

    return (response);

};

const mapStateToProps = (state) => {
    return {
        currentShowID: state.currentShowID
    }
}
export default connect(mapStateToProps)(RecommendationBox);