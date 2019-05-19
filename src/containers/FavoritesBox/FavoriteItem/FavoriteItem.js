import React from 'react';
import classes from './FavoriteItem.module.css';

const favoriteItem = (props) => (
  <a className={(props.totalEpisodes===props.totalWatchedEpisodes) ? [classes.FavoriteItem, classes.AllWatched].join(' ') : [classes.FavoriteItem, classes.NotAllWatched].join(' ')} onClick={()=>props.selectShow(props.id)} href={'#'+props.href} >
    {(props.imgsrc) ? <img className={classes.BackgroundImage} src={props.imgsrc} alt={props.title}/> : null}
    <div className={classes.Container}>
        <div className={classes.Title}>{props.title}</div>
        <div className={classes.DataContainer}>
            <div className={classes.Data}>
                <div className={classes.DataNumber}>{props.totalEpisodes}</div>
                <div className={classes.DataDescription}>Total aired episodes</div>
            </div>
            <div className={classes.Data}>
                <div className={classes.DataNumber}>{props.totalWatchedEpisodes}</div>
                <div className={classes.DataDescription}>Not yet watched</div>
            </div>
        </div>
    </div>
  </a>  
);

export default favoriteItem;