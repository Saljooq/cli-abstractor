import { writeToStore, readFile, storeJsonCreator, fileWriter } from './io.js'
import { getFileAndFoldersToBeStored } from './getFilesAndToBeStored.js'
import { getFileAndFoldersToIgnore } from './getFileAndFoldersToIgnore.js'
import {isProjectCreator, useForEndUser} from './globalVariables.js'
import {askForVar} from './prompt.js'

async function main(){

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


main()