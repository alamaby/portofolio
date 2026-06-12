import { useState, useEffect } from 'react'
import CONTENT from './data/content'
import useReveal from './hooks/useReveal'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import TweaksPanel from './components/TweaksPanel'

function App() {
  const [lang, setLang] = useState(() => localStorage.getItem('portfolio_lang') || 'en')
  const [mobileOpen, setMobileOpen] = useState(false)
  const c = CONTENT[lang]

  useEffect(() => {
    localStorage.setItem('portfolio_lang', lang)
  }, [lang])

  useReveal()

  // Tweaks toggle
  useEffect(() => {
    const handler = e => {
      const panel = document.getElementById('tweaks-panel')
      if (!panel) return
      if (e.data?.type === '__activate_edit_mode') panel.classList.add('open')
      if (e.data?.type === '__deactivate_edit_mode') panel.classList.remove('open')
    }
    window.addEventListener('message', handler)
    window.parent.postMessage({type: '__edit_mode_available'}, '*')
    return () => window.removeEventListener('message', handler)
  }, [])

  return (
    <>
      <Nav lang={lang} setLang={setLang} c={c} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <Hero c={c} />
      <Skills c={c} />
      <Experience c={c} />
      <Projects c={c} />
      <Contact c={c} />
      <Footer c={c} />
      <TweaksPanel />
    </>
  )
}

export default App
