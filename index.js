var isRoot = require('is-root');
var fs = require('fs');
var parsec = require('parsec');
var colors = require('colors');

/**
 * Adds a single host to /etc/hosts file based on options array.
 *
 * Help can be found in: add-host -h
 *
 * @param  array arguments
 * @return void
 */
module.exports = function addHost(arguments) {

  // Parse arguments
  args = parsec.parse(arguments)
    .options(['i', 'ip'], { default : false } )
    .options(['a', 'alias'], { default : false } )
    .options(['c', 'comment'], { default : false } )
    .options(['h', 'help'], { default : false } );

  // Get necessary vars
  var ip = args.ip;
  var alias = args.alias;
  var comment = args.comment;
  var help = args.help;

  // Check arguments
  checkArgs(args);

  // Adjust ip
  ip = typeof ip === 'string' ? ip : '127.0.0.1';

  // Adjust comment
  comment = typeof comment === 'string' ? '# ' + comment + '\n' : '';

  // Append new host to file
  fs.appendFile('/etc/hosts', '\n' + comment + ip + ' ' + alias + ' \n', function (err) {
    if (err)
      fireError(err);

    fs.readFile('/etc/hosts', function (err, data) {
      if (err)
        fireError(err);

      console.log(data.toString());
    });
  });
}

/**
 * Check app arguments.
 *
 * @param  array arguments
 * @return void
 */
checkArgs = function (args) {

  // Get necessary vars
  var ip = args.ip;
  var alias = args.alias;
  var comment = args.comment;
  var help = args.help;

  // Check for help
  if (help)
    fireHelp();

  // Check if user is root
  if (!isRoot())
    fireError('You have to be ' + 'root'.green + ' or use ' + 'sudo'.green);

  // Check for invalid options
  if ( typeof args._ !== 'undefined' )
    fireError('Invalid option "' + args._.green + '"');

  // Check if alias is set, at least
  if ( typeof alias !== 'string' )
    fireError('Invalid value for option ' + '-a'.green + ',' +  '--alias'.green);

  // Check if alias is set, at least
  if ( typeof ip !== 'string' && ip === true )
    fireError('Invalid value for option ' + '-i'.green + ',' +  '--ip'.green);

  // Check if alias is set, at least
  if ( typeof comment !== 'string' && comment === true )
    fireError('Invalid value for option ' + '-c'.green + ',' +  '--comment'.green);
};

/**
 * Throws app help.
 *
 * @return void
 */
function fireHelp() {

  // Usage
  console.log("\nUsage:");
  console.log("add-host -a alias [-i, --ip] [-c, --comment] [-h, --help]");

  // Examples
  console.log("\nExample [1]: Add a host setting all values");
  console.log("add-host -i 192.168.1.1 -a dummy.dev -c \"This is a dummy host\"");
  console.log("\nExample [2]: Add a host with default ip 127.0.0.1");
  console.log("add-host -a dummy.dev");
  console.log("\nExample [3]: Getting some help");
  console.log("add-host -h, add-host --help");

  // Options
  console.log("\nAvailable [options] are:");
  console.log("-i, --ip [OPTIONAL, default: 127.0.0.1] (Set host ip/address)");
  console.log("-a, --alias (Set alias for host)");
  console.log("-c, --comment [OPTIONAL] (Set comment for added host)");
  console.log("-h, --help (See this beautyful description)\n");

  // Stop app
  process.exit(-1);
}

/**
 * Throws an app error menssage that comes from parameter.
 *
 * @param String msg 
 * @return void
 */
function fireError(msg) {
    var error = '\nERROR: '.red + msg + '\n';
    var help = 'Execute with "-h or --help" to learn the options\n';
    console.log(error + help);
    // Stop app
    process.exit(-1);
};
