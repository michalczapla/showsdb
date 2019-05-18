import React, {Component} from 'react';
import Modal from '../UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        }
        
        componentDidMount() {
            axios.interceptors.request.use(req => {
                this.setState({error: null})
                return req;
            })
            
            axios.interceptors.response.use(null,error => {
                this.setState({error: error})
            })
        }

        errorModalHandler=() => {
            this.setState({error: null})
        }

        render() {
            return (
                <React.Fragment>
                    <Modal show={this.state.error} toggleModal={this.errorModalHandler} title="Something went wrong ... :(">
                       {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </React.Fragment>
            );
        }
    }
}

export default withErrorHandler;