const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const writeFile = promisify(fs.writeFile);
const ascii = require('../lib/asciidraw');
const template = require('../templates/gitignore');


module.exports.command = 'gitignore';
module.exports.description = 'create .gitignore file';
module.exports.aliases = ['gi'];
module.exports.builder = {
    force: {
        alias: 'f',
        default: false
    }
};

module.exports.handler = async function(argv){
    const cwd = process.cwd();
    const filename = '.gitignore';
    const filepath = path.join(cwd, filename);
    const spinner = ascii.createSpinner({ suffix: 'Adding .gitignore file...' });

    if (!argv.force){
        if (!isGitRepo(cwd)){
            ascii.write('Current directory is NOT a git repo!');
            return process.exit(1);
        }

        if (fs.existsSync(filepath)){
            ascii.write(`${filename} already exists! add -f to replace`);
            return process.exit(1);
        }
    }

    try {
        spinner.start();
        await writeFile(filepath, template.all);
        await spinner.stop();
        await ascii.coolguy({ prefix: 'wrote file' });
    } catch(e){
        ascii.clear();
        ascii.write(e);
    }
};

function isGitRepo(cwd){
    const directoryPath = path.join(cwd, '.git');

    try {
        return fs.statSync(directoryPath).isDirectory();
    } catch(err){
        return false;
    }
}
