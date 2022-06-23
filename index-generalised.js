#!/usr/bin/env node
import fs from 'fs'

const readFile = (fileName) => {
    fs.readFile(fileName, 'utf8', (err, data) => {
        if (err){
            console.log(err);
            return null;
        }
        // console.log(data);
        // writer('store.json', data)
        return data;
    })
}

const writer = (fileName, content)=>{
    const inputs = regexScan(content);
    content = JSON.stringify({content : content, 
        mapping : inputs
    }, null, 4);
    fs.writeFile(fileName, content, err => {
        if (err){
            console.log(`Error writing to file ${fileName}: ${err}`);
        }
    })
    
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

    return [...allInput];
}


function main(){

    // We grab all the files on the current path
    // TODO : recursively fetch all the files in the folders in the path
    let arr = fs.readdirSync('.');

    const isFile = fileName => {
        return fs.lstatSync(fileName).isFile();
    };
    
    const files = arr.filter(x => isFile(x));

    console.log(`files in the current folder are : ${files}`)

    // unless specified we put everything in the default flag

    // First we make an array of all the file names and their content.

    // Next we send all of those to the regex matcher and store all the matches into an array

    // Next we create a set of all the variable names


    /**
    {
        project-name : "",
        description : "",
        content : [
            {
                flag : default
                fileContent : [
                    { 
                        name : "index-client-module.js",
                        content : "Something something"

                    },
                    {
                        name : "README.md",
                        content : "Something something......"
                    }
                ]
                mappings : [ "var1", "var2" ]
            },

        ]
    }
    */
}

main()