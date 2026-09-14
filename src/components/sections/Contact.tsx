import { profile, socials } from "@/content/profile";
import Arrow from "@/components/ui/Arrow";
import CopyEmail from "@/components/ui/CopyEmail";

export default function Contact() {
  const email = socials[0];
  return (
    <section id="contact" className="contact" aria-labelledby="contact-title">
      <div className="shell">
        <div className="contact-top">
          <p className="eyebrow">Have something in mind?</p>
          <p className="availability">
            <span aria-hidden="true" />
            {profile.availability}
          </p>
        </div>
        <a className="contact-invitation" href={email.href}>
          <h2 id="contact-title">
            Let’s make
            <br />
            <i>something matter.</i>
          </h2>
          <Arrow />
        </a>
        <div className="contact-bottom">
          <div>
            <a className="contact-email" href={email.href}>
              {email.handle}
            </a>
            <CopyEmail email={email.href.slice(7)} />
          </div>
          <nav aria-label="Contact links">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                {...(social.label !== "Email"
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                {social.label}
                <Arrow />
              </a>
            ))}
          </nav>
        </div>
      </div>
    </section>
  );
}
