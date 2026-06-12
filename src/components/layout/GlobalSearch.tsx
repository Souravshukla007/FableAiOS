import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Search, Send, Layers, Users as UsersIcon } from "lucide-react";
import { api } from "@/lib/api";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { NAV_ITEMS } from "./nav-items";

const MAX_PER_GROUP = 6;

// Global command-palette search. Searches customers, campaigns, and segments
// and jumps to the matching destination. Opens from the top bar triggers or
// with the ⌘K / Ctrl+K keyboard shortcut.
export function GlobalSearch() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  // Keyboard shortcut: Cmd/Ctrl + K toggles the palette.
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  // Only fetch entities once the palette has been opened.
  const customers = useQuery({
    queryKey: ["customers"],
    queryFn: api.getCustomers,
    enabled: open,
    staleTime: 60_000,
  });
  const campaigns = useQuery({
    queryKey: ["campaigns"],
    queryFn: api.getCampaigns,
    enabled: open,
    staleTime: 60_000,
  });
  const segments = useQuery({
    queryKey: ["segments"],
    queryFn: api.getSegments,
    enabled: open,
    staleTime: 60_000,
  });

  const q = query.trim().toLowerCase();

  const pages = useMemo(
    () => (q ? NAV_ITEMS.filter((i) => i.label.toLowerCase().includes(q)) : NAV_ITEMS),
    [q]
  );

  const customerMatches = useMemo(() => {
    if (!q) return [];
    return (customers.data ?? [])
      .filter((c) => (c.name + " " + c.email + " " + c.city).toLowerCase().includes(q))
      .slice(0, MAX_PER_GROUP);
  }, [customers.data, q]);

  const campaignMatches = useMemo(() => {
    if (!q) return [];
    return (campaigns.data ?? [])
      .filter((c) => c.name.toLowerCase().includes(q))
      .slice(0, MAX_PER_GROUP);
  }, [campaigns.data, q]);

  const segmentMatches = useMemo(() => {
    if (!q) return [];
    return (segments.data ?? [])
      .filter((s) => (s.name + " " + s.description).toLowerCase().includes(q))
      .slice(0, MAX_PER_GROUP);
  }, [segments.data, q]);

  function go(fn: () => void) {
    setOpen(false);
    setQuery("");
    fn();
  }

  return (
    <>
      {/* Desktop: search-field-style trigger */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open global search"
        className={cn(
          "relative hidden h-9 flex-1 max-w-md items-center rounded-md border border-transparent bg-secondary/50 pl-9 pr-2 text-sm text-muted-foreground transition-colors hover:bg-secondary sm:flex"
        )}
      >
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />
        <span className="truncate">Search customers, campaigns, segments…</span>
        <kbd className="ml-auto hidden items-center gap-0.5 rounded border bg-background px-1.5 font-mono text-[10px] font-medium text-muted-foreground md:inline-flex">
          ⌘K
        </kbd>
      </button>

      {/* Mobile: icon-only trigger */}
      <Button
        variant="ghost"
        size="icon"
        className="sm:hidden"
        aria-label="Open global search"
        onClick={() => setOpen(true)}
      >
        <Search className="h-5 w-5" />
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="overflow-hidden p-0">
          <Command
            shouldFilter={false}
            className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5"
          >
            <CommandInput
              placeholder="Search customers, campaigns, segments…"
              value={query}
              onValueChange={setQuery}
            />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>

              {pages.length > 0 && (
                <CommandGroup heading="Pages">
                  {pages.map((item) => (
                    <CommandItem
                      key={item.to}
                      value={`page-${item.to}`}
                      onSelect={() => go(() => navigate({ to: item.to }))}
                    >
                      <item.icon className="text-muted-foreground" />
                      <span>{item.label}</span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}

              {customerMatches.length > 0 && (
                <>
                  <CommandSeparator />
                  <CommandGroup heading="Customers">
                    {customerMatches.map((c) => (
                      <CommandItem
                        key={c.id}
                        value={`customer-${c.id}`}
                        onSelect={() => go(() => navigate({ to: "/customers", search: { q: c.name } }))}
                      >
                        <UsersIcon className="text-muted-foreground" />
                        <span className="truncate">{c.name}</span>
                        <span className="ml-auto truncate text-xs text-muted-foreground">{c.email}</span>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </>
              )}

              {campaignMatches.length > 0 && (
                <>
                  <CommandSeparator />
                  <CommandGroup heading="Campaigns">
                    {campaignMatches.map((c) => (
                      <CommandItem
                        key={c.id}
                        value={`campaign-${c.id}`}
                        onSelect={() => go(() => navigate({ to: "/campaigns/$id", params: { id: c.id } }))}
                      >
                        <Send className="text-muted-foreground" />
                        <span className="truncate">{c.name}</span>
                        <span className="ml-auto truncate text-xs capitalize text-muted-foreground">
                          {c.status}
                        </span>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </>
              )}

              {segmentMatches.length > 0 && (
                <>
                  <CommandSeparator />
                  <CommandGroup heading="Segments">
                    {segmentMatches.map((s) => (
                      <CommandItem
                        key={s.id}
                        value={`segment-${s.id}`}
                        onSelect={() => go(() => navigate({ to: "/segments" }))}
                      >
                        <Layers className="text-muted-foreground" />
                        <span className="truncate">{s.name}</span>
                        <span className="ml-auto truncate text-xs text-muted-foreground">
                          {s.customerCount} customers
                        </span>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </>
              )}
            </CommandList>
          </Command>
        </DialogContent>
      </Dialog>
    </>
  );
}
