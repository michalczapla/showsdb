import React, {Component} from 'react';
import classes from './SearchBox.module.css';
import InputBox from './InputBox/InputBox';
import ResultList from './ResultList/ResultList';
import axios from '../../../helpers/axios-external';
import api_key from '../../../helpers/APIKey';
import NoResults from './ResultList/ResultItem/ResultItemNoResults';
import Loading from '../../../components/UI/Loading/Loading';
import Pagination from './Pagination/Pagination';
import withErrorHandler from '../../../components/withErrorHandler/withErrorHandler';
import {connect} from 'react-redux';
import * as ActionCreator from '../../../store/actions/index';

class SearchBox extends Component {
    state = {
        searchResults: null,
        searchString:null,
        actualPage:null,
        actualDownloadedPage: null,
        totalPages:null,
        totalResults: -1,
        totalLoadedResults: -1,
        // configuration: null,
        resultsPerPage: 6,
        loading: false
      }

    getAxiosSearchResults = async (value, page) => {
        const search_request_url = `https://api.themoviedb.org/3/search/tv?api_key=${api_key}&language=en-US&query=${value}&page=${page}`;
        const response = await axios(search_request_url);

        return response;
    }
      
    searchInputHandler = async (event) => {
        if (event.key === 'Enter' || event.keyCode === 13) {
            const value = event.target.value.trim();
            if (value!=='') {
                // const search_request_url = `https://api.themoviedb.org/3/search/tv?api_key=${api_key}&language=en-US&query=${value}&page=${1}`;

                this.setState({
                    searchResults: null,
                    searchString:null,
                    actualPage:null,
                    actualDownloadedPage: null,
                    totalPages:null,
                    totalResults: null,
                    totalLoadedResults: -1,
                    loading: true
                });
                try {
                const response = await this.getAxiosSearchResults(value,1);
                
                this.setState({
                    searchResults: response.data.results, 
                    searchString: value, 
                    actualDownloadedPage: response.data.page, 
                    actualPage: response.data.page, 
                    totalPages: response.data.total_pages, 
                    totalResults: response.data.total_results, 
                    totalLoadedResults: response.data.results.length, 
                    loading: false});

                    // this.props.setCurrentShowID(null);//ustaqwienie aktualnie wyświetlanego serialu na domyślny
                }
                catch {
                    this.setState({loading:false})      //w przypadku bledu konczy wyswietlanie loadinga
                }
                

            }
        }
      };

    nextPageHandler = async () => {
        if ((this.state.actualPage+1)*this.state.resultsPerPage >= this.state.totalLoadedResults && this.state.totalLoadedResults!==this.state.totalResults) {
            this.setState({loading:true})
           
                const response = await this.getAxiosSearchResults(this.state.searchString,this.state.actualDownloadedPage+1);
                if (typeof response !== 'undefined') {
                this.setState((prevState) => ({
                    searchResults: [...prevState.searchResults, ...response.data.results],  
                    actualPage: prevState.actualPage +1,  
                    actualDownloadedPage: response.data.page, 
                    totalLoadedResults: prevState.totalLoadedResults + response.data.results.length,
                    loading:false}
                    ));
                } else {        //warunejk, kiedy wystapil blad - resetowanie stanu komponentu 
                    this.setState({ searchResults: null,
                        searchString:null,
                        actualPage:null,
                        actualDownloadedPage: null,
                        totalPages:null,
                        totalResults: null,
                        totalLoadedResults: -1,
                        loading: false})      //w przypadku bledu konczy wyswietlanie loadinga
                }
            

        } else {
        this.setState((prevState) => ({actualPage: prevState.actualPage +1 }));
        }
    };

    prevPageHandler = () => {
        this.setState((prevState) => ({actualPage: prevState.actualPage -1 }));

    };

    render() {
        let resultToRender = null;
        if (this.state.loading === true) {
            resultToRender = (<Loading />);
        } else if (this.state.totalResults===0) {
            resultToRender = (<NoResults query={this.state.searchString}/>);
        } else if (this.state.searchResults!==null && this.props.configuration!==null) {
            const from = (this.state.actualPage-1)*this.state.resultsPerPage;
            const to = (this.state.actualPage-1)*this.state.resultsPerPage +this.state.resultsPerPage; 
            resultToRender = (<ResultList results={this.state.searchResults} from={from} to={to}/>);
        }  

        return (
            <div className={classes.Container}>
                 <InputBox title={this.props.title} placeholder='find' enterHandler={this.searchInputHandler}/>
                    {resultToRender}
                 <Pagination actualPage={this.state.actualPage} totalResults={this.state.totalResults} resultsPerPage={this.state.resultsPerPage} prevPage={this.prevPageHandler} nextPage={this.nextPageHandler}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {

        configuration: state.configuration
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setCurrentShowID: (id)=>dispatch(ActionCreator.setCurrentShowID(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(SearchBox, axios));
