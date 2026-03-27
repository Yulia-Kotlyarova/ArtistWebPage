import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/shared/lib/utils.ts";

const linkVariants = {
  button:
    "inline-flex items-center justify-center bg-primary px-6 py-2 font-medium text-primary-foreground no-underline transition-opacity hover:opacity-90 hover:no-underline",
  muted:
    "text-sm text-muted-foreground/80 no-underline transition-colors hover:text-foreground",
} as const;

type ActionLinkProps = React.ComponentPropsWithoutRef<typeof Slot> & {
  variant?: keyof typeof linkVariants;
};

export function ActionLink({
  className,
  variant = "muted",
  ...props
}: ActionLinkProps) {
  return <Slot className={cn(linkVariants[variant], className)} {...props} />;
}
