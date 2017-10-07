const version = require('../package.json').version;
const mockTerm = require('./_test/mock-terminal');
const bin = require.resolve('./');


describe('bust cli', function(){
    it('complains about missing command', async function(){
        const { stdout, stderr, code } = await mockTerm(`${bin}`);

        expect(code).toBe(1);
        expect(stdout).toBe('');
        expect(stderr).toMatchSnapshot();
    });

    it('complains about unrecognized command', async function(){
        const { stdout, stderr, code } = await mockTerm(`${bin} wat-nope-nah`);

        expect(code).toBe(1);
        expect(stdout).toBe('');
        expect(stderr).toMatchSnapshot();
    });

    it('prints version', async function(){
        const { stdout, stderr, code } = await mockTerm(`${bin} -v`);

        expect(code).toBe(0);
        expect(stdout).toBe(`${version}\n`);
        expect(stderr).toBe('');
    });

    it('prints help', async function(){
        const { stdout, stderr, code } = await mockTerm(`${bin} help`);

        expect(code).toBe(0);
        expect(stdout).toMatchSnapshot();
        expect(stderr).toBe('');
    });
});
