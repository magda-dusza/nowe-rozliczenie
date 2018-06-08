import React from 'react';

import '../styles/ActionBar.css';

export class ActionBar extends React.Component {
    fileChanged = (event)=>{
        this.files = event.target.files;
        for(let key in this.files){

            if(!this.files.hasOwnProperty(key)){
                return;
            }
            this.fileName = this.files[key].name;

            var fileReader = new FileReader();
           
            fileReader.onload = (e) => {
                this.props.fileLoaded(this.fileName, e.target.result);
            }
            fileReader.readAsText( this.files[key], 'windows-1250');
        };
    }
    render(){
        return (
            <div className="action-bar">
                <input className="btn btn-secondary top-bar" multiple id="file-upload" type="file" onChange={this.fileChanged}/>
                <button onClick={this.props.updateLists}>Aktualizuj</button>
                <button>Export</button>
            </div>
        );
    }
}