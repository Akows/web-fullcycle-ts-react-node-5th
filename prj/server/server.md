# 실전 프로젝트 01 서버 구성

## 서버 동작 원리
* 서버 시작 및 포트 대기 → 2. 요청 수신 및 라우팅 확인 → 3. 해당 경로의 컨트롤러 함수 호출 → 4. 필요시 데이터베이스 쿼리 실행 → 5. 클라이언트에 응답 전송 → 6. 클라이언트에서 화면 출력

* 서버 초기화 및 대기

server.js 파일에서 http.createServer()로 HTTP 서버를 생성하고, server.listen(PORT)으로 특정 포트(예: 3000)에서 클라이언트 요청을 대기합니다.
서버가 실행되면 http://localhost:3000에서 서버에 접근할 수 있습니다.

* 클라이언트 요청 수신 및 라우팅

    - 클라이언트가 서버로 요청을 보낼 때, 서버는 해당 요청 URL을 확인합니다.
    - server.js에서 요청 URL을 검사하여 routes 객체에서 해당 경로와 연결된 함수를 찾습니다.
    - routes/routes.js에 정의된 routes 객체는 각 URL 경로와 해당 경로를 처리할 함수(컨트롤러)를 매핑해 놓았습니다. 예를 들어:
    - / 경로 요청 -> mainController.main 함수로 전달
    - /order 경로 요청 -> orderController.order 함수로 전달
    - 이미지 파일 경로 요청 -> mainController 내 이미지 제공 함수로 전달

* 컨트롤러에서 요청 처리

    - 라우터가 연결한 함수는 각각 특정 경로에 대한 요청을 처리하는 역할을 합니다.
        - 예를 들어, /orderlist 경로에 대한 요청이 들어오면 orderController.orderlist 함수가 호출되어 데이터베이스에서 주문 목록을 가져옵니다.

* 데이터베이스와의 상호작용

    - 데이터베이스가 필요한 경로(order, orderlist 등)에서는 mariadb.query()를 사용하여 MariaDB 데이터베이스와 상호작용을 수행합니다.
        - 예를 들어, orderController.orderlist 함수는 SELECT * FROM orderlist 쿼리를 사용하여 orderlist 테이블의 데이터를 조회하고 이를 클라이언트에 반환합니다.
        - orderController.order 함수에서는 INSERT INTO orderlist VALUES (?, ?) 쿼리를 사용하여 새로운 주문 항목을 추가합니다.
        - 데이터베이스 쿼리가 완료되면, 결과는 클라이언트로 전달됩니다.

* 클라이언트에 응답 전송

    - 각 컨트롤러 함수는 요청에 대한 결과를 response 객체를 통해 클라이언트에 반환합니다.
    - 응답을 구성할 때, response.writeHead로 응답 상태 코드와 헤더를 설정하고, response.write로 내용을 작성한 후 response.end로 응답을 종료합니다.
        - 예를 들어, mainController.main 함수는 main.html 파일을 HTML 응답으로 클라이언트에 전송합니다.
        - 이미지 파일의 경우 redRacket, blueRacket, blackRacket 함수가 각각 요청된 이미지를 읽어 클라이언트에 반환합니다.

* 클라이언트 응답 수신 및 화면 출력

    - 클라이언트는 서버로부터 응답을 받고, 요청에 따라 HTML 페이지, 이미지, 또는 주문 목록을 화면에 표시합니다.
        - 예를 들어, /orderlist 요청 시 서버로부터 HTML 페이지와 함께 주문 목록이 테이블 형식으로 출력됩니다.

## 서버 구성 파일

* routes/routes.js
    - URL 경로와 각각의 컨트롤러 함수들을 매핑합니다.

* controllers/mainController.js
    - 메인 페이지와 이미지 제공 기능을 담당합니다.

* controllers/orderController.js
    - 주문 추가 및 주문 목록 조회 기능을 담당합니다.

* database/mariadb.js
    - MariaDB 연결을 위한 설정 파일입니다.