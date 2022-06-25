#!/usr/bin/env node
import fs from 'fs'
import { promisify } from 'util';
import readLine from 'readline'

const readFile = async (fileName) => {

    // await fs.readFile(fileName, 'utf8', (err, data) => {
    //     if (err){
    //         console.log(err);
    //         return null;
    //     }
    //     // console.log(data);
    //     // writer('store.json', data)
    //     console.log(data)
    // })

    try{
        const readFile = promisify(fs.readFile);
        const data_out = await readFile(fileName, 'utf8')

        return data_out;
    }catch(e){
        console.log(e)
        return null
    }
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

const askForVar = async (varName) => {


    const reader = readLine.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  
    let res;
  
  
    process.stdout.write(`What's the ${varName}?        `);
  
    for await (const line of reader){
      res = line;
      reader.close();
    }
    return res;
  }


  async function main(){

    // We grab all the files on the current path
    // TODO : recursively fetch all the files in the folders in the path
    let arr = fs.readdirSync('.');

    const isFile = fileName => {
        return fs.lstatSync(fileName).isFile();
    };
    
    const files = arr.filter(x => isFile(x));

    console.log(`files in the current folder are : ${files}`)

    // unless specified we put everything in the default flag

    var in_flag = await askForVar("Flag");

    in_flag = in_flag === '' ? 'default' : in_flag;

    console.log(in_flag);



    const data_json = await readFile('./store.json')
    const data = JSON.parse(data_json)
    console.log(data.mapping)



    // const store_object = JSON.parse(readFile('./store.json'));
    // console.log(store_object.mapping)

    // console.log(JSON.stringify(store_object))

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