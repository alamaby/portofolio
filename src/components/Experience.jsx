export default function Experience({ c }) {
  return (
    <section id="experience">
      <div className="reveal">
        <div className="section-label">{c.expLabel}</div>
        <h2 className="section-title">{c.expTitle}</h2>
        <div className="section-sub">{c.expSub}</div>
      </div>
      <div className="section-divider"/>
      <div className="timeline">
        {c.experience.map((e, i) => (
          <div className="tl-item reveal" key={i} style={{transitionDelay:`${i*0.1}s`}}>
            <div className="tl-dot"/>
            <div className="tl-date">{e.date}</div>
            <div className="tl-title">{e.title}</div>
            <div className="tl-company">{e.company}</div>
            <div className="tl-desc">{e.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
