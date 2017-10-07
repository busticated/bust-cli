const util = require('util');
const exec = util.promisify(require('child_process').exec);


module.exports = async function(command, options){
    let stdout, stderr, code;

    try {
        ({ stdout, stderr, code = 0 } = await exec(command, options));
    } catch(error){
        ({ stdout, stderr, code } = error);
    }

    return { stdout, stderr, code };
};
