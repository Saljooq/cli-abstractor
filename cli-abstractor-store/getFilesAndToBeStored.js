import fs from 'fs'
/**
 * This function is used to get the list of all the files and folders that
 * shouldn't be ignored
 * 
 * @returns Array of String or null
 */
export const getFileAndFoldersToBeStored = (listOfFilesAndFoldersToIgnore) => {

    listOfFilesAndFoldersToIgnore = treatList(listOfFilesAndFoldersToIgnore)
    const finalCatalogOfFiles = []
    const ignore = checkForIgnoreWithList(listOfFilesAndFoldersToIgnore)

    // This should get us the current path of the user
    const targetFromHere = "."

    // Next, recursively fetch all the files in the folders in the path
    let arr = fs.readdirSync(`${targetFromHere}/`).map(x => `${targetFromHere}/${x}`);
    
    const files = arr.filter(isFile).filter(ignore);

    files && finalCatalogOfFiles.push(...files)

    const folders = arr.filter(x => !isFile(x))

    while (folders.length > 0){

        const folderName = folders.pop()

        console.log(folderName)
        
        const inside = fs.readdirSync(folderName).map(x => `${folderName}/${x}`)

        const filesInside = inside.filter(isFile).filter(ignore)

        filesInside && finalCatalogOfFiles.push(...filesInside)

        console.log(`files in ${folderName} are ${filesInside}`)

        const foldersInside = inside.filter(x => !isFile(x))

        foldersInside && folders.push(...foldersInside)
    }

    return finalCatalogOfFiles
}

/**
 * Checks if a file is a file, returns true if file
 * false if folder
 */
const isFile = fileName => {
    return fs.lstatSync(fileName).isFile();
};

/**
 * This should do some treatment to allow us to check 
 * for string comparison
 * 
 * @param {String Array} listOfFilesAndFoldersToIgnore 
 */
const treatList = (listOfFilesAndFoldersToIgnore) => {

    const finalList = []

    for (let name in listOfFilesAndFoldersToIgnore){
        if (name.startsWith('./')){
            finalList.push(finalList)
        }
        else if (name.startsWith('/')){
            finalList.push(`.{name}`)
        }
        else{
            finalList.push(`./{name}`)
        }
    }

    return finalList
}

/**
 * Should return a boolean if a word starts with
 * any of the to be ignored words
 * 
 * @param {String} word 
 * @param {String[]} listOfIgnores 
 */
const checkForIgnore = (word, listOfIgnores) => {

    for (let name in listOfIgnores){
        if (word.startsWith(name)){
            return false
        }
    }

    return true

}

/**
 * This function utilizes currying to allow for using checkForIgnoreFunction 
 * with filter
 * 
 * @param {String[]} listOfIgnores 
 * @returns function that takes a string and returns boolean
 */

const checkForIgnoreWithList = (listOfIgnores) => {
    return (word) => checkForIgnore(word, listOfIgnores)
}