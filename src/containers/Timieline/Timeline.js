import React ,{useState, useEffect} from 'react';
import classes from './Timeline.module.css';
import {connect} from 'react-redux';
import Modal from './../../components/UI/Modal/Modal';
import axios from '../../helpers/axios-external';
import api_key from '../../helpers/APIKey';
import Loader from '../../components/UI/Loading/Loading';
import * as Mappers from '../../helpers/mappers';
import * as ActionTypes from '../../store/actions';
import TimelineBuilder from './TimelineBuilder/TimelineBuilder';
import cloneDeep from 'lodash/cloneDeep';

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
 
        if (props.favorites.lastUpdate === 0) {
            setUpdateRequired(true);
            setTotalShows(props.favorites.favorites.length);
            setTotalSeasons(props.favorites.favorites.reduce((acc, cur)=> {return acc + cur.number_of_seasons},0));
        } else {
            setUpdateRequired(false);
            // const gr = mapEpisodesForProperGroups();
            setGroups(mapShowsForProperGroups());
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
        setGroups(mapShowsForProperGroups());
        
    }

    const mapShowsForProperGroups = () => {
        if (props.favorites.favorites) {
            const today = new Date();
            

            const filterShowByDays = (direction=1) => {  
                const shows = cloneDeep(props.favorites.favorites);  
                const group = shows.map(show=>{
                    show.episodes = show.episodes.filter(episode=>{
                    const diffDays = Math.ceil((Math.abs(today.getTime() - episode.air_date.getTime()))/(1000*60*60*24));
                    // console.log(diffDays);    //zwraca różnicę w dniach
                    if (diffDays>30 && direction===1) 
                        return episode;
                    else if (diffDays<-30 && direction===-1)
                        return episode;
                    else if (diffDays<=30 && diffDays>=-30 && direction===0)
                        return episode;
                    });
                
                if (show.episodes.length!==0)
                    return show;
                else 
                    return null;
                
                })
                
                return group.filter(el=>(el!==null));       //zwraca tylko elementy nie będące nullem

                // if (group.length!==0)
                //     return group;
                // else
                //     return [];

            }
            //mapuje z listy odcinków, którą ma każdy serial na listę odcinków z opisem serialu
            const mapEpisodes =(shows)=>{
                if (shows) {
                    const episodesArray=[];
                    shows.map(show=>{
                        show.episodes.map(episode=>{
                            const showInfo = {
                                id: show.id,
                                name: show.name,
                                poster_path: show.poster_path,
                                backdrop_path: show.backdrop_path
                            };
                            episode.show = showInfo;
                            episodesArray.push(episode);
                        })
                    })
                    return episodesArray;
                }
            }

            const groupEpisodes = (episodes) =>{
                const datesArray = [];
                const grouppedArray=[];

                //deklaracja funccji sprawdzajaćej unikalnośc daty w tablicy
                const isDateInArray = (date, datesArray) => {
                    for (let i = 0; i < datesArray.length; i++) {
                      if (date.getTime() === datesArray[i].getTime()) {
                        return true;
                      }
                    }
                    return false;
                }
                
                //wypełenienie nowej tablicy unikalnymi datami
                episodes.map(el=>{
                    if (!isDateInArray(el.air_date, datesArray))
                 datesArray.push(el.air_date);
                });

                //dla każdej daty dopisanie opdowiadających odcinków
                datesArray.map(timeStamp=>{
                 const shows=[];
                    episodes.map(episode=>{
                        if (timeStamp.getTime() === episode.air_date.getTime()){
                            shows.push(episode);
                        }
                    })
                    const grouppedDate = {
                        date: timeStamp,
                        shows: shows
                    };
                    grouppedArray.push(grouppedDate);
                })
                return grouppedArray;
            }

            const groups= {
                olderThan30Days: filterShowByDays(1), 
                within30days: groupEpisodes(mapEpisodes(filterShowByDays(0))),
                next30days: filterShowByDays(-1),
            }   
            // console.log(groups);

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
            console.log(groups);
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
               <TimelineBuilder shows={groups} />
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
        addEpisodes: (showID, episodes) => dispatch({type: ActionTypes.ADD_EPISODES_TO_SHOW, show: {showID: showID, episodes: episodes}})
    }
  }
  

export default connect(mapStateToProps,mapDispatchToProps)(Timeline);