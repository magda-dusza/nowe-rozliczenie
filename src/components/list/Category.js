import React from 'react';
import {Transaction} from './Transaction'

import "./list.css";

export class Category extends React.Component {
    
    render(){
        return (
            <div style={{paddingTop: '2rem'}}>
                <div style={{fontSize:'2rem', fontWeight:'bold', padding: '1rem 0'}}>{this.props.index}</div>
                <div className="list-headers">
                    <div className="list-bank">Bank</div>
                    <div className="list-date">Date</div>
                    <div className="list-amount">Amount</div>
                    <div className="list-description">Description</div>
                    <div className="list-category">Category</div>
                    <div className="list-actions">Actions</div>
                </div>
                {this.props.data.map((t, index)=>{
                    return <Transaction categories={this.props.categories} transaction={t} key={`trans_${index}`}/>
                })}
            </div>
        );
    }
}