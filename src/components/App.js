import {BrowserRouter as Router} from 'react-router-dom';

import {Main} from './Main';
import React from 'react';

export class App extends React.Component {
    render(){
        return (
            <div>
                <Router>
                    
                
                    <Main/>
                </Router>
            </div>
        );
    }
}