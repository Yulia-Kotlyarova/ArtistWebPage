import styles from "./subtitle.module.css";
import { cn } from "@/shared/lib/utils.ts";

type SectionTitleProps = {
  as?: "h2" | "h3" | "h4" | "p" | "span" | "div";
  className?: string;
  children: React.ReactNode;
};

export function Subtitle({
  as: Tag = "h4",
  className,
  children,
}: SectionTitleProps) {
  return <Tag className={cn(styles.subtitle, className)}>{children}</Tag>;
}
