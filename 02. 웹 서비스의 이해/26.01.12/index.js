let server = require('./Server');
let router = require('./router');

server.start(router.route);