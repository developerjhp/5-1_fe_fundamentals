import { Link } from "wouter";

import { Container, Layout } from "@/shared/layout";

export default function NewReservationPage() {
  return (
    <Layout>
      <Container>
        <span style={eyebrowStyle}>Reservation</span>
        <h1 style={titleStyle}>예약 생성</h1>
        <p style={descriptionStyle}>
          회의실 선택, 날짜/시간 선택, 제목과 참석 인원을 입력하는 폼을 이
          페이지에 구성하게 됩니다.
        </p>
        <Link href="/" style={linkStyle}>
          타임라인으로 돌아가기
        </Link>
      </Container>
    </Layout>
  );
}

const eyebrowStyle = {
  color: "#2563eb",
  fontSize: "0.875rem",
  fontWeight: 700,
  textTransform: "uppercase" as const,
  letterSpacing: "0.08em",
};

const titleStyle = {
  margin: "8px 0 0",
  fontSize: "2rem",
  fontWeight: 700,
};

const descriptionStyle = {
  maxWidth: "40rem",
  color: "#4b5563",
  lineHeight: 1.6,
};

const linkStyle = {
  color: "#2563eb",
  fontWeight: 600,
  textDecoration: "none",
};
