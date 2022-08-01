#!/usr/bin/env node
import {askForVar} from './prompt.js'
import { writeToStore, readFile, storeJsonCreator, fileWriter } from './io.js'
import { getFileAndFoldersToBeStored } from './getFilesAndToBeStored.js'
import { getFileAndFoldersToIgnore } from './getFileAndFoldersToIgnore.js'
import {isProjectCreator, useForEndUser} from './globalVariables.js'
import data from './store.js'
import updatePackageJson from './updatePackageJson.js'


async function main(){

    // We grab all the files on the current path
    // TODO : recursively fetch all the files in the folders in the path

    // This is for CLI developer
    if (!useForEndUser())
    {
        if (isProjectCreator()){
            updatePackageJson()
        }

        const listOfFilesToIgnore = await getFileAndFoldersToIgnore()

        !isProjectCreator() && (listOfFilesToIgnore.push('.cli-ignore'))

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

        const availableFlags = data ? data.content.map(x => x.flag) : []

        if (availableFlags.includes(in_flag)){
            console.log(`There appears to be a conflict. Existing flags: ${availableFlags}`+
            '\nAre you sure you want to overwrite existing files? - check cli-abstractor-store/store.js')
            console.log("Do you want to continue")
            var answer = await askForVar("answer")
            if (answer !== 'yes' && answer !== 'y'){
                return
            }
        }

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
    }
    // This will be running on the end user's computers
    else{
        const availableFlags = data.content.map(x => x.flag)
        console.log(`Available flags: ${availableFlags}`)

        // check for flag
        const inFlag = await askForVar('flag')

        const dataSelected = data.content.filter(x => x.flag === inFlag)
        
        if (dataSelected.length === 0 )
        {    
            console.log(`nothing matching the flag found. Available flags: ${availableFlags}`)
        }
        else{
            // There shouldn't be more than one modules matching the same flag
            const selectedModule = dataSelected[0]

            for (let file of selectedModule.content){
                console.log(`+ creating/writing to file ${file.name}`)
                await fileWriter(file.name, file.content)
            }
        }

    }

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