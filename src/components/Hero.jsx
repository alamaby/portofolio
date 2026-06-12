import useTyped from '../hooks/useTyped';

export default function Hero({ c }) {
  const typed = useTyped([
    c.hero.role,
    'CTO & Strategic Technical Partner',
    'Enterprise Architect · AI Innovator',
  ]);

  return (
    <section id="about" style={{paddingTop:0}}>
      <div className="hero-wrap">
        <div className="hero-inner">
          <div>
            <div className="hero-terminal">
              <div className="terminal-bar">
                <div className="t-dot red"/><div className="t-dot yellow"/><div className="t-dot green"/>
                <span>portfolio.sh</span>
              </div>
              <div className="terminal-line"><span className="prompt">➜ </span><span className="cmd">whoami</span></div>
              <div className="terminal-line"><span className="out">alam-aby-bashit</span></div>
              <div className="terminal-line"><span className="prompt">➜ </span><span className="cmd">cat </span><span className="str">role.txt</span></div>
              <div className="terminal-line"><span className="out">{c.hero.role.split(' ').slice(0,3).join(' ')}<span className="cursor"/></span></div>
            </div>

            <div style={{marginBottom:'0.3rem', fontFamily:'var(--mono)', fontSize:'0.8rem', color:'var(--text3)'}}>
              {c.hero.greeting}
            </div>
            <h1 className="hero-name">{c.hero.name}</h1>
            <div className="hero-role">[ {typed || c.hero.role} ]</div>
            <p className="hero-desc">{c.hero.desc}</p>

            <div className="hero-stats">
              {c.hero.stats.map((s,i) => (
                <div className="stat" key={i}>
                  <span className="stat-num">{s.num}</span>
                  <span className="stat-label">{s.label}</span>
                </div>
              ))}
            </div>

            <div className="hero-btns">
              <a href="#" className="btn-primary" onClick={e => e.preventDefault()}>
                ↓ {c.hero.cta1}
              </a>
              <a href="#contact" className="btn-ghost">
                ✉ {c.hero.cta2}
              </a>
            </div>
          </div>

          <div className="hero-photo-wrap">
            <div style={{position:'relative', display:'inline-block'}}>
              <div className="photo-ring"/>
              <div className="photo-hex">
                <img src="/photo-1776867943665.jpeg" alt="Alam Aby Bashit"/>
              </div>
              <div className="photo-scan"/>
              <div className="photo-badge">✓ Available for projects</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
