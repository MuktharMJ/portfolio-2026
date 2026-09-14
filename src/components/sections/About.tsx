import { profile, resume } from "@/content/profile";
import Arrow from "@/components/ui/Arrow";
import Reveal from "@/components/motion/Reveal";

export default function About() {
  return (
    <section id="about" className="about" aria-labelledby="about-title">
      <div className="shell about-layout">
        <div className="about-rail">
          <p className="eyebrow">A little about me</p>
          <span className="about-monogram" aria-hidden="true">
            m.
          </span>
        </div>
        <div>
          <Reveal>
            <h2 id="about-title">
              An engineer.
              <br />A builder.
              <br />
              <i>Always a student.</i>
            </h2>
            <p className="about-lead">{profile.aboutCore}</p>
            <p className="about-note">
              My work moves between full-stack web development, interfaces, and
              AI — from exploring software in 3D to making everyday decisions a
              little easier.
            </p>
          </Reveal>
          <div id="resume" className="education">
            <div>
              <p className="eyebrow">Currently studying</p>
              <h3>{resume.education}</h3>
              <p>
                {resume.institution} <span>· {resume.period}</span>
              </p>
            </div>
            <a
              href={resume.pdfHref}
              target="_blank"
              rel="noopener noreferrer"
              className="text-link"
            >
              View résumé <Arrow />
              <span className="sr-only"> (PDF, opens in new tab)</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
