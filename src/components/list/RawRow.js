import React from 'react';

export class RawRow extends React.Component {
    render(){
        if(!this.props.isVisible) {
            return null;
        } 
        const keys = Object.keys(this.props.raw);
        return (
            <div>
                <table>
                    <tbody>
                        {keys.map((key)=>{
                            return <tr key={key}><td>{key}</td><td>{this.props.raw[key]}</td></tr>
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
}