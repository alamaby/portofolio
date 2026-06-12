import { useState } from 'react';

export default function TweaksPanel() {
  const [accent, setAccent] = useState('#6366f1');
  const [font, setFont] = useState('Plus Jakarta Sans');

  const applyAccent = (val) => {
    setAccent(val);
    document.documentElement.style.setProperty('--accent', val);
    document.documentElement.style.setProperty('--accent2', val);
    window.parent.postMessage({type:'__edit_mode_set_keys', edits:{accentColor: val}}, '*');
  };

  const applyFont = (val) => {
    setFont(val);
    document.documentElement.style.setProperty('--sans', `'${val}', sans-serif`);
    window.parent.postMessage({type:'__edit_mode_set_keys', edits:{bodyFont: val}}, '*');
  };

  return (
    <div id="tweaks-panel">
      <h4>⚙ Tweaks</h4>
      <div className="tweak-row">
        <label>Accent Color</label>
        <input type="color" value={accent} onChange={e => applyAccent(e.target.value)}/>
      </div>
      <div className="tweak-row">
        <label>Body Font</label>
        <select value={font} onChange={e => applyFont(e.target.value)}>
          <option>Plus Jakarta Sans</option>
          <option>Inter</option>
          <option>DM Sans</option>
          <option>Outfit</option>
        </select>
      </div>
    </div>
  );
}
