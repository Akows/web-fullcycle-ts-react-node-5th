const fs = require('fs');
const path = require('path');
const main_view = fs.readFileSync('../../frontend/src/pages/main.html');
const orderlist_view = fs.readFileSync('../../frontend/src/pages/orderlist.html');

const mariadb = require('../database/connect/mariadb');

function main(req, res) {
    mariadb.connect((err) => {
        if (err) {
            console.error('데이터베이스 연결 실패:', err);
            res.writeHead(500, { 'Content-Type': 'text/plain; charset=UTF-8' });
            res.write('데이터베이스 연결 오류');
            res.end();
            return;
        }

        mariadb.query("SELECT * FROM product", function(err, rows) {
            console.log(rows);
        })
    
        res.writeHead(200, {'Content-Type' : 'text/html'});
        res.write(main_view);
        res.end();    
    });
}

function serveCSS(req, res, cssFile) {
    const cssPath = path.join(__dirname, `../../frontend/src/style/${cssFile}`);
    fs.readFile(cssPath, (err, data) => {
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

function redRacket(req, res) {
    fs.readFile(path.join(__dirname, '../../frontend/src/img/redRacket.png'), (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.write('이미지를 찾을 수 없습니다.');
            res.end();
            return;
        }
        res.writeHead(200, { 'Content-Type': 'image/png' });
        res.write(data);
        res.end();
    });
}

// function redRacket(res) {
//     fs.readFile('../frontend/img/redRacket.png', function(err, data) {
//         res.writeHead(200, {'Content-Type' : 'text/html'});
//         res.write(data);
//         res.end(); 
//     })
// }

function blueRacket(res) {
    fs.readFile('../frontend/img/blueRacket.png', function(err, data) {
        res.writeHead(200, {'Content-Type' : 'text/html'});
        res.write(data);
        res.end(); 
    })
}

function blackRacket(res) {
    fs.readFile('../frontend/img/blackRacket.png', function(err, data) {
        res.writeHead(200, {'Content-Type' : 'text/html'});
        res.write(data);
        res.end(); 
    })
}

function order(res, productId) {
    res.writeHead(200, {'Content-Type' : 'text/html'});

    mariadb.query("INSERT INTO orderlist VALUES (" + productId + ", '" + new Date().toLocaleDateString() + "');", function(err, rows) {
        console.log(rows);
    })

    res.write('Thank you for your order! <br> you can check the result on the order list page.');
    res.end(); 
}

function orderlist(res) {
    console.log('orderlist');

    res.writeHead(200, {'Content-Type' : 'text/html'});

    mariadb.query("SELECT * FROM orderlist", function(err, rows) {
        res.write(orderlist_view);

        rows.forEach(element => {
            res.write("<tr>" 
                        + "<td>"+element.product_id+"</td>"
                        + "<td>"+element.order_date+"</td>"
                        + "</tr>");
        });
        
        res.write("</table>");
        res.end();
    })
}

let handle = {};
handle['/'] = main;
handle['/order'] = order;
handle['/orderlist'] = orderlist;

/* image directory */
handle['/img/redRacket.png'] = redRacket;
handle['/img/blueRacket.png'] = blueRacket;
handle['/img/blackRacket.png'] = blackRacket;

handle['/style/main.css'] = (req, res) => serveCSS(req, res, 'main.css');
handle['/style/orderlist.css'] = (req, res) => serveCSS(req, res, 'orderlist.css');

exports.handle = handle;









// async function main(req, res) {
//     console.log('main');
    
//     try {
//         const conn = await mariadb.getConnection();
//         const rows = await conn.query("SELECT * FROM product");
//         conn.release(); // 연결 해제

//         res.writeHead(200, { 'Content-Type': 'application/json; charset=UTF-8' });
//         res.write(JSON.stringify(rows)); // JSON 형식으로 응답
//         res.end();
//     } catch (err) {
//         console.error(err);
//         res.writeHead(500, { 'Content-Type': 'text/plain; charset=UTF-8' });
//         res.write('데이터를 가져오는 중 오류가 발생했습니다.');
//         res.end();
//     }
// }

// function name(req, res, decodedPathname) {
//     console.log('Requested pathname: ' + decodedPathname); // 요청된 경로를 콘솔에 출력

//     res.writeHead(200, { 'Content-Type': 'text/plain; charset=UTF-8' });
//     res.write(decodedPathname);
//     res.end();
// }

// // 라우팅을 위한 매핑 객체
// // URL 경로를 키(key)로, 각 경로에서 수행할 **핸들러 함수(값, value)**를 연결
// let handle = {};
// handle['/'] = main;
// handle['/이유승'] = name;

// module.exports = { handle };