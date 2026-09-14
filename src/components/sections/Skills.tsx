import { skillGroups } from "@/content/skills";
import Reveal from "@/components/motion/Reveal";

function SkillSymbol({ index }: { index: number }) {
  const paths = [
    <path key="code" d="m9 7-5 5 5 5m6-10 5 5-5 5m-2-13-2 16" />,
    <g key="ui">
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 9h18M9 9v11" />
    </g>,
    <g key="api">
      <rect x="3" y="4" width="18" height="6" rx="2" />
      <rect x="3" y="14" width="18" height="6" rx="2" />
      <path d="M7 7h1m-1 10h1m4-7v4" />
    </g>,
    <g key="data">
      <ellipse cx="12" cy="5" rx="8" ry="3" />
      <path d="M4 5v14c0 4 16 4 16 0V5M4 12c0 4 16 4 16 0" />
    </g>,
    <path
      key="ai"
      d="M12 2c0 6-4 10-10 10 6 0 10 4 10 10 0-6 4-10 10-10-6 0-10-4-10-10Z"
    />,
    <g key="cloud">
      <path d="M7 18H6a4 4 0 0 1-1-8 7 7 0 0 1 14-1 4.5 4.5 0 0 1-1 9h-1M12 21V11m-4 4 4-4 4 4" />
    </g>,
  ];
  return (
    <svg
      aria-hidden="true"
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[index]}
    </svg>
  );
}

export default function Skills() {
  return (
    <section
      id="capabilities"
      className="skills shell"
      aria-labelledby="skills-title"
    >
      <div className="skills-intro">
        <p className="eyebrow">Capabilities</p>
        <h2 id="skills-title">
          The tools
          <br />
          behind the <i>things.</i>
        </h2>
        <p>A considered toolkit for building across the stack.</p>
        <span className="skills-footnote">
          From interface to infrastructure.
        </span>
      </div>
      <div className="skill-list">
        {skillGroups.map((group, index) => (
          <Reveal key={group.id}>
            <div className="skill-row">
              <div className="skill-title">
                <SkillSymbol index={index} />
                <h3>{group.title}</h3>
              </div>
              <ul>
                {group.skills.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
