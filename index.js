const glob = require("glob");
const fs = require("fs");
const rimraf = require("rimraf");
const yaml = require('js-yaml');
const pug = require('pug');

const buildPath = `${__dirname}/build`;

// Clean/create build directory
try { rimraf.sync(buildPath); } catch(_e) {}
try { fs.mkdirSync(buildPath); } catch(_e) {}

// Grab site data
let site = yaml.safeLoad(fs.readFileSync(`${__dirname}/site.yml`, 'utf8'));
site.basedir = `${buildPath}/shared`;
console.log(__dirname);

glob("pug/**/*.pug", function (er, files) {
    files.forEach(file => {
        let newFile = file.replace("pug/", "build/").replace(".pug", ".html");
        console.log(`Compiling ${file} ...`);

        fs.writeFile(newFile, pug.renderFile(`${__dirname}/${file}`, site), (err) => {
            if (err) {
                console.error(`ERROR: FAILED TO WRITE TO ${newFile} (${err})`);
            }
            else {
                console.log(`Finished ${newFile}`);
            }
        });
    });
})
