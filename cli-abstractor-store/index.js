#!/usr/bin/env node
import fs from 'fs'
import data from './store.js'
import {askForVar} from './prompt.js'
import { fileWriter, writeToStore, readFile, storeJsonCreator } from './io.js'
import { getFileAndFoldersToBeStored } from './getFilesAndToBeStored.js'
import { getFileAndFoldersToIgnore } from './getFileAndFoldersToIgnore.js'


async function main(){

    // We grab all the files on the current path
    // TODO : recursively fetch all the files in the folders in the path

    const listOfFilesToIgnore = await getFileAndFoldersToIgnore()
    const listOfFilesToStore = getFileAndFoldersToBeStored(listOfFilesToIgnore)
    
    console.log("Here is the list of files that would be added")
    console.log(listOfFilesToStore)

    console.log("Do you want to continue")
    var answer = await askForVar("answer")
    if (answer !== 'yes' && answer !== 'y'){
        return
    }

    var in_flag = await askForVar("Flag");

    in_flag = in_flag === '' ? 'default' : in_flag;

    const list_of_files_and_content = []

    for (let fileName of listOfFilesToStore){
        const content_of_file = await readFile(fileName)
        console.log(content_of_file);

        let new_file_content = {}
        new_file_content['name'] = fileName
        new_file_content['content'] = content_of_file
        list_of_files_and_content.push(new_file_content)


    }


    const test_for_file = storeJsonCreator(in_flag, list_of_files_and_content);
    console.log(test_for_file)
    writeToStore(test_for_file)


    // create a .cli-ignore
    // read the ignore file and get a list of file/folder names
    // dont put the file or foldernames that match the list in the store file/folder list
    // make a copy of all the files in the store along with mapping - with the default flag
    // this should then auto create the index file that would help users access flags and dynamically
    // generate a prompt
    // STAGE 1 COMPLETE
    // console.log(process.cwd())
}

main()