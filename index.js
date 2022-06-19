#!/usr/bin/env node
import fs from 'fs'


fs.readFile('./testInput.c', 'utf8', (err, data) => {
    if (err){
        console.log(err);
        return;
    }
    console.log(data);
    writer('store.json', data)
})

const writer = (fileName, content)=>{
    content = JSON.stringify({content : content});
    fs.writeFile(fileName, content, err => {
        if (err){
            console.log(`Error writing to file ${fileName}: ${err}`);
        }
    })
    regexScan(content);
}

const regexScan = (content) => {
    // Essentially we're asking for matches with starting
    // and ending jinja brackets without middle part
    const regex = /{{[^{{]*}}/g;
    const found = [...content.matchAll(regex)];

    const excludeBrack = (s) => {
    let res = "";
    for (let i = 0; i < s.length; i++){
        if (s[i]!== "{" && s[i]!== "}")
        {
            res += s[i]
        }
    }
    return res.trim()
    }
    const allInputsWithRepeat = found.map(x => excludeBrack(x[0]));
    console.log(allInputsWithRepeat)
    const allInput = new Set(allInputsWithRepeat)
    console.log([...allInput])
}
console.log('Hello World!')