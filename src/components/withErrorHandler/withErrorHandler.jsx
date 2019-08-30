import React, { Component, Fragment} from 'react';
// import Aux from 'react-aux';

import Modal from '../../components/UI/Modal/Modal'

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {

        state = {
            error: null
        }
        
        componentDidMount() {
            axios.interceptors.response.use(req => {
                this.setState({error: null});
                return req
            });
            axios.interceptors.response.use(res => res, error => {
                this.setState({error: error});
            });
        }

        render() {

            return (
                <Fragment>
                    <Modal>
                        Something didn't work!
                    </Modal>
                    <WrappedComponent />
                </Fragment>
            )
        }
    }

}

export default withErrorHandler;