import React, {useState, useEffect} from 'react';
import Episode from './Episode/Episode';
import axios from '../../../../../helpers/axios-external';
import Loader from '../../../../../components/UI/Loading/Loading';
import withErrorHandler from '../../../../../components/withErrorHandler/withErrorHandler';
import classes from './EpisodesList.module.css';
import {connect} from 'react-redux';
import * as ActionCreator from '../../../../../store/actions/index';

const EpisodesList = (props) => {

    const [loading, setLoading] = useState(false);


    const getEpisodesForSeason = async () => {
        setLoading(true);
        await props.fetchEpisodesForSeason(props.currentShowID,props.activeSeasonID);
        setLoading(false);
    }


    useEffect(()=>{
        if (props.activeSeasonID!==null) {
           getEpisodesForSeason();
        }
    },[props.activeSeasonID])

    // scrollToTop = () => {
    //     window.scrollTo(0,this.episodesRef.current.offsetTop);
    // }
    // render() {
      


        if (loading) {
            return <Loader />;
        } else if (props.episodes!==null) {
            const content = (
                props.episodes.map(el=>{
                let isWatched = false;
                if (props.favorites) {
                    isWatched = props.favorites.isWatched(props.currentShowID,el.id);
                }
            return(
                <Episode key={el.id} episode={el} isWatched={isWatched} />  
            )}));

            const ifAllWatched = props.favorites.ifAllWatched(props.currentShowID,props.episodes);

            return (
                <React.Fragment>
                    <div className={classes.EpisodeToolbarContainer}>
                        <button className={classes.EpisodeToolbar} onClick={()=>props.updateAllWatchedEpisodes(props.currentShow, props.episodes, !ifAllWatched)}>
                        {ifAllWatched ? 'Unmark all watched' : 'Mark all watched'}
                        </button>  
                    </div>
                    {content}
                </React.Fragment>
            )
        } else {
            return null;
        }
    // }
};

const mapStateToProps = (state)=> {
    return {
        favorites: state.favorites,
        currentShowID: state.currentShowID,
        currentShow: state.currentShow,
        episodes: state.episodesInSeason
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchEpisodesForSeason: (showID, episodeID) => dispatch(ActionCreator.fetchEpisodesForSeason(showID, episodeID)),
        updateAllWatchedEpisodes: (show, episodesArray, markAllWatched) => dispatch(ActionCreator.updateAllWatchedEpisodes(show,episodesArray,markAllWatched))
    }
}

// export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(EpisodesList,axios));
export default connect(mapStateToProps,mapDispatchToProps)(EpisodesList);
