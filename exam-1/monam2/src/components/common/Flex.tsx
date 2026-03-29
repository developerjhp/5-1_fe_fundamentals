import { css, type SerializedStyles } from "@emotion/react";

interface FlexProps {
  children: React.ReactNode;
  direction?: "row" | "column";
  justify?: "start" | "center" | "end";
  align?: "start" | "center" | "end";
  gap?: string;
  wrap?: boolean;
  css?: SerializedStyles;
}

export default function Flex({
  children,
  direction = "row",
  justify = "start",
  align = "center",
  gap = "1rem",
  wrap = false,
  css: cssProp,
}: FlexProps) {
  return (
    <div css={[flexStyle(direction, justify, align, gap, wrap), cssProp]}>
      {children}
    </div>
  );
}
const flexStyle = (
  direction: "row" | "column",
  justify: "start" | "center" | "end",
  align: "start" | "center" | "end",
  gap: string,
  wrap: boolean,
) => css`
  display: flex;
  gap: ${gap};
  align-items: ${align};
  justify-content: ${justify};
  flex-direction: ${direction};
  flex-wrap: ${wrap ? "wrap" : "nowrap"};
`;
