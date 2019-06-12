import React, {useState, useEffect} from 'react';
import classes from './DetailsBox.module.css';
import DetailsHeader from './DetailsHeader/DetailsHeader';
import DetailsMeta from './DetailsMeta/DetailsMeta';
import LandingPage from '../../../components/LandingPage/LandingPage';
import Loader from '../../../components/UI/Loading/Loading';
import withErrorHandler from '../../../components/withErrorHandler/withErrorHandler';
import {connect} from 'react-redux';
import * as ActionCreator from '../../../store/actions/index';

// HELPERY
import axios from '../../../helpers/axios-external';
import SeasonsList from './SeasonsList/SeasonsList';

const DetailsBox =(props)=> {
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        getShowDetails();
    },[props.currentShowID])



    const getShowDetails = async () => {
        setLoading(true);
        await props.fetchCurrentShow(props.currentShowID);
        setLoading(false);
    };



    let isFavorite = false;
    if (props.favorites) {
        isFavorite = props.favorites.isFavorite(props.currentShowID);
    }
    
    if (loading) {
        return (<Loader />);
    }
    else if (props.currentShow) {
    return (
    <div className={classes.DetailsBox}>
        <DetailsHeader 
        isFavorite={isFavorite}/>
        
        <DetailsMeta />

        <SeasonsList 
        updateWatched={props.updateWatched} 
        updateAllWatchedEpisodes={props.updateAllWatchedEpisodes}/>
        
    </div>);
    } else {
        return (<LandingPage />);
    }
}

const mapStateToProps = state => {
    return {
      configuration: state.configuration,
      currentShowID: state.currentShowID,
      currentShow: state.currentShow,
      favorites: state.favorites
    }
  }

  const mapDispatchToProps = (dispatch) => {
    return {
        setCurrentShowID: (id) => dispatch(ActionCreator.setCurrentShowID(id)),
        fetchCurrentShow :(show) => (dispatch(ActionCreator.fetchCurrentShow(show))),
        updateFavorites: (show) => dispatch(ActionCreator.updateFavorites(show)),
    }
}
  

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(DetailsBox,axios));
