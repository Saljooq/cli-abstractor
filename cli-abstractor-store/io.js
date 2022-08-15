import { promisify } from 'util';
import { regexScan } from './regex.js';
import fs from 'fs'
import path from 'path'
import data from './store.js'
import { isProjectCreator } from './globalVariables.js';

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
    const isExists = async path => {
        return new Promise(resolve => {
          _fs.default.access(path, _fs.default.constants.F_OK, err => {
                if (err) {
                return resolve(false);
                } else {
                return resolve(true);
                }
            });
        });
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
    var updatedValue

    let local_data = data
    if (local_data !== null){
        local_data.content = local_data.content.filter(x => x.flag !== value.content[0].flag)
        local_data.content.push(value.content[0])
        updatedValue = local_data
    }else{
        updatedValue = value
    }

    const content = JSON.stringify(updatedValue, null, 4);

    const to_be_printed = `const data = ${content}\n\nexport default data;`

    // To be used for all content in sotre
    const fileName = `./cli-abstractor-store/store.js`

    fileWriter(fileName, to_be_printed);
}

/**
 * This is a general purpose function to be used for creating the json
 * and objects to be used for the store
 * 
 * @param content Array of dictionaries with name and content keys for all the files
 */
 export const storeJsonCreator = (flag, content) => {
    var inputs = new Set()

    let local_content = treatForCreator(content)
    
    for (let files of local_content){
        let newMatch = regexScan(files["content"])
        newMatch.length > 0 && newMatch.forEach(x => inputs.add(x))
        // console.log([...inputs])
    }

    const output = {
        projectName: "",
        description: "",
        content : [
            {
                flag : flag,
                content : local_content,
                mapping : [...inputs]
            }
        ]
    };

    return output;
}

/**
 * This method helps make sure the content is treated for creator repo - since
 * the store.js for intance need to have null as data - or isCreator boolean should 
 * be false - always
 * 
 * @param {} content 
 * @returns 
 */
const treatForCreator = (content) =>{

    let local_content = content

    if (isProjectCreator()){
        let new_local_content = []
        for (let file of local_content){
            if (file.name === './cli-abstractor-store/store.js'){
                file.content = "const data = null\n\nexport default data;"
            }
            else if (file.name === './cli-abstractor-store/globalVariables.js'){
                file.content = "// This should only be true for me\n// since my repo will be executed\n// and it needs to touch the package.json\n// REMEMBER to mark this false when absorbing\nexport const isProjectCreator = () => {\n    return false\n}\n\n\nexport const useForEndUser = () => {\n    return false\n}\n"
            }

            new_local_content.push(file)
        }
        local_content = new_local_content
    }


    return local_content
}