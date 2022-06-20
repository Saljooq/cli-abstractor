#!/usr/bin/env node

import fs from 'fs'
import readLine from 'readline'


const askForVar = async (varName) => {


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


  

  
const ingest = async (dataIn, mappings) =>{

  let data = dataIn;

  console.log(mappings)
  for (let i of mappings){

    const res = await askForVar(i);

    const st = '{{\\s*' + i + '\\s*}}'
    // console.log(res)


    data = data.replace(new RegExp(st, 'g'), res);

  }

  writer('testOutput.c', data);
}


const writer = (fileName, content)=>{
  fs.writeFile(fileName, content, err => {
      if (err){
          console.log(`Error writing to file ${fileName}: ${err}`);
      }
  })
  
}

const main = async () => {

  let content, mapping;
  fs.readFile('./store.json', 'utf8', (err, data) => {
    if (err){
        console.log(err);
        return;
    }

    data = JSON.parse(data);

    console.log(data.mapping);

    
    content = data.content;
    mapping = data.mapping;

    ingest(data.content, data.mapping);
  });

 }


 main();