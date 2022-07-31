import {readFile, fileWriter} from './io.js'


async function updatePackageJson(){

    console.log("We will begin upgrading 'bin', 'type' and 'main' -- this is needed to make this CLI functional")
    

    const packageRawContent = await readFile('./package.json')
    const packageContent = JSON.parse(packageRawContent)

    packageContent['main'] = "./cli-abstractor-store/index.js"
    packageContent['type'] = "module"
    packageContent['bin'] = "./cli-abstractor-store/index.js"

    const finalOutput = JSON.stringify(packageContent, null, 2)

    fileWriter('package.json', finalOutput)

}


export default updatePackageJson