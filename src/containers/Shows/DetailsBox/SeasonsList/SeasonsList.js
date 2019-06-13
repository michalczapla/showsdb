import React, {useState} from 'react';
import SeasonsPagination from './SeasonsPagination/SeasonsPagination';
import EpisodesList from './EpisodesList/EpisodesList';
// import {connect} from 'react-redux';

const SeasonsList = (props) => {
    const [activeSeasonID, setActiveSeasonID] = useState(null);
    

    const setActiveSeasonHandler = (id) => {
        if (id!==null) {
            setActiveSeasonID(id);
        }
    }

        // const activeCopy = {...activeSeasonID};

        return(
            <React.Fragment>
                <SeasonsPagination 
                    setActiveSeason={setActiveSeasonHandler} 
                    activeSeasonID={activeSeasonID}/>
                    <EpisodesList 
                    activeSeasonID={activeSeasonID} />
                
            </React.Fragment>
        );
};

// const mapStateToProps = (state) => {
//     return {
//         currentShowID: state.currentShowID,
//         currentShow: state.currentShow
//     }
// }

export default SeasonsList;