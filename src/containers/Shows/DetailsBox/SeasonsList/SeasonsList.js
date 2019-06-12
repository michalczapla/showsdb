import React, {Component} from 'react';
import SeasonsPagination from './SeasonsPagination/SeasonsPagination';
import EpisodesList from './EpisodesList/EpisodesList';
// import {connect} from 'react-redux';

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
                setActiveSeason={this.setActiveSeasonHandler} 
                activeSeasonID={this.state.activeSeasonID}/>
                {this.state.activeSeasonID!==null ? 
                    <EpisodesList 
                    activeSeasonID={this.state.activeSeasonID} 
                    updateWatched={this.props.updateWatched} 
                    updateAllWatchedEpisodes={this.props.updateAllWatchedEpisodes}/> : null}
                
            </React.Fragment>
        );
    }
};

// const mapStateToProps = (state) => {
//     return {
//         currentShowID: state.currentShowID,
//         currentShow: state.currentShow
//     }
// }

export default SeasonsList;