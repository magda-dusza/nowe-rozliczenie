export const prepareDataToExport = (data) => {
    const rows = [...data];
    const wrongProps = ['raw', '__v', '_id', 'userDate', 'userCategory']
    
    const headers = Object.keys(rows[0])
        .filter(elem => !wrongProps.some(e => e === elem))
        .join(',');
    
    const transactions = rows.map(row => {
         return Object.keys(row)
            .filter(key => !wrongProps.some(k => key===k))
            .map(key => row[key])
            .join(',')
        })
        .join('\n');
    
    const result = [headers, transactions].join('\n');
    
        return result;
}

const toDate = (text) => `${text.getDate()}.${text.getMonth()+1}.${text.getFullYear()}`;