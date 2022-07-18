export const regexScan = (content) => {
    // Essentially we're asking for matches with starting
    // and ending jinja brackets without middle part
    const regex = /{{[^{{]*}}/g;
    const found = [...content.matchAll(regex)];

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
const allInputsWithRepeat = found.map(x => excludeBrack(x[0]));
console.log(allInputsWithRepeat)
const allInput = new Set(allInputsWithRepeat)
console.log([...allInput])

return [...allInput];
}