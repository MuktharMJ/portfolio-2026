import Link from "next/link";
import Arrow from "@/components/ui/Arrow";

export default function NotFound() {
  return (
    <main id="content" className="shell not-found">
      <p className="eyebrow">404 / Page not found</p>
      <h1>
        A wrong turn.
        <br />
        <i>A fresh start.</i>
      </h1>
      <Link href="/#work" className="text-link">
        Explore the work <Arrow direction="right" />
      </Link>
    </main>
  );
}
