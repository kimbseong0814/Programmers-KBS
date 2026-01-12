function main(response) {
    response.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8'
    });
    response.write('KBS');
    response.end();
}

function login(response) {
    console.log('login');

    response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    response.write('Login Page');
    response.end();
}

let handles = {};

handles['/'] = main;
handles['/login'] = login;

exports.handle = handles;
