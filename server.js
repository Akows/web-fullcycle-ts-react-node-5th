const http = require('http');
const url = require('url');

function startServer(port = 3000, route, handle) {
  const server = http.createServer((req, res) => {

    // 요청 URL을 파싱하여 경로 추출
    let pathname = url.parse(req.url).pathname;

    let queryData = url.parse(req.url, true).query;

    // /favicon.ico 요청 무시
    if (pathname === '/favicon.ico') {
        res.writeHead(204); // No Content 응답 코드
        res.end();
        return;
      }

    route(pathname, handle, req, res, queryData.productId); // 경로와 핸들러, 요청 및 응답 객체 전달
  });

  server.listen(port, () => {
    console.log(`웹 서버가 해당 주소에서 동작 중입니다. :: http://localhost:${port}`);
  });
}

module.exports = { startServer };
