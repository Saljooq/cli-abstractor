export const regexScan = (content, oldSet) => {
    // Essentially we're asking for matches with starting
    // and ending jinja brackets without middle part
    const regex = /{{[^{{]*}}/g;
    const found = [...content.matchAll(regex)];

    const excludeBrack = (s) => {
        return s.substr(2, s.length - 4).trim()
    }

    const allInputsWithRepeat = found.map(x => excludeBrack(x[0]));
    // console.log(allInputsWithRepeat)
    const allInput = new Set(allInputsWithRepeat)
    oldSet && allInput.add(...oldSet)
    // console.log([...allInput])

    return [...allInput];
}