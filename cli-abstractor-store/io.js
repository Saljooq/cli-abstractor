import { promisify } from 'util';
import { regexScan } from './regex.js';
import fs from 'fs'

/**
 * This should get the content of the file as String from a filenamesfread
 * 
 * @param {String} fileName 
 * @returns 
 */
 export const readFile = async (fileName) => {

    try{
        const readFile = promisify(fs.readFile);
        const data_out = await readFile(fileName, 'utf8')

        return data_out;
    }catch(e){
        // console.log(e)
        return null
    }
}

/**
 * General purpose function, takes the filename and the string to be written to it
 * 
 * @param {String} fileName 
 * @param {String} content 
 */
 export const fileWriter = (fileName, content) => {
    fs.writeFile(fileName, content, err => {
        if (err){
            console.log(`Error writing to file ${fileName}: ${err}`);
        }
    })
}
/**
 * This should take a JSON and save a stringized version on it in store.js
 * 
 * @param {JSON} value 
 */
export const writeToStore = (value) => {
    const content = JSON.stringify(value, null, 4);


    const data = `const data = ${content}\n\nexport default data;`

    // To be used for all content in sotre
    const fileName = `./cli-abstractor-store/store.js`

    fileWriter(fileName, data);
}

/**
 * This is a general purpose function to be used for creating the json
 * and objects to be used for the store
 * 
 * @param content Array of dictionaries with name and content keys for all the files
 */
 export const storeJsonCreator = (flag, content) => {
    var inputs = null
    
    for (let files of content){
        inputs = regexScan(files["content"], inputs)
    }

    content = {
        projectName: "",
        description: "",
        content : [
            {
                flag : flag,
                content : content,
                mapping : inputs
            }
        ]
    };

    return content;
}
