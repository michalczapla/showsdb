import React, {Component} from 'react';
import Episode from './Episode/Episode';
import api_key from '../../../../helpers/APIKey';
import axios from '../../../../helpers/axios-external';
import Loader from './../../../Loading/Loading';

class EpisodesList extends Component{
    state= {
        episodes: null,
        loading: false,
        activeSeasonID: null,
    }

    getEpisodeList = async (showid, seasonid) => {
        if (showid!==null && seasonid !==null) {
            const details_request_url = `https://api.themoviedb.org/3/tv/${showid}/season/${seasonid}?api_key=${api_key}&language=en-US`;
            this.setState({loading:true});
            const response = await axios(details_request_url);
            this.setState({episodes: response.data.episodes, loading:false, activeSeasonID:seasonid});
        };
    };

    componentDidUpdate = () => {
        if (!this.state.loading && this.state.activeSeasonID!==this.props.activeSeasonID) {
            this.getEpisodeList(this.props.showID, this.props.activeSeasonID);
        }
    };

    componentDidMount = () => {
            this.getEpisodeList(this.props.showID, this.props.activeSeasonID);
    };

    render() {
    
        if (this.state.loading) {
            return <Loader />;
        } else if (this.state.episodes!==null) {
            return (this.state.episodes.map(el=><Episode key={el.id} episode={el} imageBase={this.props.imageStillBase}/>));
        } else {
            return null;
        }
    }
};

export default EpisodesList;