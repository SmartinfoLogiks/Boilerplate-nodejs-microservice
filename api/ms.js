/*
 * Basic API Route File which contains the minimum required Route Paths to be used with MicroService Discovery Server
 * 
 * */

module.exports = function (server, restify) {

    server.get('/', (req, res, next) => {
        res.header('content-type', 'json');
        res.send({
            "SERVER": _PACKAGE.name,
            "VERSION": _PACKAGE.version,
            "TIMESTAMP": moment().format("Y-M-D HH:mm:ss")
        });
        return next();
    });

    server.get('/ok', (req, res, next) => {
        var os = require('os');

        res.header('content-type', 'json');
        res.send({
            "SERVER": _PACKAGE.name,
            "VERSION": _PACKAGE.version,
            "STARTED_AT": _ENV.START_TIME,
            "RUNNING_SINCE": moment(_ENV.START_TIME).fromNow(),
            "TIMESTAMP": moment().format("Y-M-D HH:mm:ss"),
            "totalmem": Math.floor((os.totalmem() / (1024 * 1024))) + " MB",
            "freemem": Math.floor((os.freemem() / (1024 * 1024))) + " MB",
            "processmem": Math.floor(process.memoryUsage().heapUsed / (1024 * 1024)) + " MB",
            "cpus": os.cpus().length,
            "api_files": Object.values(CLSINDEX.API).length,
        });
        return next();
    });
}