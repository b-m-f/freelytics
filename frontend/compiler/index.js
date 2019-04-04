const handlebars = require("handlebars");
const { resolve } = require("path");
const fs = require("fs");
const path = require("path");
const process = require("process");
const webpack = require("webpack");
const { mkdir, readdir, stat, readFile, writeFile } = fs.promises;

const appDir = process.env.PWD;


function generatePathFromRoot(path){
    return `${appDir}/${path}`;
}

const outputDirectory = generatePathFromRoot("dist");
const globalVariables = require(generatePathFromRoot("pages/globalVariables.js"));
// get pages to compile from command line arguments, or default to pages directory
const pagesToCompile = process.argv.slice(2).map(page => `pages/${page}`).map(generatePathFromRoot) || [
    generatePathFromRoot("pages")
];

async function getFiles(dirs) {
    const filesPerDir = await Promise.all(
        dirs.map(async dir => {
            const subdirs = await readdir(dir);
            const files = await Promise.all(
                subdirs.map(async subdir => {
                    const res = resolve(dir, subdir);
                    return (await stat(res)).isDirectory() ? getFiles([res]) : res;
                })
            );
            return Array.prototype.concat(...files);
        })
    );
    return filesPerDir.flat();
}


async function compileTemplate(file,pageName, options){



    // gets all handlebar partials from `pages/partials`
    // and returns them on a single object which can be loaded
    // by handlebars
    async function getHandlebarPartials() {
        const files = await getFiles([generatePathFromRoot("pages/partials")]);
        const partials = await files.reduce(async (accumulator, file) => {
            const content = await readFile(file, { encoding: "utf8" });
            // get the file name without template and html extension
            const name = path.basename(file).split(".")[0];
            return Object.assign({}, await accumulator, { [name]: content });
        }, {});
        return partials;
    }

    function getPageVariables(pagePath) {
        const pageDir = `${path.dirname(pagePath)}`;
        try {
            const content = require(`${pageDir}/variables.js`);
            return content;
        } catch (e){
            console.error(e);
            return {};
        }
    }


    // main execution
    // 1. get all files from directories specified via cli
    // 2. filter them to only get html template files
    // 3. compile the files handlebars
    // 4. write the files to the ouput directory, using the page directory name as the filename
    const partials = await getHandlebarPartials();

    handlebars.registerPartial(partials);

    const content = await readFile(file, { encoding: "utf8" });
    // merge page variables into global variables
    // page variables always take precedence
    const variables = Object.assign(
        {},
        globalVariables,
        getPageVariables(file),
        // this will include styles into header partial,
        // and scripts into footer
        // only if they are present
        {
            scripts: options.hasScripts ? [`${pageName}.js`] : undefined,
            styles: options.hasStyles ? [`${pageName}.css`] : undefined,
        });

    // this first compiles the content with handlebar, which returns a function
    // that will take the variables to put them into place
    // and finally returns the final file
    const compiledContent = handlebars.compile(content)(variables);

    const outputFileName = `${outputDirectory}/${pageName}.html`;
    writeFile(outputFileName, compiledContent, { encoding: "utf8" })
        .catch(e => {
            console.error(`Error writing ${outputFileName}: ${e}`);
        })
        .then(() => {
            console.log(`\n- Successfully wrote ${outputFileName}`);
        });
}

async function compileJavaScriptWithWebpack(index,pageName, outputDir){
    const baseWebpackConfig = require("./webpack.config.js");

    const webpackConfig = Object.assign({}, baseWebpackConfig, {
        entry: index,
        output: {
            filename: `${pageName}.js`,
            path: outputDir
        }
    });
  
  
    const webpackCompiler= webpack(webpackConfig);
    webpackCompiler.run((err, stats) => {
        if (err) {
            console.error(err.stack || err);
            if (err.details) {
                console.error(err.details);
            }
            return;
        }

        const info = stats.toJson();

        if (stats.hasErrors()) {
            console.error(info.errors);
        }

        if (stats.hasWarnings()) {
            console.warn(info.warnings);
        }
        console.log(stats.toString({
            chunks: false,  // Makes the build much quieter
            colors: true    // Shows colors in the console
        }));
    });
}

function compileSass(index, pageName, outputDir){
    const sass = require("node-sass");
    const outFile = `${outputDir}/${pageName}.css`;
    const includePaths = ["node_modules"].map(generatePathFromRoot);

    sass.render({
        file: index,
        sourceMap: true,
        sourceMapContents: true,
        outFile: outFile ,
        outputStyle: "compressed",
        includePaths,
    }, function(err, result) { 
        if (err){
            console.error(err);
            return;
        }

        writeFile(outFile, result.css, { encoding: "utf8" })
            .catch(e => {
                console.error(`Error writing static/css/${pageName}.css: ${e}`);
            })
            .then(() => {
                console.log(`\n- Successfully wrote static/css/${pageName}.css`);
                writeFile(`${outFile}.map`, result.map, { encoding: "utf8" })
                    .catch(e => {
                        console.error(`Error writing static/css/${pageName}.css.map: ${e}`);
                    })
                    .then(() => {
                        console.log(`\n- Successfully wrote static/css/${pageName}.css.map`);
                
                    });
            });


    });

}


getFiles(pagesToCompile).then(async files => {
    const outputCSSDir = `${outputDirectory}/static/css`;
    const outputJSDir = `${outputDirectory}/static/js`;
    await fs.stat(outputCSSDir, (err) => {
        if(err){
            mkdir(`${outputDirectory}/static/css`, { recursive: true }).catch(console.error);
        }
    });

    files
        .filter(file => file.includes(".template.html")).forEach( async templateFile => {
            const page = path.dirname(templateFile);
            const pageName = path.basename(page);
            const javaScriptMainFile = `${page}/main.js`; 
            const sassFile =`${page}/styles.scss`; 
            let hasScripts = false;
            let hasStyles = false;


            try {
                await stat(javaScriptMainFile);
                // promise got resolved, file exists
                hasScripts= true;

                compileJavaScriptWithWebpack(javaScriptMainFile, pageName,outputJSDir);
            }
            catch (e) {
                console.log(`
              Page ${pageName} has no main.js file. No Scipts compiled
            `); 
            }
            try {
                await stat(sassFile);
                hasStyles = true;
                compileSass(sassFile, pageName, outputCSSDir);
            }
            catch (e) {
                console.log(`
              Page ${pageName} has no styles.scss file. No Styles compiled
            `); 
            }
            compileTemplate(templateFile,pageName, {hasStyles, hasScripts});

        });
});

