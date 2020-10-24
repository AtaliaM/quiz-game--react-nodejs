import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

class Header extends React.Component {
    render() {
        return (
            <div className="header-container">
                <Link to={'/'}><i className="fas fa-home"></i></Link>
                <Link to={'/user/create'}>Start Here!</Link>
            </div>
        );

    }
}

export default Header;