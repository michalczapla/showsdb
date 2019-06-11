import React, {Component} from 'react';
import SeasonsPagination from './SeasonsPagination/SeasonsPagination';
import EpisodesList from './EpisodesList/EpisodesList';
import {connect} from 'react-redux';

class SeasonsList extends Component {
    state={
        activeSeasonID: null
    }

    setActiveSeasonHandler = (id) => {
        if (id!==null) {
            this.setState({activeSeasonID: id});
        }
    }

    render() {

        return(
            <React.Fragment>
                <SeasonsPagination 
                seasons={this.props.seasons} 
                activeSeason={this.setActiveSeasonHandler} 
                activeSeasonID={this.state.activeSeasonID}/>
                {this.state.activeSeasonID!==null ? 
                    <EpisodesList 
                    activeSeasonID={this.state.activeSeasonID} 
                    showID={this.props.showID} 
                    imageStillBase={this.props.imageStillBase} 
                    updateWatched={this.props.updateWatched} 
                    favorites={this.props.favorites} 
                    currentShow={this.props.currentShow} 
                    updateAllWatchedEpisodes={this.props.updateAllWatchedEpisodes}/> : null}
                
            </React.Fragment>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        showID: state.currentShowID
    }
}

export default connect(mapStateToProps)(SeasonsList);