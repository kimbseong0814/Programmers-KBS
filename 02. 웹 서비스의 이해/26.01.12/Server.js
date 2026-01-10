let http = require('http');
let url = require('url');


function start(route, handle) {

    function onRequire(request, response) {
        let pathname = url.parse(request.url).pathname;
        route(pathname, handle);
    }

    http.createServer(onRequire).listen(8888);

}

exports.start = start;