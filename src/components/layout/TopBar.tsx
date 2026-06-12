import { Link, useNavigate } from "@tanstack/react-router";
import { Search, Bell, Moon, Sun, Plus, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTheme } from "@/lib/theme";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function TopBar() {
  const { theme, toggle } = useTheme();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b bg-background/80 px-4 backdrop-blur md:px-6">
      <div className="relative hidden flex-1 max-w-md sm:block">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search customers, campaigns, segments…"
          className="pl-9 bg-secondary/50 border-transparent focus-visible:border-ring"
          aria-label="Global search"
        />
      </div>
      <div className="flex-1 sm:hidden" />

      <div className="ml-auto flex items-center gap-1.5">
        <Button
          onClick={() => navigate({ to: "/campaigns/new" })}
          className="gap-1.5 font-medium"
        >
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">New Campaign</span>
        </Button>

        <Button variant="ghost" size="icon" onClick={toggle} aria-label="Toggle theme">
          {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Notifications" className="relative">
              <Bell className="h-4 w-4" />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-primary" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex flex-col items-start gap-0.5">
              <span className="text-sm font-medium">Campaign completed</span>
              <span className="text-xs text-muted-foreground">VIP early access delivered to 31 customers.</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex flex-col items-start gap-0.5">
              <span className="text-sm font-medium">AI suggestion ready</span>
              <span className="text-xs text-muted-foreground">Dormant high-value win-back opportunity detected.</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex flex-col items-start gap-0.5">
              <span className="text-sm font-medium">Delivery alert</span>
              <span className="text-xs text-muted-foreground">3 SMS messages failed and were retried.</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
