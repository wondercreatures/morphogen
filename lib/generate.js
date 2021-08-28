/* eslint-disable no-shadow */
const Eta = require('eta');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');


function renderTpl(path, context) {
  const tmplContent = fs.readFileSync(path, 'utf8');
  return Eta.render(
    tmplContent,
    // '<%~ it.name %> /*=~ it.name */ 123',
    context,
    {
      tags: ['/*=', '*/'],
    },
  );
}

function processTemplatesDir(tplPath, outputPath, context) {
  const elements = fs.readdirSync(tplPath);
  if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath);
  }

  elements.forEach((file) => {
    const tmplPath = path.join(tplPath, file);
    console.log(chalk.bold(chalk.cyan('Processing:')), chalk.green(tmplPath));
    //const fileNameProcessed = file.
    const processedFileName = Object.keys(context).reduce((res, prop) => {
      return res.replace(`__${prop}__`, context[prop]);
    }, file);

    if (fs.statSync(tmplPath).isDirectory()) {
      processTemplatesDir(tmplPath, path.join(outputPath, processedFileName), context);
    } else {
      const resultPath = path.join(process.cwd(), outputPath, processedFileName);

      console.log(chalk.cyanBright('Writing to:'), chalk.greenBright(resultPath));

      const renderedData = renderTpl(tmplPath, context);
      //console.log(renderedData);
      fs.writeFileSync(path.join(process.cwd(), outputPath, processedFileName), renderedData);
    }
  });
}

module.exports = {
  processTemplatesDir,
};

// // eslint-disable-next-line no-unused-expressions
// yargs(hideBin(process.argv))
//   .command('generate [tplDir] [outputDir]', 'start the server', (yargs) => yargs
//     .positional('port', {
//       describe: 'port to bind on',
//       default: 5000,
//     }), (argv) => {
//     const { tplDir, outputDir } = argv;

//     if (!tplDir || !outputDir) {
//       throw new Error('exec require 2 path arguments');
//     }

//     if (!fs.existsSync(outputDir)) {
//       fs.mkdirSync(outputDir);
//     }

//     processTemplatesDir(tplDir, outputDir);
//   })
//   .argv;

// var myTemplate = '<p>My favorite kind of cake is: /*> it.favoriteCake <*/</p>'

// console.log(Eta.render(myTemplate,
//     {
//         favoriteCake: 'Chocolate!' }),
//     {
//         tags: ["/*>", "<*/"],
//         async: true,
//     }
// );