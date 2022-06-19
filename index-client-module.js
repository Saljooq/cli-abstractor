#!/usr/bin/env node

import fs from 'fs'
import readLine from 'readline'



const reader = readLine.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  
  reader.question(`What's your name?        `, name => {
    console.log(`Hi ${name}!`);
    reader.close();
  });

  

  
const ingest = (data, mappings) =>{

}