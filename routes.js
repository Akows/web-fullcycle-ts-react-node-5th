function route(pathname, handle, res, productId) {
    // 한글 URL도 정상 출력 하도록 디코딩
    const decodedPathname = decodeURIComponent(pathname);

    if (typeof handle[decodedPathname] == 'function') {
        handle[decodedPathname](res, decodedPathname, productId);
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=UTF-8' });
        res.write('찾으시는 페이지는 존재하지 않는 페이지입니다.');
        res.end();

        console.log(`No handler found for ${decodedPathname}`);
    }
}

module.exports = { route };
