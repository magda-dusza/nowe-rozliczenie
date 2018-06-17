import {NavLink} from 'react-router-dom';
import React from 'react';
import './styles/Navigation.css';

export class Navigation extends React.Component {
    render(){
        return(
            <div className="main-menu">
                <a className="navbar-brand" href="#">
                    <img src="/src/assets/icons/chart.png" width="30" height="30" className="brand" alt="chart"/>
                    Rozliczenie 
                </a>
                <div className="nav">
                    <a className="nav-link active">Transakcje</a>
                    <a className="nav-link">Ustawienia</a>
                    <a className="nav-link">Statystyki</a>
                </div>
            </div>
        );
    }
}