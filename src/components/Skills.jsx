export default function Skills({ c }) {
  return (
    <section id="skills">
      <div className="reveal">
        <div className="section-label">{c.skillsLabel}</div>
        <h2 className="section-title">{c.skillsTitle}</h2>
        <div className="section-sub">{c.skillsSub}</div>
      </div>
      <div className="section-divider"/>
      <div className="skills-grid">
        {c.skills.map((s, i) => (
          <div className="skill-card reveal" key={i} style={{animationDelay:`${i*0.08}s`}}>
            <div className="skill-category">{s.cat}</div>
            <div className="skill-name">{s.name}</div>
            <div className="skill-tags">
              {s.tags.map((t,j) => <span className="skill-tag" key={j}>{t}</span>)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
