import { Link, useParams } from "wouter";

import { Container, Layout } from "@/shared/layout";

function ReservationDetailPage() {
  const { id } = useParams<"/reservations/:id">();

  return (
    <Layout>
      <Container>
        <span style={eyebrowStyle}>Reservation</span>
        <h1 style={titleStyle}>예약 상세</h1>
        <p style={descriptionStyle}>
          현재 선택된 예약 ID는 <strong>{id}</strong> 입니다.
        </p>
        <p style={descriptionStyle}>
          이후 이 페이지에서 예약 상세 조회와 취소 액션을 연결하면 됩니다.
        </p>
        <div style={linkListStyle}>
          <Link href="/" style={linkStyle}>
            타임라인으로 돌아가기
          </Link>
          <Link href="/my-reservations" style={linkStyle}>
            내 예약 목록 보기
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

export default ReservationDetailPage;
