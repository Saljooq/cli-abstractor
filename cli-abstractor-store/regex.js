export const closingSquence = '}}'
export const openingSequence = '{{'

export const regexScan = (content) => {
    // Essentially we're asking for matches with starting
    // and ending jinja brackets without middle part

    var regex = openingSequence + '[^' + openingSequence + ']*' + closingSquence;

    const found = [...content.matchAll(regex)];

    const excludeBrack = (s) => {
        return s.substr(2, s.length - 4).trim()
    }

    const allInputsWithRepeat = found.map(x => excludeBrack(x[0]));
    const allInput = new Set(allInputsWithRepeat)
    const finalRes =  [...allInput];
    // console.log(finalRes)
    return finalRes
}

// test - comment out below to test
// const text = "#include <stdio.h>\nint main()\n{\n    // printf() displays the string inside quotation\n    printf(\"" 
// + openingSequence + "Hello" + closingSquence + 
// ", World! Welcome to the new " 
// + openingSequence + "World" + closingSquence +
// ", let's see if this works "
// + openingSequence + "Hello" + closingSquence + 
// "\");\n    return 0;\n}"
// console.log(regexScan(text))