import React from 'react';
import {BillsTable} from './BillsTable';

export class BillsBase extends React.Component{

render(){

    return(
        <div style={{paddingTop: '100px'}}>
            Hello BILLS
            <BillsTable/>
        </div>
    )
}


}