/*
 * Main file for calling MicrServices API
 *
 * @author Dikshita
 */

//const config = require('./config.js');
//global.CONFIG = config;
//global.ip = "http://23:22:122:225";

var restify = require('restify');

global.process = require('process');
global.moment = require('moment');
global.axios = require('axios');
global.path = require('path');
global.validator = require('validatorjs'); 
global.fs = require('fs');

require('custom-env').env();


console.log(process.env);
