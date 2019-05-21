import React, {Component} from 'react';
import Episode from './Episode/Episode';
import api_key from '../../../../helpers/APIKey';
import axios from '../../../../helpers/axios-external';
import Loader from './../../../Loading/Loading';
import withErrorHandler from './../../../../components/withErrorHandler/withErrorHandler';
import classes from './EpisodesList.module.css';

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
            if (typeof response !== 'undefined') {
                this.setState({episodes: response.data.episodes, loading:false, activeSeasonID:seasonid});
            } else {
                this.setState({loading:false, activeSeasonID:seasonid});
            }
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
            const content = (
                this.state.episodes.map(el=>{
                let isWatched = false;
                if (this.props.favorites) {
                    isWatched = this.props.favorites.isWatched(this.props.showID,el.id);
                }
            return(
                <Episode key={el.id} episode={el} imageBase={this.props.imageStillBase} updateWatched={this.props.updateWatched} showID={this.props.showID} isWatched={isWatched} currentShow={this.props.currentShow}/>
            )}));

            const ifAllWatched = this.props.favorites.ifAllWatched(this.props.showID,this.state.episodes);

            return (
                <React.Fragment>
                    <div className={classes.EpisodeToolbarContainer}>
                        <button className={classes.EpisodeToolbar} onClick={()=>this.props.updateAllWatchedEpisodes(this.props.currentShow, this.state.episodes, !ifAllWatched)}>
                        {ifAllWatched ? 'Unmark all watched' : 'Mark all watched'}
                        </button>  
                    </div>
                    {content}
                </React.Fragment>
            )
        } else {
            return null;
        }
//this.props.favorites.ifAllWatched(this.props.showID,this.state.episodes)
    }
};

export default withErrorHandler(EpisodesList,axios);