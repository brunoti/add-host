#!/usr/bin/env node
var addHost = require('../index.js');
var newHost = process.argv[2];

addHost(newHost);
