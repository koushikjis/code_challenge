const { ECANCELED } = require("constants");
const csvParser = require("csv-parse");
const fs = require('fs');
const CSV_WITH_HEADER = true;

fs.readFile("data/employees-list.csv", 'utf8', (err, data) => {
    if (err) throw err;

    csvParser(data, (error, csvContent)=>{
        if(error) throw error;

        printOutput(csvContent, '')
    });
});


const printOutput = (csvContent, mid, indent) => {
    
    indent = indent | 0;
    let allManagers = [];

    // Get all the managers id
    for(let i = (CSV_WITH_HEADER ? 1 : 0); i < csvContent.length; i++){
        allManagers.push(csvContent[i][3]);
    }

    for(let i = (CSV_WITH_HEADER ? 1 : 0); i < csvContent.length; i++){
        let eachRow = csvContent[i];
        if (!eachRow[1] || !eachRow[2])
            continue;

        if(eachRow[1] != '' && eachRow[3] == mid){
            
            console.log(calcIndent(indent) + eachRow[2])

            if(allManagers.find(key => key==eachRow[1])){
                indent ++;
                printOutput(csvContent, eachRow[1], indent)
                indent--;
            } 
        }
    }
}

const calcIndent = num => {
    gap = '';
    num = num < 0 ? 0 : num;
    while(num--){
        gap += " -- "
    }
    return gap;
}