import { useEffect, useRef } from "react";

interface ImpressionAreaProps {
  children: React.ReactNode;
  areaThreshold: number;
  onImpressionStart?: () => void;
  style?: React.CSSProperties;
}

export default function ImpressionArea({
  children,
  areaThreshold,
  onImpressionStart,
  style,
  ...otherProps
}: ImpressionAreaProps) {
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!observerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onImpressionStart?.();
        }
      },
      { threshold: areaThreshold },
    );

    observer.observe(observerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [areaThreshold, onImpressionStart]);

  return (
    <div ref={observerRef} style={style} {...otherProps}>
      {children}
    </div>
  );
}
