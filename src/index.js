#!/usr/bin/env node

const version = require('../package.json').version;
const ascii = require('./lib/asciidraw');
const yargs = require('yargs');


yargs
    .strict(true)
    .usage(ascii.bannerText('.::::::::bust.', { tagline: 'Usage: bust <command> [options]' }))
    .version('version', 'display version information', version)
    .alias('version', 'v')
    .help('help', 'display help message')
    .alias('help', 'h')
    .showHelpOnFail(false, 'whoops, something went wrong! run with --help')
    .commandDir('commands')
    .demandCommand()
    .parse();
