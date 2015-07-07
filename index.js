var isRoot = require('is-root');
var fs = require('fs');
var parsec = require('parsec');

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
    fs.appendFile('/etc/hosts', '\n' + comment + ip + ' \t' + alias + ' \n', function (err) {
        if (err)
            fireHelp("\n\tERROR: " + err);

        fs.readFile('/etc/hosts', function (err, data) {
            if (err)
                fireHelp("\n\tERROR: " + err);

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

    // Check for invalid options
    if ( typeof args._ !== 'undefined' )
        fireHelp("\n\tERROR: invalid option \"" + args._ + "\"");

    // Check if alias is set, at least
    if ( typeof alias !== 'string' )
        fireHelp("\n\tERROR: Invalid value for option -a, --alias");

    // Check if alias is set, at least
    if ( typeof ip !== 'string' && ip === true )
        fireHelp("\n\tERROR: Invalid value for option -i, --ip");

    // Check if alias is set, at least
    if ( typeof comment !== 'string' && comment === true )
        fireHelp("\n\tERROR: Invalid value for option -c, --comment");

    // Check if user is root
    if ( ! isRoot())
        fireHelp("\n\tERROR: You have to use sudo or be a root user");
};

/**
 * Throws app help.
 * It is possible to send a message to be shown.
 *
 * @param  string msg
 * @return void
 */
fireHelp = function (msg) {

    // Additional message
    if (msg) {
        console.log(msg);
        console.log("\n\t---");
    }

    // Usage
    console.log("\n\tUsage:");
    console.log("\tadd-host -a alias [-i, --ip] [-c, --comment] [-h, --help]");

    // Examples
    console.log("\n\tExample [1]: Add a host setting all values");
    console.log("\tadd-host -i 192.168.1.1 -a dummy.dev -c \"This is a dummy host\"");
    console.log("\n\tExample [2]: Add a host with default ip 127.0.0.1");
    console.log("\tadd-host -a dummy.dev");
    console.log("\n\tExample [3]: Getting some help");
    console.log("\tadd-host -h, add-host --help");

    // Options
    console.log("\n\tAvailable [options] are:");
    console.log("\t-i, --ip [OPTIONAL, default: 127.0.0.1] (Set host ip/address)");
    console.log("\t-a, --alias (Set alias for host)");
    console.log("\t-c, --comment [OPTIONAL] (Set comment for added host)");
    console.log("\t-h, --help (See this beautyful description)\n");

    // Stop app
    process.exit(-1);
};
