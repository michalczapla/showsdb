import React, {Component} from 'react';
import classes from './SearchBox.module.css';
import InputBox from './InputBox/InputBox';
import ResultList from './ResultList/ResultList';
import axios from './../../helpers/axios-external';
import api_key from './../../helpers/APIKey';
import NoResults from './ResultList/ResultItem/ResultItemNoResults';
import Loading from '../Loading/Loading';

class SearchBox extends Component {
    state = {
        searchResults: null,
        searchString:null,
        actualPage:null,
        totalPages:null,
        totalResults: -1,
        totalLoadedResults: -1,
        configuration: null
      }

    searchInputHandler = async (event) => {
        if (event.key === 'Enter' || event.keyCode === 13) {
            const value = event.target.value.trim();
            if (value!=='') {
                const search_request_url = `https://api.themoviedb.org/3/search/tv?api_key=${api_key}&language=en-US&query=${value}&page=${1}`;

                this.setState({
                    searchResults: null,
                    searchString:null,
                    actualPage:null,
                    totalPages:null,
                    totalResults: 'pending',
                    totalLoadedResults: -1,});
                
                const response = await axios(search_request_url);
                
                this.setState({searchResults: response.data.results, searchString: value, actualPage: response.data.page, totalPages: response.data.total_pages, totalResults: response.data.total_results, totalLoadedResults: response.data.results.length});
                

            }
        }
      };

    render() {
        let resultToRender = null;
        if (this.state.totalResults===0) {
            resultToRender = (<NoResults query={this.state.searchString}/>);
        }
        else if (this.state.searchResults!==null && this.props.configuration!==null) {
            resultToRender = (<ResultList results={this.state.searchResults} configuration={this.props.configuration}/>);
        } else if (this.state.totalResults === 'pending') {
            resultToRender = (<Loading />);
        } 

        return (
            <div className={classes.Container}>
                 <InputBox title='showsDB REACT v0.03' placeholder='find' enterHandler={this.searchInputHandler}/>
                    {resultToRender}
                 <div>PAGINATION</div>
            </div>
        );
    }
}

export default SearchBox;

// {(this.state.searchResults!==null && this.props.configuration!==null) ? <ResultList results={this.state.searchResults} configuration={this.props.configuration}/> : null}