import {BrowserRouter as Router} from 'react-router-dom';
import {Navigation} from './Navigation';
import {Main} from './Main';
import React from 'react';

export class App extends React.Component {
    render(){
        return (
            <div>
                <Navigation/>
                <Router>
                    <Main/>
                </Router>
            </div>
        );
    }
}