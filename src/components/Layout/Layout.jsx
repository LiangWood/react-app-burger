import React, {Component} from 'react';
import Aux from 'react-aux';
// import Aux from '../../hoc/Aux';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import classes from './Layout.module.css';

class Layout extends Component {
    state = {
        showSideDrawer: false
    };

    sideDrawerCloseHandler = () => {
        this.setState({showSideDrawer: false});
    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return {showSideDrawer: !prevState.showSideDrawer}
        });
    }

    render () {
       return (
        <Aux>
            <Toolbar drawerToogleClicked={this.sideDrawerToggleHandler} />
            <SideDrawer 
            open={this.state.showSideDrawer}
            closed={this.sideDrawerCloseHandler}/>
            <main className={classes.Content}>
                {this.props.children}
            </main>
        </Aux>
       ); 
    }
}

export default Layout;