let server = require('./Server');
let router = require('./router');
let requestHandler = require('./requestHandler');

server.start(router.route, requestHandler.handle); 
