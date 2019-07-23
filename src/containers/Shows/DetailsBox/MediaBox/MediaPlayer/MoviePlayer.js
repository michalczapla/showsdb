import React from 'react';
import classes from './MoviePlayer.module.css';
import Backdrop from '../../../../../components/UI/Backdrop/Backdrop';
import CloseIcon from 'react-ionicons/lib/MdClose';

const MoviePlayer = (props) => {


    return (
    <React.Fragment>
        <Backdrop show={props.show} clicked={()=>props.toggleMoviePlayer(null)}></Backdrop>
        <div className={classes.MoviePlayer} style={{
             transform: props.show ? 'translate(-50%,-50%)' : 'translate(-300vh, -300vw)',        //zmiana pozycji, aby modal nie zasłaniał komponentów na stronie, nawet jeżeli nie jest wyświetklany
            opacity: props.show ? '1' : '0'}}> 
            {(props.selectedMovie) ? 
            <div className={classes.PlayerContainer}>
                <div className={classes.Header}>
                    <div className={classes.Title}>{props.selectedMovie.name}</div>
                    <div className={classes.CloseButton} onClick={()=>props.toggleMoviePlayer(null)}><CloseIcon color="white"/></div>
                </div>
                    <iframe className={classes.Player} height="100%" width="100%" title="YoutubePlayer" src={"https://www.youtube.com/embed/"+props.selectedMovie.key}></iframe>

            </div>
            : null}
        </div>
    </React.Fragment>
    );

};

export default MoviePlayer;