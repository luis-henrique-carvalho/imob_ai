import { Github, Linkedin, Twitter, ArrowUpRight } from "lucide-react";
import Link from 'next/link';

const footerLinks = {
  product: [
    { label: "Features", href: "#" },
    { label: "Pricing", href: "#" },
    { label: "Integrations", href: "#" },
    { label: "Changelog", href: "#" },
  ],
  company: [
    { label: "About Us", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Contact", href: "#" },
  ],
  legal: [
    { label: "Terms of Service", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "Cookie Policy", href: "#" },
    { label: "Security", href: "#" },
  ],
};

const socialLinks = [
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Github, href: "#", label: "GitHub" },
];

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container px-4 py-16 mx-auto sm:px-6 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          {/* Brand Column */}
          <div className="space-y-8 xl:col-span-1">
            <div className="flex items-center gap-2">
              <div className="size-8 rounded-lg bg-primary" />
              <span className="text-xl font-bold tracking-tight">Acme Corp</span>
            </div>
            <p className="text-muted-foreground max-w-xs text-sm leading-relaxed">
              Empowering global teams to build better software, faster. Your next-generation SaaS product starts here.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <span className="sr-only">{social.label}</span>
                    <Icon className="size-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 gap-8 mt-16 xl:col-span-2 xl:mt-0 md:grid-cols-3">
            <div>
              <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">
                Product
              </h3>
              <ul className="mt-4 space-y-4">
                {footerLinks.product.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center group"
                    >
                      {link.label}
                      <ArrowUpRight className="size-3 ml-1 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">
                Company
              </h3>
              <ul className="mt-4 space-y-4">
                {footerLinks.company.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center group"
                    >
                      {link.label}
                      <ArrowUpRight className="size-3 ml-1 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10 md:mt-0">
              <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">
                Legal
              </h3>
              <ul className="mt-4 space-y-4">
                {footerLinks.legal.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-8 mt-16 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Acme Corp, Inc. All rights reserved.
          </p>
          <div className="flex gap-4 text-sm text-muted-foreground">
            <Link href="#" className="hover:text-foreground transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
