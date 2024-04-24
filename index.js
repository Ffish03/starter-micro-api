var http = require('http');
const querystring = require('querystring');

http.createServer(function (req, res) {
    console.log(`Just got a request at ${req.url}!`)
    if (req.method === 'POST' && req.url === '/login') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString(); // convert Buffer to string
        });
        req.on('end', () => {
            const parsedBody = querystring.parse(body); // analizza i dati del corpo
            const yourField = parsedBody.username; // estrai il campo desiderato

            console.log(yourField);
            res.end('Campo ricevuto!');
        });
    }
    res.write('Yay!');
    res.end();
}).listen(process.env.PORT || 3000);