
const args = process.argv.slice(2)

const targetFlag = '--default'

console.log(args)

console.log(`finding default in your arguments....\nSTATUS: ${args.includes(targetFlag)}`)