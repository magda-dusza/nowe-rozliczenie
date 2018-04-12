import {NavLink} from 'react-router-dom';
import React from 'react';

export class Navigation extends React.Component {
    render(){
        return(
            <ul>
                <li>Transakcje</li>
                <li>Ustawienia</li>
                <li>Statystyki</li>
            </ul>
        );
    }
}