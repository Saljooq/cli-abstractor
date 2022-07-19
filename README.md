# cli-abstractor
This can be potentially be used by developers to create a CLI that would allow code reuse - and a CLI to prompt them for necessary information


Notes on how to create cli-abstractor:

0. First the user needs to create some sort of a files that will be reproduced -> {{}} might be good

Test for regex:
```
let word = "{{Hello}}twist"
word = word.replace(/{{\s*Hello\s*}}/, 'ttff')
console.log(word)
```
Test for variable regex:
```
let word = "{{Hello}}twist"
let he = 'Hello'
const st = '{{\\s*' + he + '\\s*}}'
console.log(st)

const hel = word.match(/{{(.*?)}}/)
console.log(hel)

word = word.replace(new RegExp(st), 'ttff');
console.log(word)

word = word.replace(/{{\s*Hello\s*}}/, 'ttff')
console.log(word)
```

1. create abstract data-structures to get the required input from the user
1.1. Scan all the files - this can be used to produce the required options too

==> need a POC that it can be done with the secondary cli i.e. can our module scan the files stored in the module and write onto the main folder

Note: It appears that the current i.e. '.' is whatever path the user is on => this would be useful for producing all the secondary files in the right folder.
However, this means that finding the location of all the static files will be very hard for the final user.
To ease that we can create a basic json -> escaping is done internally, these api's make most of it happen:

```
JSON.parse(data)
JSON.stringify(obj)
```

==> POC for 1.1
```
let word = "{{Hello}} to the world this is your {{captain}}"
const regex = /{{[^{{]*}}/g;
const found = [...word.matchAll(regex)];

const excludeBrack = (s) => {
  let res = "";
  for (let i = 0; i < s.length; i++){
    if (s[i]!== "{" && s[i]!== "}")
    {
      res += s[i]
    }
  }
  return res.trim()
}
console.log(found.map(x => excludeBrack(x[0])))
```


2. create an abstract class to make functions for the cli-queries 
2.1. Once the options from the users are obtained - can be stored as a json and fed to the factory

the final user upon running the module -> will be calling the abtract funtion that will fist load all the required data onto the memory from json and then proceed to write to all the files in the the user's folder


3. Include instructions on publishing and how to use it 


# GOAL FOR PHASE 1

- create a .cli-ignore
- read the ignore file and get a list of file/folder names
- dont put the file or foldernames that match the list in the store file/folder list
- make a copy of all the files in the store along with mapping - with the default flag
- this should then auto create the index file that would help users access flags and dynamically
- generate a prompt
- STAGE 1 COMPLETE

Sample of ./cli-abstractor-store.js:

```javascript

const data = {
        project-name : "",
        description : "",
        content : [
            {
                flag : default
                content : [
                    { 
                        type: "file",
                        name : "index-client-module.js",
                        content : "Something something"

                    },
                    {
                        type: "file"
                        name : "README.md",
                        content : "Something something......"
                    },
                    {
                        type: "folder",
                        name: "main-logic"
                    }
                ]
                mappings : [ "var1", "var2" ]
            },

        ]
    }

export default data;
```