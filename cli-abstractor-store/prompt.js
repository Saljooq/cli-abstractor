import readLine from 'readline'
import makeLogger from './logger.js'
/**
 * Simplifies the task of asking the user for an input - without libraries
 * 
 * @param {String} varName 
 * @returns 
 */
 export const askForVar = async (varName ) => {

    const reader = readLine.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    const AsyncReader = async(query) => {
      return new Promise(
        resolve => {
          reader.question(query, answer => {
            reader.close()
            return resolve(answer)
          })
        }
      )
    }

    const logger = makeLogger()
    const outData = await AsyncReader(logger.prompt(`What's the ${varName}?        `))

    return outData
  
  }
