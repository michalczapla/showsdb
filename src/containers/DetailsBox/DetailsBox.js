import React, {Component} from 'react';
import classes from './DetailsBox.module.css';
import DetailsHeader from './DetailsHeader/DetailsHeader';
import DetailsMeta from './DetailsMeta/DetailsMeta';
import LandingPage from './../../components/LandingPage/LandingPage';
import Loader from '../Loading/Loading';
import withErrorHandler from '../../components/withErrorHandler/withErrorHandler';

// HELPERY
import axios from '../../helpers/axios-external';
import api_key from '../../helpers/APIKey';
import SeasonsList from './SeasonsList/SeasonsList';

class DetailsBox extends Component {
    state= {
        currentShowID: null,     // odwołanie jako props a nie state
        currentShow: null,
        loading: false
    }

    // aktuaizacja stanu na podstawie przekazanych własćiwości
    // static getDerivedStateFromProps(nextProps, prevState){
    //     if (nextProps.currentShowID!==prevState.currentShowID){
    //         return {currentShowID: nextProps.currentShowID}
    //     } else
    //     return null;
    // };

    getShowDetails = async (id) => {
        if (id!==null) {
            const details_request_url = `https://api.themoviedb.org/3/tv/${id}?api_key=${api_key}&language=en-US`;
            this.setState({loading:true});
            try {
                const response = await axios(details_request_url);
                this.setState({currentShow: response.data, loading:false, currentShowID: id});
            } catch {
                this.setState({   
                    currentShowID: id, 
                    loading: false
                })
            }
        };
    };

    componentDidUpdate= async () => {
        // if ((this.state.currentShow===null && this.props.currentShowID!==null && !this.state.loading)) { //|| (this.state.currentShow.id!==null && this.props.currentShowID!==this.state.currentShow.id)) 
        // if (!this.state.loading && this.props.currentShowID!==this.state.currentShowID) {
            if (!this.state.loading && this.props.currentShowID!==this.state.currentShowID) {
                await this.getShowDetails(this.props.currentShowID);
    
        }
    };


    render() {
        // console.log(this.props.favorites);
        let isFavorite = false;
        if (this.props.favorites) {
            isFavorite = this.props.favorites.isFavorite(this.state.currentShowID);
        }
        
        if (this.state.loading) {
            return (<Loader />);
        }
        else if (this.state.currentShow) {
        return (
        <div className={classes.DetailsBox}>
            <DetailsHeader currentShow={this.state.currentShow} imageBasePath={this.props.configuration.backdropBase} updateFavorites={() => this.props.updateFavorites(this.state.currentShow)} isFavorite={isFavorite}/>
            <DetailsMeta genres={this.props.configuration.genreList} currentShow={this.state.currentShow} />
            <SeasonsList seasons={this.state.currentShow.seasons} showID={this.state.currentShowID} imageStillBase={this.props.configuration.stillBase}/>
        </div>);
        } else {
            return (<LandingPage />);
        }
    };
}

export default withErrorHandler(DetailsBox,axios);