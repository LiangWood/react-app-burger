import React from 'react';
import HeaderLogo from '../../assets/images/burger-logo.png';
import classes from './Logo.module.css';

const logo = (props) => (
    <img className={classes.Logo} src={HeaderLogo} alt="Burger" />
);

export default logo;