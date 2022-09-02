# cli-abstractor
This can be potentially be used by developers to create a CLI that would allow code reuse - and a CLI to prompt them for necessary information


Notes on how to create a CLI from the extractor:

1. First we create a folder and two inside it - one for CLI and one for test
```bash
$ mkdir cli-container
$ cd cli-container
$ mkdir my-first-cli
$ mkdir cli-test-container
```

2. Next we create an npm package that will be the CLI program and load relevant stuff into it
```bash
$ cd my-first-cli
$ npm init // or 'npm init -y' if you want to skip the prompt
$ npx https://github.com/Saljooq/cli-abstractor
```

3. Next we will create a test file that can contain some code too and put it in a test.file and absorb it as default
```bash

$ echo hello {{name}} I bet you work as a {{ profession }} > test.file
$ npm run absorb

> my-first-cli@1.0.0 absorb
> node ./cli-abstractor-store/absorb.js

Here is the list of files that would be added
[ './test.file' ]
Do you want to continue
What's the answer?        y
What's the Flag?        default
INITIATING ABSORPTION UNDER FLAG -> default

+ absorbing -> ./test.file

```

4. To test it from a completely new file location we use the test folder - after that we can upload it to git repo and run it as npx www.your-repo.com
```bash
$ cd ../cli-test-container
$ npx ../my-first-cli/
Need to install the following packages:
  file:../temp_test_delete_please
Ok to proceed? (y) y
only one flag available -> default
Processing it by default....
What's the name?        Sal
What's the profession?        Software Engineer
+ creating/writing to file ./test.file
$ ls
test.file
$ cat test.file 
hello Sal I bet you work as a Software Engineer

```
5. If {{}} style of templating conflicts with your code go to cli-abstractor-store/regex.js and update the starting and ending sequences
```javascript
export const closingSquence = '}}'
export const openingSequence = '{{'
```



# GOAL FOR PHASE 1

- create a .cli-ignore
- read the ignore file and get a list of file/folder names
- dont put the file or foldernames that match the list in the store file/folder list
- make a copy of all the files in the store along with mapping - with the default flag
- this should then auto create the index file that would help users access flags and dynamically
- generate a prompt
- STAGE 1 COMPLETE

# GOAL FOR PHASE 2

- investigate a single repo for all stages
- dynamically get a list of all the files on the path - with the relevant ignored
- generate a set of all the mappings that will be needed
- create the relevant structure to store all the mappings + files' data in one place per module
- enable a prompt to ask the user to choose a module
- create all the files in the relevant module
- STAGE 2 COMPLETE

# GOAL FOR PHASE 3

- update the logic to work within one repo
- separate the logic for absorb and start
- test generation of all the files in a module
- make module more intuitive prompts
- add colorings for warning and prompts - or important information
- generate prompt to get the mappings to replace text
- add logic to replace relevant text in the files
- add logic to also enable name change of files themselves
- update readme to indicate how the app will work
- create a global store for the opening and closing sequence for replacement - this will enable auto-generation of code in with jinja brackets are valid code
- test more thoroughly to make sure sequence of updates work

# GOAL FOR PHASE 4

- investingate upgrading to typescript - and if all the logic will still be backwards compatible
- change flags to modules for easy understandability
- change file's content to fileContent and file's name to fileName
- add types - if possible - this will require time
- add if-module feature
- create gifs of videos to make the sequence of steps and what they produce more understandable


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
