"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Features", href: "#" },
  { label: "Pricing", href: "#" },
  { label: "About", href: "#" },
  { label: "Blog", href: "#" },
];

export function PublicNavbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container px-4 mx-auto h-16 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 shrink-0 group"
          aria-label="Acme Corp - Home"
        >
          <div className="size-8 rounded-lg bg-primary group-hover:opacity-90 transition-opacity" />
          <span className="font-bold text-lg tracking-tight hidden sm:inline text-foreground">
            Acme Corp
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8 flex-1 justify-center">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3 shrink-0">
          <Button variant="ghost" size="sm" className="text-sm font-medium" asChild>
            <Link href="/login">Sign In</Link>
          </Button>
          <Button variant="default" size="sm" className="text-sm font-medium" asChild>
            <Link href="/register">Get Started</Link>
          </Button>
        </div>

        <Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
          <SheetTrigger
            className="md:hidden p-2 -mr-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors"
            aria-label="Open navigation menu"
          >
            <Menu className="size-5" />
          </SheetTrigger>

          <SheetContent side="right" className="data-[state=open]:slide-in-from-top-0 sm:max-w-xs">
            <SheetHeader className="text-left py-4">
              <SheetTitle className="text-lg">Acme Corp</SheetTitle>
            </SheetHeader>

            <div className="no-scrollbar overflow-y-auto">
              <div className="space-y-1 py-4">
                {navLinks.map((link) => (
                  <SheetClose asChild key={link.label}>
                    <a
                      href={link.href}
                      className="block px-4 py-2 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors"
                    >
                      {link.label}
                    </a>
                  </SheetClose>
                ))}
              </div>
            </div>

            <SheetFooter className="flex flex-col gap-3 mt-auto pt-4 border-t border-border">
              <SheetClose asChild>
                <Link href="/login" className="block w-full">
                  <Button variant="outline" className="w-full">
                    Sign In
                  </Button>
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link href="/register" className="block w-full">
                  <Button variant="default" className="w-full">
                    Get Started
                  </Button>
                </Link>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
