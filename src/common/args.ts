import yargs from 'yargs/yargs'
import { hideBin } from 'yargs/helpers'
const argv = yargs(hideBin(process.argv)).options({
  f: { type: 'string', demandOption: true, alias: 'file' }
}
).parseSync()

export default argv
