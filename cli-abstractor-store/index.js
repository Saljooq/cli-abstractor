#!/usr/bin/env node
import fs from 'fs'
import data from './store.js'
import {askForVar} from './prompt.js'
import { fileWriter, writeToStore, readFile, storeJsonCreator } from './io.js'


async function main(){

    const targetFromHere = "."

    // We grab all the files on the current path
    // TODO : recursively fetch all the files in the folders in the path
    let arr = fs.readdirSync(targetFromHere + '/').map(x => targetFromHere + '/'+x);

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

    const content_of_c_file = await readFile( targetFromHere + '/testInput.c')
    console.log(content_of_c_file);

    const test_for_c_file = storeJsonCreator(content_of_c_file);
    console.log(test_for_c_file)
    writeToStore(test_for_c_file)

    // create a .cli-ignore
    // read the ignore file and get a list of file/folder names
    // dont put the file or foldernames that match the list in the store file/folder list
    // make a copy of all the files in the store along with mapping - with the default flag
    // this should then auto create the index file that would help users access flags and dynamically
    // generate a prompt
    // STAGE 1 COMPLETE
    console.log(process.cwd())
}

main()