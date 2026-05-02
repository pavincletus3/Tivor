import { ReactNode, CSSProperties } from "react";
import { clsx } from "clsx";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  as?: React.ElementType;
  style?: CSSProperties;
}

export function Container({
  children,
  className,
  as: Tag = "div",
  style,
}: ContainerProps) {
  return (
    <Tag
      className={clsx("mx-auto w-full max-w-[1280px] px-4 sm:px-6 md:px-10", className)}
      style={style}
    >
      {children}
    </Tag>
  );
}
