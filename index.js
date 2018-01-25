const glob = require("glob");
const fs = require("fs");
const rimraf = require("rimraf");
const yaml = require('js-yaml');
const pug = require('pug');

const buildPath = `${__dirname}/build`;

// Clean/create build directory
try { rimraf.sync(buildPath); } catch(_e) {}
try { fs.mkdirSync(buildPath); } catch(_e) {}
try { fs.mkdirSync(`${buildPath}/images`); } catch(_e) {}
try { fs.mkdirSync(`${buildPath}/videos`); } catch(_e) {}
try { fs.mkdirSync(`${buildPath}/projects`); } catch(_e) {}

// Grab site data
let site = yaml.safeLoad(fs.readFileSync(`${__dirname}/site.yml`, 'utf8'));
site.basedir = `${__dirname}/shared`;
console.log(__dirname);

console.log(JSON.stringify(site, null, '  '));

// Some helper functions
let pug2html = (f) => f.replace("pug/", "build/").replace(".pug", ".html");
let pugCompiled = (newFile) => (err) => {
    if (err) {
        console.error(`ERROR: FAILED TO WRITE TO ${newFile} (${err})`);
    }
    else {
        console.log(`Finished ${newFile}`);
    }
};

// Go through all the pug files and render them
glob("pug/*.pug", (er, files) => {
    files.forEach(file => {
        let newFile = pug2html(file);
        console.log(`Compiling ${file} ...`);

        fs.writeFile(newFile, pug.renderFile(`${__dirname}/${file}`, site), pugCompiled(newFile));
    });
});

// Render projects
site.projects.forEach(project => {
    if (!project.path) {
        console.warn(`No path specified for poject: ${project.name} -- not generating a page for it`);
        return;
    }
    let pugFile = `${__dirname}/pug/projects/project.pug`;
    let newFile = pug2html(pugFile.replace("project.pug", `${project.path}.html`));
    let context = Object.assign({}, site, { project: project });

    fs.writeFile(newFile, pug.renderFile(pugFile, context), pugCompiled(newFile));
});

// Copy over all css files
glob("css/**/*.css", (er, files) => {
    files.forEach(file => {
        console.log(`Copying ${file} ...`);
        let newFile = file.replace("css/", "build/");
        fs.copyFile(file, newFile, () => {
            console.log(`Finished ${file}`);
        });
    });
});

// Copy over all image files
glob("images/**/*", (er, files) => {
    files.forEach(file => {
        console.log(`Copying ${file} ...`);
        let newFile = file.replace("images/", "build/images/");
        fs.copyFile(file, newFile, () => {
            console.log(`Finished ${file}`);
        });
    });
});

// Copy over all video files
glob("videos/**/*", (er, files) => {
    files.forEach(file => {
        console.log(`Copying ${file} ...`);
        let newFile = file.replace("videos/", "build/videos/");
        fs.copyFile(file, newFile, () => {
            console.log(`Finished ${file}`);
        });
    });
});

// Favicon
fs.copyFile("favicon.ico", "build/favicon.ico", () => {
    console.log("Copied over favicon.ico");
});
