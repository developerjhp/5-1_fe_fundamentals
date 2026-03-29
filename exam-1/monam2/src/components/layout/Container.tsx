import { css } from "@emotion/react";

export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <main css={ContainerStyle}>
      <section css={SectionStyle}>{children}</section>
    </main>
  );
}

const ContainerStyle = css({
  minHeight: "100vh",
  background: "#ffffff",
  padding: "4rem 1.5rem 5rem",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "3rem",
});

const SectionStyle = css({
  maxWidth: "960px",
  width: "100%",
  margin: "0 auto",
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  gap: "1.25rem",
});
