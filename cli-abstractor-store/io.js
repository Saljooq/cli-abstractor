import { promisify } from 'util';
import { regexScan } from './regex.js';
import fs from 'fs'
import path from 'path'

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
 export const fileWriter = async (fileName, content) => {
    async function isExists(path) {
        try {
            await fs.access(path);
            return true;
        } catch {
            return false;
        }
    };
      
    const errorLog = (custom_string) =>{

        return (err) => {
            if (err){
                console.log(`Error writing to the ${custom_string}. Name : ${fileName}: ${err}`);
            }
        }
    }

    try {
        const dirname = path.dirname(fileName);
        const exist = await isExists(dirname);
        if (!exist) {
            await fs.mkdirSync(dirname, {recursive: true}, errorLog('directory'));
        }
        
        await fs.writeFile(fileName, content, errorLog('file'))

    } catch (err) {
        console.log(`Error writing to file ${fileName}: ${err}`);
    }
      

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
    var inputs = new Set()
    
    for (let files of content){
        let newMatch = regexScan(files["content"])
        newMatch.length > 0 && newMatch.forEach(x => inputs.add(x))
        console.log([...inputs])
    }

    content = {
        projectName: "",
        description: "",
        content : [
            {
                flag : flag,
                content : content,
                mapping : [...inputs]
            }
        ]
    };

    return content;
}
