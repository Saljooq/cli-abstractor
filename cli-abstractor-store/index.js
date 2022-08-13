#!/usr/bin/env node
import {askForVar} from './prompt.js'
import { writeToStore, readFile, storeJsonCreator, fileWriter } from './io.js'
import { getFileAndFoldersToBeStored } from './getFilesAndToBeStored.js'
import { getFileAndFoldersToIgnore } from './getFileAndFoldersToIgnore.js'
import {isProjectCreator, useForEndUser} from './globalVariables.js'
import data from './store.js'
import updatePackageJson from './updatePackageJson.js'
import {ingest} from './ingest.js'

// This will be running on the end user's computers
async function main(){

    // We grab all the files on the current path
    // TODO : recursively fetch all the files in the folders in the path

    // This is for CLI developer


    const Blink = "\x1b[5m"
    const FgGreen = "\x1b[32m"
    const BgYellow = "\x1b[43m"
    const FgDefault = '\x1b[0m'


    if (isProjectCreator()){
        updatePackageJson()
    }

    
    const availableFlags = data ? data.content.map(x => x.flag) : []
    console.log(`${FgGreen}Available flags: ${availableFlags}`, `${FgDefault}`)

    // check for flag
    var inFlag = await askForVar('flag')
    inFlag = inFlag === '' ? 'default' : inFlag

    const dataSelected = data ? data.content.filter(x => x.flag === inFlag): []
    
    if (dataSelected.length === 0 )
    {    
        console.log(`nothing matching the flag found. Available flags: ${availableFlags}`)
    }
    else{
        // There shouldn't be more than one modules matching the same flag
        const selectedModule = dataSelected[0]

        // Here we create a map of all the prompt results from the user
        let userDefinedMapping = {}
        for (let unknown of selectedModule.mapping){
            userDefinedMapping[unknown] = await await askForVar(unknown)
        }



        for (let file of selectedModule.content){
            console.log(`+ creating/writing to file ${file.name}`)
            let contentToPrint = ingest(file.content, userDefinedMapping)
            await fileWriter(file.name, contentToPrint)
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