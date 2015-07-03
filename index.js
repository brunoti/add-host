var isRoot = require('is-root');
var fs = require('fs');

module.exports = function addHost(newHost) {
  if(isRoot()) {
    if(newHost) {
      fs.appendFile('/etc/hosts', '\n127.0.0.1 ' + newHost + ' \n', function (err) {
        if (err) throw err;
        fs.readFile('/etc/hosts', function (err, data) {
          if (err) throw err;
          console.log(data.toString());
        });
      });
    } else {
      console.log('Error! "add-host newhost.dev"');
    }
  } else {
    console.warn('You have to use sudo or be a root user');
  }
}
