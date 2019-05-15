import React, {Component} from 'react';
import classes from './DetailsBox.module.css';
import DetailsHeader from './DetailsHeader/DetailsHeader';
import DetailsMeta from './DetailsMeta/DetailsMeta';
import LandingPage from './../../components/LandingPage/LandingPage';
import Loader from '../Loading/Loading';

// HELPERY
import axios from '../../helpers/axios-external';
import api_key from '../../helpers/APIKey';

class DetailsBox extends Component {
    state= {
        // currentShowID: null,     // odwołanie jako props a nie state
        currentShow: null,
        loading: false
    }

    //aktuaizacja stanu na podstawie przekazanych własćiwości
    // static getDerivedStateFromProps(nextProps, prevState){
    //     if (nextProps.currentShowID!==prevState.currentShowID){
    //         return {currentShowID: nextProps.currentShowID}
    //     } else
    //     return null;
    // };

    async componentDidUpdate() {
        if ((this.state.currentShow===null && this.props.currentShowID!==null && !this.state.loading)) { // || (this.props.currentShowID!==this.state.currentShow.id)
                const details_request_url = `https://api.themoviedb.org/3/tv/${this.props.currentShowID}?api_key=${api_key}&language=en-US`;
            this.setState({loading:true});
            const response = await axios(details_request_url);
            console.log(response.data);
            this.setState({currentShow: response.data, loading:false});
    
        }
    };

    render() {

        if (this.state.loading) {
            return (<Loader />);
        }
        else if (this.state.currentShow) {
        return (
        <div className={classes.DetailsBox}>
            <DetailsHeader currentShow={this.state.currentShow} imageBasePath={this.props.configuration.backdropBase}/>
            <DetailsMeta genres={this.props.configuration.genreList} currentShow={this.state.currentShow} />
        </div>);
        } else {
            return (<LandingPage />);
        }
    };
}

export default DetailsBox;