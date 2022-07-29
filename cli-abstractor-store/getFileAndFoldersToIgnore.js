
import { readFile } from "./io.js"
/**
 * This function is used to get the list of string that will be
 * use to ignore files and folders in store. It should return empty array 
 * if no .cli-ignore exists otherwise an array of string of files and folders to ignore
 * 
 * @returns Array of String
 */
export const  getFileAndFoldersToIgnore = async () => {
    var content_of_ignore_file = await readFile( './cli-abstractor-store/.cli-ignore-')

    if (content_of_ignore_file === null) { 
        content_of_ignore_file = await readFile( './.cli-ignore')
    }

    if (content_of_ignore_file !== null) { 
        return content_of_ignore_file.split("\n").map(x => x.trimEnd('\r'))
    }

    return []
}