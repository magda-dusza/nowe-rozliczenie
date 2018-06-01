export function processIng (file){
    let lines = file.split("\n");
    let index = 0;
    let length = lines.length;
    while(lines[0].indexOf('Data transakcji')===-1 && index<length){
        lines = lines.splice(1);
        index++;
    }
    if(lines.length === 0){
        return;
    }
    const headers = lines[0].split(";");

    let result = [];
    
    lines.forEach((line, index)=>{
        if(index===0 || !line){
            return;
        }

        let action = {};
        const columns = line.split(";");
        const raw = prepareRaw(headers, columns);

        //create simpler model to display in table
        action.bank = "ING";
        action.date = columns[0];
        
        //amount
        let amount =  clean(columns[8]) ? 
            clean(columns[8]): clean(columns[10]);
        amount = parseFloat(updateNumber(amount));
        action.amount = amount;
        
        //description
        action.description = clean(columns[2]) + " / " + clean(columns[3]);
        if(!action.description || action.description === '""'){
            action.description = "Nie znaleziono";
        }

        action.category = "Pozostale";
        action.raw = raw;

        result.push(action);
    });

    return result;
}

export function processMillenium (file){
    const lines = file.split("\n");
    const headers = lines[0].split(",");

    let result = [];
    
    lines.forEach((line, index)=>{
        if(index===0 || !line){
            return;
        }

        let action = {};
        const columns = line.split(",");
        const raw = prepareRaw(headers, columns);

        //create simpler model to display in table
        action.bank = "Millenium";
        action.date = columns[1];
        
        //amount
        let amount =  clean(columns[7]) ? clean(columns[7])
        : clean(columns[8]) ? clean(columns[8]) : clean(columns[6]);
        amount = amount ? amount : "";
        amount = parseFloat(amount);
        action.amount = amount;
        
        //description
        action.description = columns[3] ? columns[6]: columns[5];
        if(!action.description || action.description === '""'){
            action.description = columns[3];
        }

        action.category = "Pozostale";
        action.raw = raw;

        result.push(action);
    });
    
    return result;
}

function prepareRaw(headers, data){
    let raw = {};

    headers.forEach((header, index)=>{
        raw[header] = data[index];
    });

    return raw;
}

function clean(value){
    return (value||"").replace(/["]+/g, "");
}

function updateNumber(number){
    return (number||"").replace(/[,]+/g, ".")
}