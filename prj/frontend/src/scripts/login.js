// 사용자 입력값을 받아서, alert 메소드를 통해 화면에 출력하는 함수.
function popUpId() {
    const username = document.getElementById('username').value;

    // 사용자 입력값이 존재하지 않으면, 경고문 출력하고 함수 종료.
    if (!username) {
      alert("ID값은 반드시 입력되어야 합니다.");
      return;
    }
    
    // 입력값이 있다면 화면에 출력.
    alert("사용자가 입력한 ID값: " + username);
    
  }

  function myFunction() {
    alert("1");
    alert("2");
    alert("3");
  }