import { closingSquence, openingSequence } from "./regex.js";

export const ingest =  (fileContent, mappings) =>{

    let data = fileContent;

    for (let i of Object.keys(mappings)){
  
      const res = mappings[i];
  
      const st = openingSequence + '\\s*' + i + '\\s*' + closingSquence

      data = data.replace(new RegExp(st, 'g'), res);
  
    }
  
    return data
  }