import React, {Component} from 'react';
import classes from './DetailsBox.module.css';
import DetailsHeader from './DetailsHeader/DetailsHeader';
import DetailsMeta from './DetailsMeta/DetailsMeta';
import LandingPage from '../../../components/LandingPage/LandingPage';
import Loader from '../../../components/UI/Loading/Loading';
import withErrorHandler from '../../../components/withErrorHandler/withErrorHandler';
import {connect} from 'react-redux';
import * as ActionCreator from '../../../store/actions/index';

import * as Mappers from '../../../helpers/mappers';

// HELPERY
import axios from '../../../helpers/axios-external';
import api_key from '../../../helpers/APIKey';
import SeasonsList from './SeasonsList/SeasonsList';

class DetailsBox extends Component {
    state= {
        currentShow: null,
        loading: false
    }


    getShowDetails = async (id) => {
        if (id!==null) {
            const details_request_url = `https://api.themoviedb.org/3/tv/${id}?api_key=${api_key}&language=en-US`;
            this.setState({loading:true});
            try {
                const response = await axios(details_request_url);
                this.setState({currentShow: Mappers.mapShow(response.data), loading:false});
            } catch {
                this.setState({loading: false});
                this.props.setCurrentShowID(null);
            }
        };
    };

    // componentDidMount() {
    //     this._isMount=true;
    // }
    // componentWillUnmount(){ 
    //     this._isMount=false;
    // }

    componentDidUpdate= () => {
        // if ((this.state.currentShow===null && this.props.currentShowID!==null && !this.state.loading)) { //|| (this.state.currentShow.id!==null && this.props.currentShowID!==this.state.currentShow.id)) 
        // if (!this.state.loading && this.props.currentShowID!==this.state.currentShowID) {
            // if (!this.state.loading && this.props.currentShowID!==this.state.currentShow.id) {
            if (!this.state.loading && (this.state.currentShow===null || this.props.currentShowID!==this.state.currentShow.id)) {
                this.getShowDetails(this.props.currentShowID);
                window.scrollTo(0,0);       //scroll na górę okna
    
        }
    };


    render() {
        // console.log(this.props.favorites);
        let isFavorite = false;
        if (this.props.favorites) {
            isFavorite = this.props.favorites.isFavorite(this.props.currentShowID);
        }
        
        if (this.state.loading) {
            return (<Loader />);
        }
        else if (this.state.currentShow) {
        return (
        <div className={classes.DetailsBox}>
            <DetailsHeader 
            currentShow={this.state.currentShow} 
            imageBasePath={this.props.configuration.backdropBase} 
            updateFavorites={() => this.props.updateFavorites(this.state.currentShow)} 
            isFavorite={isFavorite}/>
            
            <DetailsMeta 
            genres={this.props.configuration.genreList} 
            currentShow={this.state.currentShow} />

            <SeasonsList 
            seasons={this.state.currentShow.seasons}
            currentShow={this.state.currentShow} 
            imageStillBase={this.props.configuration.stillBase} 
            updateWatched={this.props.updateWatched} 
            updateAllWatchedEpisodes={this.props.updateAllWatchedEpisodes}/>
            
        </div>);
        } else {
            return (<LandingPage />);
        }
    };
}

const mapStateToProps = state => {
    return {
      configuration: state.configuration,
      currentShowID: state.currentShowID,
      favorites: state.favorites
    }
  }

  const mapDispatchToProps = (dispatch) => {
    return {
        setCurrentShowID: (id) => dispatch(ActionCreator.setCurrentShowID(id)),
        updateFavorites: (show) => dispatch(ActionCreator.updateFavorites(show)),
    }
}
  

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(DetailsBox,axios));