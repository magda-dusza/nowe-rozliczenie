export function processIng (){
    console.log("ing");
}

export function processMillenium (file){
    const lines = file.split("\n");
    const headers = lines[0].split(",");

    let result = [];
    
    lines.forEach((line, index)=>{
        console.log(line)
        if(index===0 || !line){
            return;
        }
        let action = {};
        let raw = {};
        const columns = line.split(",");
        headers.forEach((header, index)=>{
            raw[header] = columns[index];
        });

        action.bank = "Millenium";
        action.date = columns[1];
        // action.userDate = action.date;
        let amount =  clean(columns[7]) ? 
            clean(columns[7]): clean(columns[8]) ? 
            clean(columns[8]) : clean(columns[6]);
        amount = amount ? amount : "";
        amount = parseFloat(amount);
        action.amount = amount;
        action.description = columns[3] ? columns[6]: columns[5];
        if(!action.description || action.description === '""'){
            action.description = columns[3];
        }
        action.category = "Pozostale";
        // action.userCategory = action.category;
        action.raw = raw;

        result.push(action);



    });
    
    return result;
}

function clean(value){
    return (value||"").replace(/["]+/g, "");
}

export function getRaw(){
    
}