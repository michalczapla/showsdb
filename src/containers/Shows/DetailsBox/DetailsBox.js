import React, {useState, useEffect} from 'react';
import classes from './DetailsBox.module.css';
import DetailsHeader from './DetailsHeader/DetailsHeader';
import DetailsMeta from './DetailsMeta/DetailsMeta';
import LandingPage from '../../../components/LandingPage/LandingPage';
import Loader from '../../../components/UI/Loading/Loading';
import withErrorHandler from '../../../components/withErrorHandler/withErrorHandler';
import {connect} from 'react-redux';
import * as ActionCreator from '../../../store/actions/index';
import axios from '../../../helpers/axios-external';
import SeasonsList from './SeasonsList/SeasonsList';
import RecommendationBox from './RecommendationBox/RecommendationBox';

const DetailsBox =(props)=> {
    const [loading, setLoading] = useState(false);

    const getShowDetails = async (id) => {
        setLoading(true);
        await props.fetchCurrentShow(id);
        setLoading(false);
    };

    useEffect(()=>{
        getShowDetails(props.currentShowID);
    },[props.currentShowID]);

    if (loading) {
        return (<Loader />);
    }
    else if (props.currentShow) {
    return (
    <div className={classes.DetailsBox}>
        <DetailsHeader />  
        <DetailsMeta />
        <SeasonsList />
        <RecommendationBox />
        
    </div>);
    } else {
        return (<LandingPage />);
    }
}

const mapStateToProps = state => {
    return {
      currentShowID: state.currentShowID,
      currentShow: state.currentShow
    }
  }

  const mapDispatchToProps = (dispatch) => {
    return {
        fetchCurrentShow :(show) => (dispatch(ActionCreator.fetchCurrentShow(show)))
    }
}
  

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(DetailsBox,axios));
