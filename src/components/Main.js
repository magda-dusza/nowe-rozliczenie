import {TransactionList} from './TransactionList';
import {Switch, Route} from 'react-router-dom';
import {Navigation} from './Navigation';
import React from 'react';
import {BillsBase} from './Bills/BillsBase';
<Navigation/>

export class Main extends React.Component {
    render(){
        return (
            <div>
            <Navigation/>
            <Switch>
                <Route exact path='/' component={TransactionList}/>
                <Route exact path='/bills' component={BillsBase}/>
            </Switch>
            </div>
        );
    }
}