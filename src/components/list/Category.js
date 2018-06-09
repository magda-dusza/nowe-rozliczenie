import React from 'react';
import {Transaction} from './Transaction'

import "./list.css";

export class Category extends React.Component {
    
    render(){
        return (
            <div class="category-wrapper" style={{paddingTop: '2rem'}}>
                <div style={{fontSize:'2rem', fontWeight:'bold', padding: '1rem 0'}}>{this.props.index}</div>
                <div className="list-headers">
                    <div className="list-lp">Lp.</div>
                    <div className="list-bank">Bank</div>
                    <div className="list-date">Data</div>
                    <div className="list-amount">Kwota</div>
                    <div className="list-description">Opis</div>
                    <div className="list-category">Kategoria</div>
                    <div className="list-actions">Akcje</div>
                </div>
                {this.props.data.map((t, index)=>{
                    return <Transaction categories={this.props.categories} transaction={t} key={`trans_${index}`}/>
                })}
            </div>
        );
    }
}