import React from 'react';

export class ActionBar extends React.Component {
    fileChanged = (event)=>{
        this.files = event.target.files;
        for(let key in this.files){

            if(!this.files.hasOwnProperty(key)){
                return;
            }
            this.fileName += this.fileName ? ' , ': '';
            this.fileName += this.files[key].name;

            var fileReader = new FileReader();
            fileReader.readAsText( this.files[key], 'windows-1250');
            fileReader.onload = (e) => {
                this.props.fileLoaded(this.fileName, e.target.result);
            }
        };
    }
    render(){
        return (
            <div>
                <input className="btn btn-secondary top-bar" multiple id="file-upload" type="file" onChange={this.fileChanged}/>
                <button>Aktualizuj</button>
                <button>Export</button>
            </div>
        );
    }
}