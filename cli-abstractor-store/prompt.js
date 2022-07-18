import readLine from 'readline'
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
  
    let res;
  
  
    process.stdout.write(`What's the ${varName}?        `);
  
    for await (const line of reader){
      res = line;
      reader.close();
    }
    return res;
  }
