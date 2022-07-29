const data = {
    "projectName": "",
    "description": "",
    "content": [
        {
            "flag": "custom",
            "content": [
                {
                    "name": "./testInput.c",
                    "content": "#include <stdio.h>\nint main()\n{\n    // printf() displays the string inside quotation\n    printf(\"{{Hello}}, World! Welcome to the new {{World}}, let's see if this works {{Hello  }}\");\n    return 0;\n}"
                }
            ],
            "mapping": [
                "Hello",
                "World"
            ]
        }
    ]
}

export default data;