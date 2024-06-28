

const getRandomElements = (arr, count) =>{
  const shuffled = arr.slice(); // 원본 배열을 복사
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // 요소를 섞음
  }
  if (count == null)
    return shuffled; // count가 주어지지 않으면 전체 배열을 반환
  return shuffled.slice(0, count); // 섞인 배열에서 처음 count개의 요소를 반환
}

export { getRandomElements };
