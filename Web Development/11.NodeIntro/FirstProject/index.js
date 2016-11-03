var server = require('./server4');
var router = require('./router3')
var requestHandlers = require('./requestHandlers3');

var handle = {};
handle['/'] = requestHandlers.start;
handle['/start'] = requestHandlers.start;
handle['/upload'] = requestHandlers.upload;

server.start(router.route, handle);