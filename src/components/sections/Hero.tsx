import Arrow from "@/components/ui/Arrow";

export default function Hero() {
  return (
    <section className="hero shell" aria-labelledby="hero-title">
      <div className="hero-intro">
        <span className="eyebrow">
          Independent mind. Product-minded engineer.
        </span>
        <span className="eyebrow hero-edition">Selected portfolio / 2026</span>
      </div>
      <h1 id="hero-title" className="hero-title">
        Ideas into
        <br />
        <span className="hero-second">
          <i>things.</i>
          <span className="hero-asterisk" aria-hidden="true">
            ✳
          </span>
        </span>
      </h1>
      <div className="hero-bottom">
        <p className="hero-identity">
          Mukthar M J<span>Software engineering student</span>
        </p>
        <div className="hero-description">
          <p>
            I build web products, thoughtful interfaces, and experiences with
            AI. From the first idea to the details that make it work.
          </p>
          <a className="text-link" href="#work">
            Explore my work <Arrow direction="down" />
          </a>
        </div>
      </div>
    </section>
  );
}
