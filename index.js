const glob = require("glob");
const fs = require("file-system");
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
let copiedFile = (file) => (err) => {
    if (err)
        console.log(`ERROR COPYING ${file}: ${err}`);
    else
        console.log(`Finished ${file}`);
}

// Go through all the pug files and render them
glob("pug/*.pug", (er, files) => {
    files.forEach(file => {
        if (file.endsWith("index.pug")) {
            var newFile = pug2html(file);
        } else {
            let newPath = pug2html(file.replace(".pug", '/'));
            var newFile = `${newPath}index.html`
            try { fs.mkdirSync(newPath); } catch(_e) {}
        }

        console.log(`Compiling ${file} ...`);

        fs.writeFile(newFile, pug.renderFile(`${__dirname}/${file}`, site), pugCompiled(newFile));
    });
});

// Render projects
let generateProject = project => {
    if (!project.path) {
        console.warn(`No path specified for poject: ${project.name} -- not generating a page for it`);
        return;
    }
    let pugFile = `${__dirname}/pug/projects/project.pug`;
    let newPath = pug2html(pugFile.replace("project.pug", `${project.path}`));
    let newFile = `${newPath}/index.html`
    let context = Object.assign({}, site, { project: project });

    try { fs.mkdirSync(newPath); } catch(_e) {}

    fs.writeFile(newFile, pug.renderFile(pugFile, context), pugCompiled(newFile));
}
site.ldProjects.forEach(generateProject);
// TODO
//site.schoolProjects.forEach(generateProject);

// Copy over all css files
glob("css/**/*.css", (er, files) => {
    files.forEach(file => {
        console.log(`Copying ${file} ...`);
        let newFile = file.replace("css/", "build/");
        fs.copyFile(file, newFile, { done: copiedFile(newFile) });
    });
});

// Copy over all image files
glob("images/**/*", (er, files) => {
    files.forEach(file => {
        console.log(`Copying ${file} ...`);
        let newFile = file.replace("images/", "build/images/");
        fs.copyFile(file, newFile, { done: copiedFile(newFile) });
    });
});

// Copy over all video files
glob("videos/**/*", (er, files) => {
    files.forEach(file => {
        console.log(`Copying ${file} ...`);
        let newFile = file.replace("videos/", "build/videos/");
        fs.copyFile(file, newFile, { done: copiedFile(newFile) });
    });
});

// Favicon
fs.copyFile("favicon.ico", "build/favicon.ico", () => {
    console.log("Copied over favicon.ico");
});
