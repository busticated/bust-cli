/* eslint-disable linebreak-style */
const os = require('os');
const separator = os.EOL.repeat(2);


module.exports.macOS =
`###################################################################### macOS ##
.DS_Store* # folder metadata
Icon # custom finder icon (see: https://stackoverflow.com/a/21111738/579167)
thumbs.db # thumbnail preview cache
._* # thumbnails`;

module.exports.common =
`##################################################################### common ##
tmp
logs
*.log
pids
*.pid
*.pid.lock
*.seed
*.csv
*.dat
*.out
*.env # dotenv / autoenv config
*.gz # gzip file`;

module.exports.vim =
`######################################################################## vim ##
Session.vim # session file`;

module.exports.node =
`####################################################################### node ##
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.npm # npm cache directory
.eslintcache # esling cache directory
.yarn-integrity # yarn integrity check cache
.esm-cache # @std/esm module cache`;

module.exports.js =
`######################################################################### js ##
*.js.map`;

module.exports.sass =
`####################################################################### sass ##
.sass-cache/`;

module.exports.css =
`######################################################################## css ##
*.css.map # source maps`;

module.exports.all = Object.keys(module.exports).reduce(function(all, key){
    return (all += `${module.exports[key]}${separator}`);
}, '');
