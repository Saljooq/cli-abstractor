#!/usr/bin/env node
import {askForVar} from './prompt.js'
import { writeToStore, readFile, storeJsonCreator, fileWriter } from './io.js'
import { getFileAndFoldersToBeStored } from './getFilesAndToBeStored.js'
import { getFileAndFoldersToIgnore } from './getFileAndFoldersToIgnore.js'
import {isProjectCreator, useForEndUser} from './globalVariables.js'
import data from './store.js'
import updatePackageJson from './updatePackageJson.js'
import {ingest} from './ingest.js'
import makeLogger from './logger.js'

// This will be running on the end user's computers
async function main(){

    const logger = makeLogger()

    if (isProjectCreator()){
        updatePackageJson()
    }

    
    const availableFlags = data ? data.content.map(x => x.flag) : []

    var inFlag
    if (availableFlags.length === 0){
        console.log(logger.warning('no flags found. Ending program.'))
        return
    }else if (availableFlags.length === 1){
        console.log(logger.important(`only one flag available -> ${availableFlags[0]}\nProcessing it by default....`))
        inFlag = availableFlags[0]

    }else{
        console.log(logger.important(`Available flags: ${availableFlags}`))

        // check for flag
        inFlag = await askForVar('flag')
        inFlag = inFlag === '' ? 'default' : inFlag
    }

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

}

main()