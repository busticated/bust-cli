#!/usr/bin/env node

const version = require('../package.json').version;
const yargs = require('yargs');

yargs
    .usage('Usage: $0 <command> [options]')
    .version('version', 'display version information', version)
    .alias('version', 'v')
    .help('help', 'display help message')
    .alias('help', 'h')
    .showHelpOnFail(false, 'whoops, something went wrong! run with --help')
    .demandCommand()
    .parse();
