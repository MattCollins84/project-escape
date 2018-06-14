const ping = require('ping');

const hosts = [];
for (let i = 0; i <= 255; i++) {
  hosts.push('192.168.43.' + i)
}

hosts.forEach(function(host){
  ping.sys.probe(host, function(isAlive){
    var msg = isAlive ? 'host ' + host + ' is alive' : 'host ' + host + ' is dead';
    if (isAlive) {
      console.log(msg);
    }
  });
});