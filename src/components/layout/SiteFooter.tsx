import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell">
        <Link href="/" className="wordmark" aria-label="Mukthar M J — home">
          mukthar.
        </Link>
        <p>Built with curiosity. Made with care.</p>
        <p>© 2026 Mukthar M J</p>
      </div>
    </footer>
  );
}
