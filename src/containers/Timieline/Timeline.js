import React ,{useState, useEffect} from 'react';
import Event from './Event/Event';
import HorizontalRule from './HorizontalRule/HorizontalRule';
import classes from './Timeline.module.css';
import {connect} from 'react-redux';
import Modal from './../../components/UI/Modal/Modal';
import axios from '../../helpers/axios-external';
import api_key from '../../helpers/APIKey';
import Loader from '../../components/UI/Loading/Loading';
import * as Mappers from '../../helpers/mappers';
import * as ActionTypes from '../../store/actions';

const Timeline = (props) => {

    const [updateRequired, setUpdateRequired] = useState(true);
    const [actualProgress, setActualProgress] = useState(0);
    const [totalSeasons, setTotalSeasons] = useState(0);
    const [totalShows, setTotalShows] = useState(-1);
    const [totalEpisodes, setTotalEpisodes] = useState(-1);
    const [loading, setLoading] = useState(false);
    const [groups, setGroups] = useState();

    // sprawdzenie przy montowaniu komponentu - ustawienie zmiennych do wyświetlania postępu
    useEffect(()=>{
        console.log(props.favorites.lastUpdate);
        if (props.favorites.lastUpdate === 0) {
            setUpdateRequired(true);
            setTotalShows(props.favorites.favorites.length);
            setTotalSeasons(props.favorites.favorites.reduce((acc, cur)=> {return acc + cur.number_of_seasons},0));
        } else {
            setUpdateRequired(false);
            // const gr = mapEpisodesForProperGroups();
            // // setGroups();
            // console.log(gr);
        }
        

    },[])

    const getAxiosData = async (id, season) => {
        return await axios(`https://api.themoviedb.org/3/tv/${id}/season/${season}?api_key=${api_key}`);
    } 


    const updateEpisodesData = async () => {
        setLoading(true);

    
        
        for (let show of props.favorites.favorites) {
            const retrievedEpisodes = [];
            for (let i =show.min_season_no; i<=show.max_season_no;i++) {
              await getAxiosData(show.id,i).then((res)=>{
                    retrievedEpisodes.push(...Mappers.mapSeason([...res.data.episodes]));
                }).catch(error => {
                    console.log("Fatal error" + error.message);
                })
            props.addEpisodes(show.id, retrievedEpisodes);
            // console.log(props.favorites.lastUpdate);
            } 
        }
        // console.log(props.favorites.favorites);
        // const mappedEpisodes = Mappers.mapSeason(retrievedEpisodes);
        // const groups = mapEpisodesForProperGroups(mappedEpisodes); 

        setLoading(false);
        // setGroups(mapEpisodesForProperGroups());
        // console.log(mapEpisodesForProperGroups());
        setUpdateRequired(false);
    }

    const mapEpisodesForProperGroups = () => {
        if (props.favorites.favorites) {

            const filterEpisodesByDays = (direction=1) => {
                const today = new Date();
                const group = props.favorites.favorites.map(show=>{
                    const showGroup = {
                            id: show.id,
                            name: show.name,
                            backdrop_path:show.backdrop_path,
                            episodes: show.episodes.filter(el=>{
                                const diffDays = Math.ceil((Math.abs(today.getTime() - el.air_date.getTime()))/(1000*60*60*24));    //zwraca różnicę w dniach
                                if (diffDays>30 && direction===1) 
                                    return el;
                                else if (diffDays<-30 && direction===-1)
                                    return el;
                            })
                        }
                    if (showGroup.episodes.length!==0)
                        return showGroup;
                    else 
                        return null;
                })
                return group.filter(el=> (el!==null));
            }

            const groups= {
                olderThan30Days: filterEpisodesByDays(1), 
                within30days: [],
                next30days:filterEpisodesByDays(-1)
            }   

            // //mapowanie w przedziały czasowe
            // showsArray.map(show=>{
            //     const diffDays = Math.ceil((Math.abs(today.getTime() - show.air_date.getTime()))/(1000*60*60*24));    //zwraca różnicę w dniach
            //     show.diffDays = diffDays;
            //     if (diffDays>30) 
            //         {groups.olderThan30Days.push(show);}
            //     else if (diffDays<=30 && diffDays >=-30)
            //         {groups.within30days.push(show)}
            //     else if (diffDays<-30)
            //         {groups.next30days.push(show)}
            // });

            //mapowanie w grupy 
            // const mapIntoGroupBySeason = (group) => {
            //     for (let showFavorite of props.favorites.favorites) {
            //         for (let showTimeline)
            //     }
            // }

            return groups;
        }
    };
    
    return (
        <>
        {loading ? <Loader /> : 
           <>
           {updateRequired ? <Modal show title='Update required'>
                <div>Episodes info needs to be updated, proceed? (this make takes couple of time)</div>
                <div>{actualProgress} / {totalSeasons}</div>
                <div><button onClick={updateEpisodesData}>Zaktualizuj</button></div>
            </Modal> : null}
            <section className={classes.TimelineContainer}>
            <div className={classes.Timeline}>
                <Event position='left'/>
                <HorizontalRule>Older than month</HorizontalRule>
                <Event position='right'/>
                <Event position='left'/>
                <HorizontalRule>After next month</HorizontalRule>
                <Event position='right'/>
            </div>
            </section>
            </>
        }
        </>
    );
    
};


const mapStateToProps = state => {
    return {
      favorites: state.favorites,
      configuration: state.configuration
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
        addEpisodes: (showID, episodes) => dispatch({type: ActionTypes.ADD_EPISODES_TO_SHOW, show: {showID: showID, episodes: episodes}}),
    }
  }
  

export default connect(mapStateToProps,mapDispatchToProps)(Timeline);