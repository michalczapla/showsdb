import React, {useEffect, useState} from 'react';
import SearchBox from './SearchBox/SearchBox';
import DetailsBox from './DetailsBox/DetailsBox';
import FavoritesBox from './FavoritesBox/FavoritesBox';
import classes from './Shows.module.css';
import {connect} from 'react-redux';
// import * as ActionTypes from '../../store/actions/actionTypes';
import * as ActionCreator from '../../store/actions/index';
import LandingPage from '../../components/LandingPage/LandingPage';
import Loader from '../../components/UI/Loading/Loading';


const Shows = (props) => {

  // useEffect(()=>{
  //   if (props.configuration && props.favorites && props.match.params.id && (parseInt(props.match.params.id) !== props.currentShowID)) {
  //     console.log('different id');
  //     console.log(props.match.params.id);
  //     props.setCurrentShowID(props.match.params.id);
  //   } else if (!props.match.params.id) {
  //     console.log('clearing');
  //     // props.setCurrentShow(null);
  //     // props.setCurrentShowID(null);
  //     props.clearCurrentShowData();
       
  //   }
  // },[props]);

    //ponizsza metoda ma obsluzyc nastepujace sciezki:
      // 1) uzytkownik wchodzi na strone od razu z paramatrem w adresie
      // 2) uzytkownik otwiera strone z samym adresem - wtedy nie powinno się nic dziać
      // 3) uzytkownik nawiguje i zostaje wybrany konkretny serial (moze nawigowac na to samo ID) 
      // 4) użytkownik wchodzi na stronę z parametrami niezgodnymi (ktore nie sa int)
    useEffect(()=>{
    
      //sciezka 1 - ustawienie poprawnego ID
      if ( props.currentShowID===null && (parseInt(props.match.params.id) !== props.currentShowID) && !isNaN(parseInt(props.match.params.id))){      //wywolanie kiedy uzytkownik wejdzie na stronie od razu podajc parametr
        // props.setCurrentShowID(parseInt(props.match.params.id));
        props.setCurrentShowID(parseInt(props.match.params.id));
      }

      //sciezka 3 - sprawdza czy nalezy sciagnac dane serialu
      if ((props.currentShowID!==null && props.currentShow ===null) || (props.currentShow!==null && props.currentShowID!==props.currentShow.id)) {
            getShowDetails(props.currentShowID);
            }

      if (props.currentShowID!==null && isNaN(parseInt(props.match.params.id))){  //jeżeli wracamy z z innej zakladki (w state jest current show, a w adresie nic nie ma)
        props.clearCurrentShowData();
      }
    },[props]);

    const [loading, setLoading] = useState(false);

    const getShowDetails = async (id) => {
        setLoading(true);
        await props.setCurrentShow(id);
        setLoading(false);
    };

    const MainPage = () => {
      if (loading || !props.configuration) {
        return <div><Loader /></div>;
      } else if (props.match.params.id && !isNaN(parseInt(props.match.params.id))) {
        return <div><DetailsBox /></div>;
      } else {
        return <div><LandingPage /></div>;
      }
    }

    return (
      <section className={[classes.Shows, props.favorites.favorites.length===0 ? classes.Shows2columns : null].join(' ')}>
            
            <div>
              <SearchBox title="showsDB v0.8.01 r" />
            </div>
            
            {/* {props.currentShowID ? <div><DetailsBox /></div> : <div><LandingPage /></div> } */}
            {/* {props.match.params.id ? <div><DetailsBox /></div> : <div><LandingPage /></div> } */}
            {MainPage()}
            {props.favorites.favorites.length===0 ? null : 
            <div className={classes.FavoritesContainer}>
              <FavoritesBox />
            </div>
            }
      </section>
    );
}

const mapStateToProps = (state)=> {
  return {
    currentShowID: state.main.currentShowID,
    currentShow: state.main.currentShow,
    configuration: state.main.configuration,
    favorites: state.main.favorites
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setCurrentShowID: (showID) => dispatch(ActionCreator.setCurrentShowID(showID)),
    setCurrentShow: (show) => dispatch(ActionCreator.fetchCurrentShow(show)),
    clearCurrentShowData: () => dispatch(ActionCreator.clearCurrentShowData())
    // updateWatchedEpisode: (show, episodeID) =>dispatch({type: ActionTypes.ADD_OR_REMOVE_WATCHED_EPISODE, show: {show: show, episodeID: episodeID}}),
    // updateAllWatchedEpisodes: (show, episodesArray, markAllWatched) => dispatch({type:ActionTypes.MARK_ALL_EPISODE_WATCHED, show: {show:show, episodesArray: episodesArray, markAllWatched: markAllWatched}}),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Shows);

