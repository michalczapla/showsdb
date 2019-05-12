import React, {Component} from 'react';
import classes from './SearchBox.module.css';
import InputBox from './InputBox/InputBox';
import ResultList from './ResultList/ResultList';

class SearchBox extends Component {

    render() {
        return (
            <div className={classes.Container}>
                 <InputBox title='showsDB REACT v0.01' placeholder='find' enterHandler={this.props.enterHandler}/>
                 {(this.props.results!==null && this.props.configuration!==null) ? <ResultList results={this.props.results} configuration={this.props.configuration}/> : null}
                
                 <div>PAGINATION</div>
            </div>
        );
    }
}

export default SearchBox;