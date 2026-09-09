export default function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="shell flex flex-col gap-2 py-10 md:flex-row md:items-center md:justify-between">
        <p className="font-display text-lg font-medium text-ink">
          MUKTHAR M J
        </p>
        <p className="mono-label">
          Built with curiosity<span className="text-signal">.</span>
        </p>
        <p className="mono-label">&copy; 2026</p>
      </div>
    </footer>
  );
}
