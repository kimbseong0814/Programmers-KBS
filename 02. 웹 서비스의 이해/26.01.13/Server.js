let http = require('http');
let url = require('url');


function start(route, handle) {

    function onRequire(request, response) {
        let pathname = url.parse(request.url).pathname;
        let queryData = url.parse(request.url, true).query;
        route(pathname, handle, response, queryData.productId);
    }

    http.createServer(onRequire).listen(8888);

}

exports.start = start;