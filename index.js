var http = require('http');
http.createServer(function (req, res) {
    console.log(`Huhhhh Just got a request at ${req.url}!`)
    console.log('Huh')
    res.write('Yay!');
    res.end();
}).listen(process.env.PORT || 3000);