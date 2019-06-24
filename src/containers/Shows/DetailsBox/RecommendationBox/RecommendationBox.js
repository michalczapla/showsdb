import React, {useState, useEffect} from 'react';
import classes from './RecommendationBox.module.css';
import {connect} from 'react-redux';
import api_key from '../../../../helpers/APIKey';
import axios from '../../../../helpers/axios-external';
import * as Mapper from '../../../../helpers/mappers';
import Loader from '../../../../components/UI/Loading/Loading';
import ShowSummary from '../../../Timieline/TimelineBuilder/Event/ShowSummary/ShowSummary';
import GenreMapper from '../../../../helpers/genre-mapper';
import * as ActionCreator from '../../../../store/actions/index';
import ArrowRight from 'react-ionicons/lib/MdArrowDropright';
import ArrowLeft from 'react-ionicons/lib/MdArrowDropleft';
import {Link} from 'react-router-dom';
import ReactCountryFlag from 'react-country-flag';

const RecommendationBox =(props)=> {
    const [loading, setLoading] = useState(false);
    const [recommendations, setRecommendations] = useState(null);
    const [selectedRecommendation, setSelectedRecommendation] = useState({description: null, vote: null, id: -1, origin_country:null, genre_ids: null});
    const [pagination, setPagination] = useState({actualPage:1, from:0, to:5});

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

    const onMouseOverHandler = (description, vote, id, origin_country, genre_ids) => {
        const selected = {
            description: description, 
            vote: vote,
            id: id,
            origin_country: origin_country,
            genre_ids: genre_ids
        }
        setSelectedRecommendation(selected);
    }

    const changePage = (vector) => {
        const resultsNo = recommendations.length;
        let actualPage = pagination.actualPage;
        const maxPage = Math.ceil(resultsNo / 5);
        switch (vector) {
            case 'left':
                if (actualPage===1) {
                    actualPage = maxPage;
                } else {
                    actualPage--;
                }
                break;
            case 'right':
                if (actualPage===maxPage) {
                    actualPage=1;
                } else {
                    actualPage++;
                }
                break;
            default:
                break;
        }
        //1: from:0 to: 5
        //2: from:5 to: 10
        //3: from 10 to:15
        //4: from 15 to:20
        //default from:(actualPage-1)*5 to:5*actualPage
        const from = Math.round((actualPage-1)*5);
        const to= Math.round(actualPage*5);
        setPagination({
            actualPage:actualPage, from:from, to:to
        })
    }

    const countryFlags = (list) =>{
        const flags = [];
        list.map(flag=>(flags.push(<ReactCountryFlag key={flag} code={flag} svg/>)));
        return flags;
    }

    let response = null;
    if (loading) {
        response = <Loader />
    } else if (recommendations && recommendations.length>0) {
        response =
            (<div className={classes.RecommendationBox}>
                <div className={classes.RecommendationHeader}>Recommendations</div>
                <div className={classes.RecommendationCarouselContainer}>
                    <div className={classes.RecommendationPagination} onClick={()=>changePage('left')}><div className={classes.arrow}><ArrowLeft color={'white'}/></div></div>
                    <div className={classes.RecommendationCarousel}>
                        
                        {recommendations!==null ? recommendations.slice(pagination.from,pagination.to).map((el,index)=>(
                            <div key={el.id + '_'+index} className={[classes.RecommendationItem,(el.id===selectedRecommendation.id) ? classes.active : null].join(' ')} title={el.name}><Link to={'/'+el.id}><ShowSummary  data={el} info={'rating: '+el.vote_average}
                            mouseover={()=>onMouseOverHandler(el.overview,el.vote_average, el.id, el.origin_country, el.genre_ids)} click={()=>props.setCurrentShowID(el.id)}/></Link></div>
                        )) : null}
                    
                    </div>
                    <div className={classes.RecommendationPagination} onClick={()=>changePage('right')}><div className={classes.arrow}><ArrowRight color={'white'}/></div></div>
                </div>
                {(selectedRecommendation.description) ?
                <div className={classes.RecommendationDescription}>
                        <p className={classes.RecommendationDescription}>{selectedRecommendation.description}</p>
                        <div className={classes.RecommendationFooter}>
                            <p className={classes.RecommendationVote}>{selectedRecommendation.vote}</p>
                            <p className={classes.RecommendationFlags}>{countryFlags(selectedRecommendation.origin_country)}</p>
                            <p className={classes.RecommendationGenres}>{GenreMapper(props.configuration.genreList, selectedRecommendation.genre_ids)}</p>
                        </div>
                </div> : null}
            </div>)
    } else {
        response = null;
    }

    return (response);

};

const mapStateToProps = (state) => {
    return {
        currentShowID: state.main.currentShowID,
        configuration: state.main.configuration
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setCurrentShowID: (id) => dispatch(ActionCreator.setCurrentShowID(id))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(RecommendationBox);