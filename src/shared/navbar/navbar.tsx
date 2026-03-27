import { NavLink } from "react-router-dom";
import { cn } from "@/shared/lib/utils.ts";

export function NavItem({ to, label }: { to: string; label: string }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "px-3 py-1.5 text-sm font-medium transition-colors",
          "text-muted-foreground hover:text-foreground",
          isActive && "text-foreground",
        )
      }
    >
      {label}
    </NavLink>
  );
}
