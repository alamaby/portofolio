import { useState, useRef } from 'react';

// Web3Forms integration — pastikan email receiver kamu aktif di https://web3forms.com/
const WEB3FORMS_KEY = 'd58bd63a-2aa8-4c19-837b-0f802903c142';

// 1st party antibot config
const MIN_SUBMIT_MS = 4000;          // time trap: minimum 4s on page
const RATE_LIMIT_MS = 60000;         // rate limit: 1 message per 60s
const RATE_LIMIT_KEY = '__portfolio_contact_last_submit';

function checkRateLimit() {
  const last = Number(localStorage.getItem(RATE_LIMIT_KEY) || '0');
  if (Date.now() - last < RATE_LIMIT_MS) {
    return `Please wait ${Math.ceil((RATE_LIMIT_MS - (Date.now() - last)) / 1000)}s before sending again.`;
  }
  return '';
}

function recordRateLimit() {
  localStorage.setItem(RATE_LIMIT_KEY, String(Date.now()));
}

// Sanitize user input: trim, limit length, strip HTML
const HTML_ESCAPE_MAP = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
function escapeHtml(str) {
  return str.replace(/[&<>"']/g, ch => HTML_ESCAPE_MAP[ch]);
}
function sanitizeInput(raw, maxLen) {
  let s = String(raw ?? '').trim();
  if (s.length > maxLen) s = s.slice(0, maxLen);
  return escapeHtml(s);
}
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Contact({ c }) {
  const [form, setForm] = useState({name:'',email:'',msg:''});
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const formStartRef = useRef(Date.now());

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.msg) return;

    // Sanitize inputs
    const cleanName  = sanitizeInput(form.name, 100);
    const cleanEmail = sanitizeInput(form.email, 200);
    const cleanMsg   = sanitizeInput(form.msg, 5000);
    if (!cleanName || !cleanEmail || !cleanMsg) return;
    if (!EMAIL_REGEX.test(cleanEmail)) {
      setError('Please enter a valid email address.');
      return;
    }

    // 1st party antibot checks
    if (honeypot.trim() !== '') {
      setError('Something went wrong. Please refresh the page and try again.');
      return;
    }
    if (Date.now() - formStartRef.current < MIN_SUBMIT_MS) {
      setError('Too fast! Please take a moment to write your message.');
      return;
    }
    const rateErr = checkRateLimit();
    if (rateErr) {
      setError(rateErr);
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          name: cleanName,
          email: cleanEmail,
          message: cleanMsg,
          subject: `Portfolio Contact from ${cleanName}`,
          reply_to: cleanEmail,
        }),
      });
      const data = await res.json();
      if (data.success) {
        recordRateLimit();
        setSent(true);
        setForm({ name: '', email: '', msg: '' });
        setHoneypot('');
        formStartRef.current = Date.now();
      } else {
        setError(data.message || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setError('Failed to send message. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact">
      <div className="reveal">
        <div className="section-label">{c.contactLabel}</div>
        <h2 className="section-title">{c.contactTitle}</h2>
        <div className="section-sub">{c.contactSub}</div>
      </div>
      <div className="section-divider"/>
      <div className="contact-grid">
        <div className="contact-info reveal">
          {c.links.map((l,i) => (
            <a key={i} href={l.href} className="contact-link" target="_blank" rel="noopener noreferrer">
              <div className="contact-link-icon">{l.icon}</div>
              <div>
                <div style={{color:'var(--text)', fontWeight:600}}>{l.label}</div>
                <div style={{color:'var(--text3)', fontSize:'0.65rem', marginTop:2}}>{l.sub}</div>
              </div>
              <div style={{marginLeft:'auto', color:'var(--text3)'}}>↗</div>
            </a>
          ))}
        </div>

        <div className="contact-form reveal" style={{transitionDelay:'0.15s'}}>
          {sent ? (
            <div className="success-msg">{c.form.success}</div>
          ) : (
            <form onSubmit={handleSubmit} autoComplete="off">
              {/* 1st party antibot: honeypot field — hidden from humans, visible to bots */}
              <div aria-hidden="true" style={{position:'absolute',left:'-9999px',opacity:0,height:0,overflow:'hidden'}}>
                <input type="text" name="website" tabIndex={-1} autoComplete="off"
                  value={honeypot} onChange={e => setHoneypot(e.target.value)}/>
              </div>

              {error && (
                <div className="success-msg" style={{color:'#ff6b6b', borderColor:'rgba(255,107,107,0.25)', background:'rgba(255,107,107,0.08)', marginBottom:'1rem'}}>
                  ✗ {error}
                </div>
              )}
              <div className="form-group">
                <label className="form-label">{c.form.name}</label>
                <input className="form-input" name="name" placeholder={c.form.namePh} value={form.name}
                  onChange={e => setForm(f => ({...f, name:e.target.value}))} required disabled={loading}/>
              </div>
              <div className="form-group">
                <label className="form-label">{c.form.email}</label>
                <input className="form-input" name="email" type="email" placeholder={c.form.emailPh} value={form.email}
                  onChange={e => setForm(f => ({...f, email:e.target.value}))} required disabled={loading}/>
              </div>
              <div className="form-group">
                <label className="form-label">{c.form.message}</label>
                <textarea className="form-textarea" name="message" placeholder={c.form.msgPh} value={form.msg}
                  onChange={e => setForm(f => ({...f, msg:e.target.value}))} required disabled={loading}/>
              </div>
              <button type="submit" className="btn-primary" style={{width:'100%', justifyContent:'center', opacity: loading ? 0.7 : 1}} disabled={loading}>
                {loading ? 'Sending...' : c.form.send}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
