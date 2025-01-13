import { useState, useEffect } from "react";

const Clock: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<string>("");

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const formattedTime = now.toLocaleTimeString(); // 현재 시각을 로컬 포맷으로 가져옴
      setCurrentTime(formattedTime);
    };

    // 시간 업데이트
    updateClock();
    const intervalId = setInterval(updateClock, 1000); // 1초마다 업데이트

    return () => clearInterval(intervalId); // 컴포넌트 언마운트 시 인터벌 클리어
  }, []);

  return <div>{currentTime}</div>;
};

export default Clock;
