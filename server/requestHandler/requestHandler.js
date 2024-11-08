// const fs = require('fs');
// const main_view = fs.readFileSync('../pages/main.html');
// const orderlist_view = fs.readFileSync('../pages/orderlist.html');

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

        mariadb.query("SELECT * FROM product", (err, rows) => {
            if (err) {
                console.error('Query execution failed:', err);
                res.writeHead(500, { 'Content-Type': 'text/plain; charset=UTF-8' });
                res.write('데이터를 가져오는 중 오류가 발생했습니다.');
                res.end();
                return;
            }

            res.writeHead(200, { 'Content-Type': 'application/json; charset=UTF-8' });
            res.write(JSON.stringify(rows));
            res.end();
        });
    });
}

function redRacket(res) {
    const imgPath = path.join(__dirname, '../frontend/img/redRacket.png');

    fs.readFile(imgPath, (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain; charset=UTF-8' });
            res.write('이미지를 찾을 수 없습니다.');
            res.end();
        } else {
            res.writeHead(200, { 'Content-Type': 'image/png' });
            res.write(data);
            res.end();
        }
    });
}

function blueRacket(res) {
    const imgPath = path.join(__dirname, '../frontend/img/blueRacket.png');

    fs.readFile(imgPath, (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain; charset=UTF-8' });
            res.write('이미지를 찾을 수 없습니다.');
            res.end();
        } else {
            res.writeHead(200, { 'Content-Type': 'image/png' });
            res.write(data);
            res.end();
        }
    });
}

function blackRacket(res) {
    const imgPath = path.join(__dirname, '../frontend/img/blackRacket.png');

    fs.readFile(imgPath, (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain; charset=UTF-8' });
            res.write('이미지를 찾을 수 없습니다.');
            res.end();
        } else {
            res.writeHead(200, { 'Content-Type': 'image/png' });
            res.write(data);
            res.end();
        }
    });
}

// function order(response, productId) {
//     response.writeHead(200, {'Content-Type' : 'text/html'});

//     mariadb.query("INSERT INTO orderlist VALUES (" + productId + ", '" + new Date().toLocaleDateString() + "');", function(err, rows) {
//         console.log(rows);
//     })

//     response.write('Thank you for your order! <br> you can check the result on the order list page.');
//     response.end(); 
// }

// function orderlist(response) {
//     console.log('orderlist');

//     response.writeHead(200, {'Content-Type' : 'text/html'});

//     mariadb.query("SELECT * FROM orderlist", function(err, rows) {
//         response.write(orderlist_view);

//         rows.forEach(element => {
//             response.write("<tr>" 
//                         + "<td>"+element.product_id+"</td>"
//                         + "<td>"+element.order_date+"</td>"
//                         + "</tr>");
//         });
        
//         response.write("</table>");
//         response.end();
//     })
// }

let handle = {};
handle['/'] = main;
// handle['/order'] = order;
// handle['/orderlist'] = orderlist;

/* image directory */
handle['/img/redRacket.png'] = redRacket;
handle['/img/blueRacket.png'] = blueRacket;
handle['/img/blackRacket.png'] = blackRacket;

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