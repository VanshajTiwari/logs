const jsonfile = require('jsonfile');
const moment = require('moment');
const simpleGit = require('simple-git')();
const FILE_DIR = './data.json';

const makeCommit = async (n) => {
    if (n === 0) {
        // await simpleGit.push();
        return;
    }

    const x = Math.floor(Math.random() * 55);
    const y = Math.floor(Math.random() * 7);
    const date = moment().subtract(1, 'year')
        .add(x, 'weeks').add(y, 'days').format('YYYY-MM-DDTHH:mm:ss');

    const data = { date };
    
    console.log(date);

    jsonfile.writeFile(FILE_DIR, data, { spaces: 2 }, async (err) => {
        if (err) {
            console.error('Error writing file', err);
            return;
        }

        try {
            await simpleGit.add(FILE_DIR);
            await simpleGit.commit(JSON.stringify(data), { '--date': date });
            await makeCommit(n - 1);
        } catch (commitErr) {
            console.error('Error during commit', commitErr);
        }
    });
};

makeCommit(1000);
