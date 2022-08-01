export const regexScan = (content) => {
    // Essentially we're asking for matches with starting
    // and ending jinja brackets without middle part
    const regex = /{{[^{{]*}}/g;
    const found = [...content.matchAll(regex)];

    const excludeBrack = (s) => {
        return s.substr(2, s.length - 4).trim()
    }

    const allInputsWithRepeat = found.map(x => excludeBrack(x[0]));
    const allInput = new Set(allInputsWithRepeat)
    const finalRes =  [...allInput];
    console.log(finalRes)
    return finalRes
}