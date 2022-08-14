const Blink = "\x1b[5m"
const FgGreen = "\x1b[32m"
const BgYellow = "\x1b[43m"
const FgDefault = '\x1b[0m'

const FgBlack = "\x1b[30m"
const FgRed = "\x1b[31m"
const FgYellow = "\x1b[33m"
const FgBlue = "\x1b[34m"
const FgMagenta = "\x1b[35m"
const FgCyan = "\x1b[36m"
const FgWhite = "\x1b[37m"

// BgBlack = "\x1b[40m"
// BgRed = "\x1b[41m"
// BgGreen = "\x1b[42m"
// BgYellow = "\x1b[43m"
// BgBlue = "\x1b[44m"
// BgMagenta = "\x1b[45m"
// BgCyan = "\x1b[46m"
// BgWhite = "\x1b[47m"

const intro = (text) => {
    return text
}

const important = (text) => {
    return `${FgCyan}${text}${FgDefault}`
}

const prompt = (text) => {
    return `${FgGreen}${text}${FgDefault}`
}

const warning = (text) => {
    return `${FgRed}${text}${FgDefault}`
}


const makeLogger = () => {
    var output = {}
    output['intro'] = intro
    output['important'] = important
    output['warning'] = warning
    output['prompt'] = prompt
    return output
}

export default makeLogger