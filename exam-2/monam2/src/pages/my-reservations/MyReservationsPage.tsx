import { Link } from "wouter";

import { Container, Layout } from "@/shared/layout";

function MyReservationsPage() {
  return (
    <Layout>
      <Container>
        <span style={eyebrowStyle}>My Reservations</span>
        <h1 style={titleStyle}>내 예약 목록</h1>
        <p style={descriptionStyle}>
          사용자가 생성했거나 관리할 수 있는 예약 목록을 이 페이지에서 확인하게
          됩니다.
        </p>
        <div style={linkListStyle}>
          <Link href="/" style={linkStyle}>
            타임라인으로 돌아가기
          </Link>
          <Link href="/reservations/new" style={linkStyle}>
            새 예약 만들기
          </Link>
        </div>
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

const linkListStyle = {
  display: "flex",
  gap: "16px",
  marginTop: "20px",
};

const linkStyle = {
  color: "#2563eb",
  fontWeight: 600,
  textDecoration: "none",
};

export default MyReservationsPage;
