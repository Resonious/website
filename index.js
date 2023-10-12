const glob = require("glob");
const fs = require("file-system");
const rimraf = require("rimraf");
const yaml = require('js-yaml');
const pug = require('pug');
const markdown = require('markdown-it')();
const path = require('path')

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
let ensureCompiled = (newFile) => (err) => {
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

site.blogPosts = [];
// Render blog posts
const blogPosts = new Promise((resolve, reject) => {
    glob("documents/blog/**/*.md", (er, files) => {
        files.sort()
        files.reverse()
        files.forEach(file => {
            console.log(`Blog post ${file} ...`);

            const filename = path.basename(file);

            const date = filename.split('-').slice(0, 3).join('-');
            const title = filename.split('-').slice(3)
                              .map(s => s[0].toUpperCase() + s.slice(1))
                              .join(' ')
                              .replace('.md', '');

            const slug = filename.replace('.md', '');
            const pugFile = `${__dirname}/pug/blog/post.pug`;
            const newPath = pug2html(pugFile.replace('post.pug', slug));
            const newFile = `${newPath}/index.html`;
            const blogPost = { title, date, path: `/blog/${slug}` };
            site.blogPosts.push(blogPost);

            fs.readFile(file, "utf8", (err, data) => {
                blogPost.contents = markdown.render(data);
                const context = Object.assign({}, site, blogPost);

                try { fs.mkdirSync(newPath); } catch(_e) {}

                fs.writeFile(newFile, pug.renderFile(pugFile, context), ensureCompiled(newFile));
            });
        });
        resolve(site.blogPosts);
    });
});

// Go through all the pug files and render them
let renderPug = (er, files) => {
    blogPosts.then(() => {
        files.forEach(file => {
            if (file.endsWith("index.pug")) {
                var newFile = pug2html(file);
            } else {
                let newPath = pug2html(file.replace(".pug", '/'));
                var newFile = `${newPath}index.html`
                try { fs.mkdirSync(newPath); } catch(_e) {}
            }

            console.log(`Compiling ${file} ...`);

            fs.writeFile(newFile, pug.renderFile(`${__dirname}/${file}`, site), ensureCompiled(newFile));
        });
    });
};
glob("pug/*.pug", renderPug);
glob("pug/private/**/*.pug", renderPug);

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

    if (project.descriptionDoc) {
        context.renderedDescription = markdown.render(fs.readFileSync(`documents/${project.descriptionDoc}`, "utf8"));
    }

    try { fs.mkdirSync(newPath); } catch(_e) {}

    fs.writeFile(newFile, pug.renderFile(pugFile, context), ensureCompiled(newFile));
}
site.projects.forEach(generateProject);

// Copy over all css files
glob("css/**/*.css", (er, files) => {
    files.forEach(file => {
        console.log(`Copying ${file} ...`);
        let newFile = file.replace("css/", "build/");
        fs.copyFile(file, newFile, { done: copiedFile(newFile) });
    });
});

// Copy over all js files
glob("js/**/*.js", (er, files) => {
    files.forEach(file => {
        console.log(`Copying ${file} ...`);
        let newFile = file.replace("js/", "build/");
        fs.copyFile(file, newFile, { done: copiedFile(newFile) });
    });
});

// Copy over all image files
glob("images/**/*", (er, files) => {
    files.forEach(file => {
        console.log(`Copying ${file} ...`);
        let newFile = file.replace("images/", "build/images/");

        try { fs.mkdirSync(path.dirname(dirname)); } catch(_e) {}
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

// Copy over all static files
glob("static/**/*", (er, files) => {
    files.forEach(file => {
        console.log(`Copying ${file} ...`);
        let newFile = file.replace("static/", "build/");
        fs.copyFile(file, newFile, { done: copiedFile(newFile) });
    });
});

// Favicon
fs.copyFile("favicon.ico", "build/favicon.ico", () => {
    console.log("Copied over favicon.ico");
});
