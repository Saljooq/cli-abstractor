#!/usr/bin/env node
import fs from 'fs'
import { promisify } from 'util';
import readLine from 'readline'
import data from './store.js'

/**
 * This should get the content of the file as String from a filenamesfread
 * 
 * @param {String} fileName 
 * @returns 
 */
const readFile = async (fileName) => {

    try{
        const readFile = promisify(fs.readFile);
        const data_out = await readFile(fileName, 'utf8')

        return data_out;
    }catch(e){
        console.log(e)
        return null
    }
}

/**
 * This is a general purpose function to be used for creating the json
 * and objects to be used for the store
 */
const storeJsonCreator = ( content)=>{
    const inputs = regexScan(content);
    content = {
        content : content, 
        mapping : inputs
    };

    return content;
}

const writeToStore = (value) => {
    content = JSON.stringify(value, null, 4);


    const data = `const data = ${content}\n\nexport default data;`

    // To be used for all content in sotre
    const fileName = `./store.js`

    fileWriter(fileName, data);
}

/**
 * General purpose function, takes the filename and the string to be written to it
 * 
 * @param {String} fileName 
 * @param {String} content 
 */
const fileWriter = (fileName, content) => {
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
/**
 * Simplifies the task of asking the user for an input - without libraries
 * 
 * @param {String} varName 
 * @returns 
 */
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
    let arr = fs.readdirSync('./').map(x => './'+x);

    const isFile = fileName => {
        return fs.lstatSync(fileName).isFile();
    };
    
    const files = arr.filter(isFile);

    console.log(`files in the current folder are : ${files}`)

    const folders = arr.filter(x => !isFile(x))

    while (folders.length > 0){
        const folderName = folders.pop()

        console.log(folderName)
        
        const inside = fs.readdirSync(folderName).map(x => folderName + "/" + x)
        console.log(`files in ${folderName} are ${inside.filter(isFile)}`)

        const foldersInside = inside.filter(x => !isFile(x))

        foldersInside && folders.push(...foldersInside)
    }

    // unless specified we put everything in the default flag

    var in_flag = await askForVar("Flag");

    in_flag = in_flag === '' ? 'default' : in_flag;

    console.log(in_flag);



    // console.log(data)

    const content_of_c_file = await readFile('./testInput.c')
    console.log(content_of_c_file);

    const test_for_c_file = storeJsonCreator(content_of_c_file);

    // console.log(test_for_c_file);


    // const data_json = await readFile('./store.json')
    // console.log(data_json);
    // const data = JSON.parse(data_json)
    // console.log(data.mapping)


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
                content : [
                    { 
                        type: "file",
                        name : "index-client-module.js",
                        content : "Something something"

                    },
                    {
                        type: "file"
                        name : "README.md",
                        content : "Something something......"
                    },
                    {
                        type: "folder",
                        name: "main-logic"
                    }
                ]
                mappings : [ "var1", "var2" ]
            },

        ]
    }
    */
}

main()