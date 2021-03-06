import React ,{Component} from 'react';
import Event from './Event/Event';
import HorizontalRule from './HorizontalRule/HorizontalRule';
import classes from './Timeline.module.css';
import {connect} from 'react-redux';
import Modal from './../../components/UI/Modal/Modal';
import axios from '../../helpers/axios-external';
import api_key from '../../helpers/APIKey';
import Loader from '../../components/UI/Loading/Loading';

class Timeline extends Component {

    state ={
        updateRequired: true,
        actualProgress: 0,
        totalSeasons:0,
        totalShows:-1,
        totalEpisodes:-1,
        loading:false
    }
    // const [updateRequired, setUpdateRequired] = useState(true);
    // const [actualProgress, setActualProgress] = useState(0);
    // const [totalSeasons, setTotalSeasons] = useState(0);
    // const [totalShows, setTotalShows] = useState(-1);
    // const [totalEpisodes, setTotalEpisodes] = useState(-1);
    // const [loading, setLoading] = useState(false);

    //sprawdzenie przy montowaniu komponentu
    // useEffect(()=>{
    //     console.log(props.favorites.favorites);
    //     if (props.favorites.lastUpdate === 0) {
    //         setUpdateRequired(true);
    //         setTotalShows(props.favorites.favorites.length);
    //         setTotalSeasons(props.favorites.favorites.reduce((acc, cur)=> {return acc + cur.number_of_seasons},0));
    //     } else {
    //         setUpdateRequired(false);
    //     }


    // },[props.favorites.favorites, props.favorites.lastUpdate])


    updateEpisodesData = async () => {
        
        this.setState({loading: true})//;setLoading(true);
        // console.log(this.state.loading);

        const res = await axios(`https://api.themoviedb.org/3/tv/1418/season/1?api_key=${api_key}`);


        // console.log('ok!');
        // const retrievedEpisodes = [];
        
        // props.favorites.favorites.forEach(async (show, index)=>{
        //     for (let i =show.min_season_no; i<=show.max_season_no;i++) {
        //         const res = await axios(`https://api.themoviedb.org/3/tv/${show.id}/season/${i}?api_key=${api_key}`);
        //         retrievedEpisodes.push(...res.data.episodes);
        //     }

        // });
        // console.log(retrievedEpisodes);
        
        setTimeout( async()=>(await console.log('processing')),5000);

        this.setState({loading: false});//setLoading(false);
        console.log(this.state.loading);
        this.setState({updateRequired: false});//setUpdateRequired(false);
    }

    render () {
        return (
            <>
            {this.state.loading ? <Loader /> : 
            <>
            {this.state.updateRequired ? <Modal show title='Update required'>
                    <div>Episodes info needs to be updated, proceed? (this make takes couple of time)</div>
                    <div>{this.state.actualProgress} / {this.state.totalSeasons}</div>
                    <div><button onClick={this.updateEpisodesData}>Zaktualizuj</button></div>
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
    
};


// const mapStateToProps = state => {
//     return {
//       favorites: state.favorites,
//       configuration: state.configuration
//     }
//   }
  
//   const mapDispatchToProps = dispatch => {
//     return {

//     }
//   }
  

export default Timeline;