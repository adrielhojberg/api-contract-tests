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
  },
  b: {
    type: 'boolean',
    describe: 'Authorization bearer token',
    alias: 'bearer'
  }
}
).example([
  ['$0 -f "./example.yaml"', 'Use your yaml dir path'],
  ['$0 -s "http://localhost:8080"', 'Put your server url'],
  ['$0 -b', 'Use bearer Authorization token on each request taken from the environment']
]).parseSync()

export default argv
