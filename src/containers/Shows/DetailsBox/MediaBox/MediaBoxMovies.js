import React, {useState, useEffect} from 'react';
import classes from './MediaBox.module.css';
import {connect} from 'react-redux';
import api_key from '../../../../helpers/APIKey';
import axios from '../../../../helpers/axios-external';
import * as Mapper from '../../../../helpers/mappers';
import Loader from '../../../../components/UI/Loading/Loading';
// import * as ActionCreator from '../../../../store/actions/index';
import ArrowRight from 'react-ionicons/lib/MdArrowDropright';
import ArrowLeft from 'react-ionicons/lib/MdArrowDropleft';
import MediaSummaryMovie from './MediaSummaryMovie/MediaSummaryMovie';
import MoviePlayer from './MediaPlayer/MoviePlayer';


const MediaBoxMovies =(props)=> {
    const [loading, setLoading] = useState(false);
    const [media, setMedia] = useState(null);
    const [pagination, setPagination] = useState({actualPage:1, from:0, to:5});
    const [MoviePlayerSettings, setMoviePlayerSettings] = useState({show: false, selectedShow: null});

    let getMediaMovies = async (id) => {
        setLoading(true);
        
        if (id!==null) {
            const details_request_url = `https://api.themoviedb.org/3/tv/${id}/videos?api_key=${api_key}`;
            const response = await axios(details_request_url);
            if (typeof response !== 'undefined') {
                setMedia(Mapper.mapMediaMovies(response.data.results));
            } else {
                setMedia(null);
            }
        };

        setLoading(false);
    }

    useEffect(()=>{
        if (props.currentShowID!==null) {
            getMediaMovies(props.currentShowID);
        } 
    },[props.currentShowID]);

    const onMovieClick = (selectedShow) => {
        // console.log(selectedShow);
        setMoviePlayerSettings({show: !MoviePlayerSettings.show, selectedShow: selectedShow});
    }


    const changePage = (vector) => {
        const resultsNo = media.length;
        let actualPage = pagination.actualPage;
        const maxPage = Math.ceil(resultsNo / 5);
        switch (vector) {
            case 'left':
                if (actualPage===1) {
                    actualPage = maxPage;
                } else {
                    actualPage--;
                }
                break;
            case 'right':
                if (actualPage===maxPage) {
                    actualPage=1;
                } else {
                    actualPage++;
                }
                break;
            default:
                break;
        }
        //1: from:0 to: 5
        //2: from:5 to: 10
        //3: from 10 to:15
        //4: from 15 to:20
        //default from:(actualPage-1)*5 to:5*actualPage
        const from = Math.round((actualPage-1)*5);
        const to= Math.round(actualPage*5);
        setPagination({
            actualPage:actualPage, from:from, to:to
        })
    }

    let response = null;
    if (loading) {
        response = <Loader />
    } else if (media && media.length>0) {
        response =
            (<div className={classes.MediaBox}>
                <div className={classes.MediaBoxHeader}>Media: Video</div>
                <div className={classes.MediaBoxCarouselContainer}>
                    <div className={classes.MediaBoxPagination} onClick={()=>changePage('left')}>
                        <div className={classes.arrow}><ArrowLeft color={'white'}/></div>
                    </div>
                    <div className={classes.MediaBoxCarousel}>
                        
                        {media!==null ? media.slice(pagination.from,pagination.to).map((el,index)=>(
                           
                           <div className={classes.MediaBoxItem} key={el.id}>
                               <MediaSummaryMovie  data={el} click={onMovieClick}/>
                           </div>
                        
                        )) : null}

                    <MoviePlayer show={MoviePlayerSettings.show} toggleMoviePlayer={onMovieClick} selectedMovie={MoviePlayerSettings.selectedShow} />
                    </div>
                    <div className={classes.MediaBoxPagination} onClick={()=>changePage('right')}><div className={classes.arrow}><ArrowRight color={'white'}/></div></div>
                </div>
            </div>)
    } else {
        response = null;
    }

    return (response);

};

const mapStateToProps = (state) => {
    return {
        currentShowID: state.main.currentShowID,
        configuration: state.main.configuration
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(MediaBoxMovies);