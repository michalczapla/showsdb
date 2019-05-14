import React from 'react';
import classes from './Pagination.module.css';
import PaginationLeft from 'react-ionicons/lib/MdArrowRoundBack';
import PaginationRight from 'react-ionicons/lib/MdArrowRoundForward';

const pagination = (props) => {
    const totalPages = Math.ceil(props.totalResults / props.resultsPerPage);
    
    if (totalPages>1) {
    return (
    <div className={classes.Pagination}>
        {(props.actualPage!==1) ? <button className={classes.PaginationLink} onClick={props.prevPage}><PaginationLeft color='#ffd700'/></button> : null}
        <div className={classes.PaginationSummary}>{props.actualPage}/{totalPages}</div>
        {(props.actualPage!==totalPages) ? <button className={classes.PaginationLink} onClick={props.nextPage}><PaginationRight color='#ffd700'/></button> : null}
    </div>
    );
    } else {
        return null;
    }
};

export default pagination;