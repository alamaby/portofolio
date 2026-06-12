export default function Projects({ c }) {
  return (
    <section id="projects">
      <div className="reveal">
        <div className="section-label">{c.projLabel}</div>
        <h2 className="section-title">{c.projTitle}</h2>
        <div className="section-sub">{c.projSub}</div>
      </div>
      <div className="section-divider"/>
      <div className="projects-grid">
        {c.projects.map((p, i) => (
          <div className="project-card reveal" key={i} style={{transitionDelay:`${i*0.1}s`}}>
            <div className="project-header">
              <div className="project-icon">{p.icon}</div>
              <span className={`project-badge ${p.badge === 'live' ? 'badge-live' : 'badge-arch'}`}>
                {p.badge === 'live' ? '● LIVE' : '◈ IN DEV'}
              </span>
            </div>
            <div className="project-title">{p.title}</div>
            <div className="project-desc">{p.desc}</div>
            <div className="project-stack">
              {p.stack.map((t,j) => <span className="stack-tag" key={j}>{t}</span>)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
