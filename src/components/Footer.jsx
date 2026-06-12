export default function Footer({ c }) {
  return (
    <footer>
      <div>{c.footer} <span>Alam Aby Bashit</span></div>
      <div style={{marginTop:'0.4rem'}}>{c.footerSub}</div>
    </footer>
  );
}
