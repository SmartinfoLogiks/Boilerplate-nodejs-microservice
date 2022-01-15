/*
 * Main file for calling MicrServices API
 *
 * @author Bismay <bismay@smartinfologiks.com>
 * @author Dikshita
 */

console.log("\x1b[31m%s\x1b[0m", "\nMicroService Initialization Started");

global._PACKAGE = require('./package.json');

const getIP = require('external-ip')();
const restify = require('restify');
//const restifyPlugins = require('restify-plugins');
//const errors = require('restify-errors');
const bunyan = require('bunyan');

global.CLSINDEX = { "API": {} };
global._ENV = {};

//Adding all required libraries
global.process = require('process');
global.fs = require('fs');
global.path = require('path');
global.md5 = require('md5');
global._ = require('lodash');
global.axios = require('axios');
global.validator = require('validatorjs');
global.moment = require('moment');

require('custom-env').env();

_ENV['START_TIME'] = moment().format();
_ENV['ROOT_PATH'] = __dirname;//path.dirname();


/**
 * Initialize Server
 */
const server = restify.createServer({
    name: _PACKAGE.name,
    version: _PACKAGE.version,

    dtrace: false,
    // log: logger,
    ignoreTrailingSlash: true
});

fs.readdirSync('./api/').forEach(function (file) {
    //   console.log("Loading api : " + filePath);
    if ((file.indexOf(".js") > 0 && (file.indexOf(".js") + 3 == file.length))) {
        filePath = path.resolve('./api/' + file);
        CLSINDEX['API'][file.toUpperCase()] = require(filePath)(server, restify);
    }
});

//Additional Utilities
function exitHandler(options, exitCode) {
    //console.log("SERVER EXIT", exitCode, '-',options);
    if (options == "exit") return;
    if (options == "uncaughtException") {
        console.warn(exitCode);
    }

    if (server.mysql != null) server.mysql.end();
    //server.mongodb.

    console.warn("\n\nServer Shutting Down @ " + moment().format());

    // if (options.cleanup) console.log('clean');
    // if (exitCode || exitCode === 0) console.log(exitCode);
    // if (options.exit) process.exit();

    setTimeout(function () {
        process.exit();
    }, 1000);
}


//Process Cleanup
[`exit`, `SIGINT`, `SIGUSR1`, `SIGUSR2`, `uncaughtException`, `SIGTERM`].forEach((eventType) => {
    process.on(eventType, exitHandler.bind(null, eventType));
})

process.on('uncaughtException', function (err) {
    console.error(err.name, err.message, err.stack);
});

//Bootstrap Control and Discovery Server Connection


/**
 * Start Server, Checks for availale PORTs
 * Then Connect to Other Services as per requirements - eg. Mongo, MySQL, Redis
 */
server.listen(process.env.MS_CURRENT_PORT, () => {
    console.log("\x1b[31m%s\x1b[0m", "\nMicroService Initialization Completed");

    getIP((err, ip) => {
        if (err) {

        }
        console.log(`\nMicroService Started @ ` + moment().format() + ` and can be accessed on ${process.env.MS_CURRENT_PROTOCOL}://${ip}:${process.env.MS_CURRENT_PORT}/`);
    });
});