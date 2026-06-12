import { useState } from 'react';

export default function Nav({ lang, setLang, c, mobileOpen, setMobileOpen }) {
  return (
    <>
      <nav>
        <div className="nav-logo">
          <span>~</span>/alam-aby-bashit<span>_</span>
        </div>
        <ul className="nav-links">
          {c.nav.map((item, i) => (
            <li key={i}>
              <a href={`#${['about','skills','experience','projects','contact'][i]}`}>
                <span style={{color:'var(--accent3)', marginRight:4}}>{String(i).padStart(2,'0')}.</span>{item}
              </a>
            </li>
          ))}
          <li>
            <button className="lang-toggle" onClick={() => setLang(lang === 'en' ? 'id' : 'en')}>
              {lang === 'en' ? '🇮🇩 ID' : '🇺🇸 EN'}
            </button>
          </li>
        </ul>
        <button className="nav-mobile-btn" onClick={() => setMobileOpen(o => !o)}>
          {mobileOpen ? '✕' : '☰'}
        </button>
      </nav>
      <div className={`mobile-nav ${mobileOpen ? 'open' : ''}`}>
        {c.nav.map((item, i) => (
          <a key={i} href={`#${['about','skills','experience','projects','contact'][i]}`}
             onClick={() => setMobileOpen(false)}>
            <span style={{color:'var(--accent3)', marginRight:8}}>{String(i+1).padStart(2,'0')}.</span>{item}
          </a>
        ))}
        <a href="#" onClick={(e) => { e.preventDefault(); setLang(l => l === 'en' ? 'id' : 'en'); setMobileOpen(false); }}
           style={{color:'var(--accent2)'}}>
          {lang === 'en' ? '🇮🇩 Bahasa Indonesia' : '🇺🇸 English'}
        </a>
      </div>
    </>
  );
}
