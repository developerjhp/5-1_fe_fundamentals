function App() {
  return (
    <div>
      <h1>SIPE Study Case</h1>
      <p>여기서부터 시작하세요! 이 파일을 자유롭게 수정해주세요.</p>
      <p>
        <code>pnpm dev</code> 실행 후 아래 API로 테스트할 수 있습니다.
      </p>
      <ul>
        <li>
          <code>GET /api/members</code> — 스터디원 목록
        </li>
        <li>
          <code>GET /api/levels</code> — 학습 단계 목록
        </li>
        <li>
          <code>GET /api/problem-types?levelKey=...</code> — 문제 유형 목록
        </li>
        <li>
          <code>GET /api/proficiency?memberId=...&levelKey=...</code> — 숙련도 목록
        </li>
      </ul>
    </div>
  );
}

export default App;
