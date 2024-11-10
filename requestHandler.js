const fs = require('fs');
const main_view = fs.readFileSync('./main.html');
const orderlist_view = fs.readFileSync('./orderlist.html');
const path = require('path');

const mariadb = require('./database/connect/mariadb');

function main(req, response) {
    console.log('main');

    mariadb.query("SELECT * FROM product", function(err, rows) {
        console.log(rows);
    })

    response.writeHead(200, {'Content-Type' : 'text/html'});
    response.write(main_view);
    response.end();    
}

function redRacket(req, response) {
    fs.readFile('./img/redRacket.png', function(err, data) {
        response.writeHead(200, {'Content-Type' : 'text/html'});
        response.write(data);
        response.end(); 
    })
}

function blueRacket(req, response) {
    fs.readFile('./img/blueRacket.png', function(err, data) {
        response.writeHead(200, {'Content-Type' : 'text/html'});
        response.write(data);
        response.end(); 
    })
}

function blackRacket(req, response) {
    fs.readFile('./img/blackRacket.png', function(err, data) {
        response.writeHead(200, {'Content-Type' : 'text/html'});
        response.write(data);
        response.end(); 
    })
}

function order(req, response, decodedPathname, productId) {
    response.writeHead(200, {'Content-Type' : 'text/html'});

    mariadb.query("INSERT INTO orderlist VALUES (" + productId + ", '" + new Date().toLocaleDateString() + "');", function(err, rows) {
        console.log(rows);
    })

    response.write('Thank you for your order! <br> you can check the result on the order list page.');
    response.end(); 
}

function orderlist(req, response) {
    console.log('orderlist');

    response.writeHead(200, {'Content-Type' : 'text/html'});

    mariadb.query("SELECT * FROM orderlist", function(err, rows) {
        response.write(orderlist_view);

        rows.forEach(element => {
            response.write("<tr>" 
                        + "<td>"+element.product_id+"</td>"
                        + "<td>"+element.order_date+"</td>"
                        + "</tr>");
        });
        
        response.write("</table>");
        response.end();
    })
}



function serveCSS(req, res) {
    // 요청된 URL에서 파일 경로 추출
    const cssFilePath = path.join(__dirname, './', path.basename(req.url));

    fs.readFile(cssFilePath, (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.write('CSS 파일을 찾을 수 없습니다.');
            res.end();
            return;
        }
        res.writeHead(200, { 'Content-Type': 'text/css' });
        res.write(data);
        res.end();
    });
}

let handle = {}; // key:value
handle['/'] = main;
handle['/order'] = order;
handle['/orderlist'] = orderlist;

/* image directory */
handle['/img/redRacket.png'] = redRacket;
handle['/img/blueRacket.png'] = blueRacket;
handle['/img/blackRacket.png'] = blackRacket;

// CSS 핸들러 등록
handle['/main.css'] = serveCSS;
handle['/orderlist.css'] = serveCSS;

exports.handle = handle;