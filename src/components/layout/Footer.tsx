import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { site, socialLinks } from "@/data/site";

export function Footer() {
  return (
    <footer className="border-t border-line py-10">
      <Container className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-display text-sm font-semibold text-ink">{site.name}</p>
          <p className="mt-1 text-sm text-muted">
            © 2026 {site.name}. {site.brand.message}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-5 text-sm">
          {socialLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-muted hover:text-ink"
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.label}
            </a>
          ))}
          <a href={`mailto:${site.email}`} className="text-muted hover:text-ink">
            Email
          </a>
          <Link href="/#home" className="text-gold hover:text-ink">
            Back to top
          </Link>
        </div>
      </Container>
    </footer>
  );
}
