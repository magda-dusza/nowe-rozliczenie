import {TransactionList} from './TransactionList';
import {Switch, Route} from 'react-router-dom';
import React from 'react';

export class Main extends React.Component {
    render(){
        return (
            <Switch>
                <Route exact path='/' component={TransactionList}/>
            </Switch>
        );
    }
}