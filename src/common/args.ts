import yargs from 'yargs/yargs'
import { hideBin } from 'yargs/helpers'

const argv = yargs(hideBin(process.argv)).options({
  f: {
    type: 'string',
    describe: 'Dir path to the yaml file',
    demandOption: true,
    alias: 'file'
  },
  s: {
    type: 'string',
    describe: 'Custom server url to use on every contract test',
    alias: 'server'
  }
}
).example([
  ['$0 -f "./example.yaml"', 'Use your yaml dir path'],
  ['$0 -s "http://localhost:8080"', 'Put your server url']
]).parseSync()

export default argv
