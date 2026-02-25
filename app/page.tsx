'use client'

import { useEffect, useRef, useState } from 'react'
import WaitlistForm from '@/components/WaitlistForm'

// ── Typing animation demos ─────────────────────────────────────────────────
const DEMOS = [
  { input: "Son 30 günde en çok satan 5 ürün?",     output: "→ SELECT name, SUM(qty) AS toplam FROM order_items ... LIMIT 5" },
  { input: "Stok miktarı 10'dan az olan ürünler?",  output: "→ SELECT * FROM products WHERE stock < 10 ORDER BY stock" },
  { input: "Bu ay kayıt olan yeni müşteri sayısı?",  output: "→ SELECT COUNT(*) FROM customers WHERE created_at >= ..." },
]

function TypingDemo() {
  const [text, setText] = useState('')
  const [output, setOutput] = useState('')
  const [showOutput, setShowOutput] = useState(false)
  const demoIdx = useRef(0)
  const charIdx = useRef(0)
  const phase = useRef<'typing'|'pause'|'deleting'>('typing')

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>

    function tick() {
      const demo = DEMOS[demoIdx.current]
      if (phase.current === 'typing') {
        charIdx.current++
        setText(demo.input.slice(0, charIdx.current))
        if (charIdx.current >= demo.input.length) {
          phase.current = 'pause'
          setShowOutput(true)
          setOutput(demo.output)
          timer = setTimeout(tick, 2200)
          return
        }
        timer = setTimeout(tick, 55)
      } else if (phase.current === 'pause') {
        phase.current = 'deleting'
        timer = setTimeout(tick, 300)
      } else {
        charIdx.current--
        setText(demo.input.slice(0, charIdx.current))
        if (charIdx.current <= 0) {
          setShowOutput(false)
          demoIdx.current = (demoIdx.current + 1) % DEMOS.length
          phase.current = 'typing'
          timer = setTimeout(tick, 500)
          return
        }
        timer = setTimeout(tick, 28)
      }
    }

    timer = setTimeout(tick, 1600)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div style={s.terminal}>
      <div style={s.termBar}>
        <span style={{ ...s.termDot, background: '#E05555' }} />
        <span style={{ ...s.termDot, background: '#E0A535' }} />
        <span style={{ ...s.termDot, background: '#2ECC8A' }} />
        <span style={s.termTitle}>querymind — demo</span>
      </div>
      <div style={s.termBody}>
        <div style={s.termLine}>
          <span style={s.termPrompt}>›</span>
          <span style={s.termInput}>{text}</span>
          <span style={s.cursor} />
        </div>
        {showOutput && (
          <div style={{ ...s.termLine, paddingLeft: 24 }}>
            <span style={s.termOutput}>{output}</span>
          </div>
        )}
      </div>
    </div>
  )
}

// ── Code tabs ──────────────────────────────────────────────────────────────
const TABS = [
  {
    id: 't1', label: 'Türkçe Giriş',
    lines: [
      ['cm', '// Kullanıcı sorusu'],
      ['', ''],
      ['mixed', [['kw','const'], ['', ' soru = '], ['str','"Son 30 günde en çok']]],
      ['str', '  sipariş veren 10 müşteri"'],
      ['', ''],
      ['mixed', [['kw','const'], ['', ' sonuc = '], ['kw','await'], ['', ' '], ['fn','querymind'], ['',  '({']]],
      ['', '  query: soru,'],
      ['str-line', '  db: "production"'],
      ['str-line', '  dialect: "postgresql"'],
      ['', '});'],
    ]
  },
  {
    id: 't2', label: 'Üretilen SQL',
    lines: [
      ['cm', '-- Otomatik üretilen SQL'],
      ['', ''],
      ['hl-kw', 'SELECT'],
      ['hl', '  c.name AS musteri,'],
      ['hl-fn', '  COUNT(o.id) AS siparis_sayisi,'],
      ['hl-fn', '  SUM(o.total) AS toplam_tutar'],
      ['kw-line', 'FROM orders o'],
      ['kw-line', 'JOIN customers c ON c.id = o.customer_id'],
      ['kw-line', "WHERE o.created_at >= NOW() - '30 days'"],
      ['kw-line', 'GROUP BY c.name'],
      ['kw-line', 'ORDER BY toplam_tutar DESC'],
      ['kw-line', 'LIMIT 10;'],
    ]
  },
  {
    id: 't3', label: 'API Yanıtı',
    lines: [
      ['cm', '// Response'],
      ['', '{'],
      ['str-line', '  "sql": "SELECT c.name ...",'],
      ['fn-line', '  "confidence": 0.98,'],
      ['str-line', '  "dialect": "postgresql",'],
      ['', '  "tables_used": ['],
      ['str-line', '    "orders", "customers"'],
      ['', '  ],'],
      ['fn-line', '  "latency_ms": 1240'],
      ['', '}'],
    ]
  }
]

function CodePreview() {
  const [active, setActive] = useState('t1')
  const tab = TABS.find(t => t.id === active)!

  return (
    <div style={s.codePreview}>
      <div style={s.codeTabs}>
        {TABS.map(t => (
          <button key={t.id} onClick={() => setActive(t.id)}
            style={{ ...s.codeTab, ...(active === t.id ? s.codeTabActive : {}) }}>
            {t.label}
          </button>
        ))}
      </div>
      <div style={s.codeBody}>
        {tab.lines.map((line, i) => {
          const [type, content] = line
          const base: React.CSSProperties = { fontFamily: "'DM Mono', monospace", fontSize: 12, lineHeight: 2, display: 'block', whiteSpace: 'pre' }
          if (type === 'cm')      return <span key={i} style={{ ...base, color: '#445566' }}>{content as string}</span>
          if (type === 'hl')      return <span key={i} style={{ ...base, color: '#E8EDF2', background: 'rgba(201,168,76,0.08)', borderLeft: '2px solid #C9A84C', paddingLeft: 8, marginLeft: -8, display: 'block' }}>{content as string}</span>
          if (type === 'hl-kw')   return <span key={i} style={{ ...base, color: '#7CACF8', background: 'rgba(201,168,76,0.08)', borderLeft: '2px solid #C9A84C', paddingLeft: 8, marginLeft: -8, display: 'block' }}>{content as string}</span>
          if (type === 'hl-fn')   return <span key={i} style={{ ...base, color: '#E8C97A', background: 'rgba(201,168,76,0.08)', borderLeft: '2px solid #C9A84C', paddingLeft: 8, marginLeft: -8, display: 'block' }}>{content as string}</span>
          if (type === 'kw-line') return <span key={i} style={{ ...base, color: '#7CACF8' }}>{content as string}</span>
          if (type === 'str-line') return <span key={i} style={{ ...base, color: '#A8D5A2' }}>{content as string}</span>
          if (type === 'fn-line') return <span key={i} style={{ ...base, color: '#E8C97A' }}>{content as string}</span>
          return <span key={i} style={{ ...base, color: '#E8EDF2' }}>{content as string}</span>
        })}
      </div>
    </div>
  )
}

// ── FEATURES ──────────────────────────────────────────────────────────────
const FEATURES = [
  { icon: '🧠', title: 'Semantik Anlama', desc: 'Şemanızı öğrenir, domain terminolojinizi anlar. "Ciro" dediğinizde doğru kolonu bulur.' },
  { icon: '🔌', title: '12+ Veritabanı', desc: 'PostgreSQL, MySQL, BigQuery, Snowflake, Redshift, MSSQL ve daha fazlası. Tek API.' },
  { icon: '🛡️', title: 'Kurumsal Güvenlik', desc: 'Read-only erişim. Sorgu limitleri. Audit log. SSO desteği. GDPR & SOC 2 uyumlu.' },
  { icon: '⚡', title: 'Sorgu Optimizasyonu', desc: 'Üretilen SQL otomatik optimize edilir. Index önerileri, N+1 tespiti dahildir.' },
  { icon: '🔁', title: 'Feedback Loop', desc: 'Yanlış çevirileri düzeltin, sistem öğrenir. Zamanla şirketinize özel model oluşur.' },
  { icon: '📊', title: 'BI Entegrasyonu', desc: 'Tableau, Metabase, Grafana ve Looker\'a direkt SQL aktar. Sıfır ek entegrasyon.' },
]

// ── PAGE ──────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <>
      {/* NAV */}
      <nav style={s.nav}>
        <div style={s.navLogo}>
          <span style={s.navDot} />
          QueryMind
        </div>
        <div style={s.navLinks}>
          <a href="#how" style={s.navLink}>Nasıl Çalışır</a>
          <a href="#features" style={s.navLink}>Özellikler</a>
          <a href="#waitlist" style={s.navCta}>Erken Erişim →</a>
        </div>
      </nav>

      {/* HERO */}
      <section style={s.hero}>
        <div style={s.eyebrow}>
          <span style={s.eyebrowLine} />
          Text-to-SQL · Enterprise Grade · Türkçe Destekli
          <span style={s.eyebrowLine} />
        </div>

        <h1 style={s.h1}>
          Veritabanınıza<br />
          <em style={s.h1Em}>Türkçe sorun,</em><br />
          SQL alın.
        </h1>

        <p style={s.heroSub}>
          Veri ekibinizi beklemeden kendi sorularınızı yanıtlayın.
          QueryMind, doğal dil sorularınızı optimize edilmiş SQL sorgularına anında çevirir.
        </p>

        <TypingDemo />

        <div style={s.statsBar}>
          {[['3x','Daha Hızlı Analiz'],['%98','SQL Doğruluğu'],['12+','DB Desteği'],['<2sn','Yanıt Süresi']].map(([n,l],i) => (
            <>
              {i > 0 && <div key={`d${i}`} style={s.statDiv} />}
              <div key={n} style={s.stat}>
                <span style={s.statNum}>{n}</span>
                <span style={s.statLabel}>{l}</span>
              </div>
            </>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" style={s.section}>
        <div style={s.sectionInner}>
          <div style={s.sectionLabel}>Nasıl Çalışır</div>
          <h2 style={s.sectionTitle}>Dört adımda<br />veri analizine başlayın.</h2>

          <div style={s.howGrid}>
            <div>
              {[
                ['01','Veritabanınızı bağlayın','PostgreSQL, MySQL, BigQuery veya Snowflake\'inizi tek bir API anahtarıyla entegre edin.'],
                ['02','Türkçe sorunuzu yazın','"Geçen ay en çok sipariş veren 10 müşteri kimler?" gibi doğal dil sorular yazın.'],
                ['03','SQL otomatik üretilir','Semantik anlama motoru sorunuzu analiz eder, şemanıza göre optimize edilmiş SQL oluşturur.'],
                ['04','Sonucu inceleyin veya çalıştırın','SQL\'i onaylayın, direkt çalıştırın veya BI aracınıza export edin.'],
              ].map(([num, title, desc]) => (
                <div key={num} style={s.step}>
                  <div style={s.stepNum}>{num}</div>
                  <div>
                    <div style={s.stepTitle}>{title}</div>
                    <div style={s.stepDesc}>{desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <CodePreview />
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" style={s.featSection}>
        <div style={s.sectionInner}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 56, flexWrap: 'wrap' as const, gap: 24 }}>
            <div>
              <div style={s.sectionLabel}>Özellikler</div>
              <h2 style={s.sectionTitle}>Her şey hazır,<br />entegrasyona başlayın.</h2>
            </div>
            <p style={{ ...s.sectionSub, maxWidth: 400 }}>Kurumsal güvenlik standartlarını karşılar. SOC 2 uyumlu. Veriniz asla model eğitiminde kullanılmaz.</p>
          </div>

          <div style={s.featGrid}>
            {FEATURES.map(f => (
              <div key={f.title} style={s.featCard}>
                <div style={s.featIcon}>{f.icon}</div>
                <div style={s.featTitle}>{f.title}</div>
                <div style={s.featDesc}>{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WAITLIST */}
      <section id="waitlist" style={s.section}>
        <div style={s.waitlistInner}>
          <div>
            <div style={s.sectionLabel}>Erken Erişim</div>
            <h2 style={s.sectionTitle}>Veri ekibinizin<br />verimliliğini<br /><em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>3 katına çıkarın.</em></h2>
            <p style={{ ...s.sectionSub, marginTop: 20 }}>
              Sınırlı sayıda erken erişim kontenjanı mevcut.
              İlk 200 şirkete özel fiyatlandırma ve öncelikli onboarding.
            </p>
            <div style={{ marginTop: 36, display: 'flex', flexDirection: 'column' as const, gap: 14 }}>
              {['Kredi kartı gerekmez, hemen aktif olur','30 gün ücretsiz kurumsal trial','Dedicated onboarding desteği','SLA garantili (%99.9 uptime)','Verileriniz model eğitiminde kullanılmaz'].map(t => (
                <div key={t} style={s.trustItem}>
                  <span style={s.trustCheck}>✓</span>
                  <span style={{ fontSize: 14, color: 'var(--text-mid)' }}>{t}</span>
                </div>
              ))}
            </div>
          </div>

          <WaitlistForm />
        </div>
      </section>

      {/* FOOTER */}
      <footer style={s.footer}>
        <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 16, color: 'var(--text-dim)' }}>QueryMind</div>
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: 'var(--text-dim)' }}>© 2025 QueryMind. Tüm hakları saklıdır.</div>
      </footer>
    </>
  )
}

// ── Styles ─────────────────────────────────────────────────────────────────
const s: Record<string, React.CSSProperties> = {
  nav: { position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 64px', height: 64, background: 'rgba(8,11,15,0.88)', backdropFilter: 'blur(16px)', borderBottom: '1px solid var(--border)' },
  navLogo: { fontFamily: "'DM Serif Display', serif", fontSize: 20, color: 'var(--text)', display: 'flex', alignItems: 'center', gap: 10 },
  navDot: { display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: 'var(--gold)', boxShadow: '0 0 10px var(--gold)' },
  navLinks: { display: 'flex', alignItems: 'center', gap: 36 },
  navLink: { fontSize: 13, color: 'var(--text-mid)', textDecoration: 'none', letterSpacing: 0.5 },
  navCta: { fontFamily: "'DM Mono', monospace", fontSize: 12, fontWeight: 500, padding: '8px 20px', borderRadius: 4, background: 'var(--gold)', color: '#080B0F', textDecoration: 'none', letterSpacing: 0.5 },

  hero: { position: 'relative', zIndex: 1, minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '100px 64px 80px', textAlign: 'center' },
  eyebrow: { fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: 'var(--gold)', display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 },
  eyebrowLine: { display: 'block', width: 40, height: 1, background: 'var(--gold)', opacity: 0.4 },
  h1: { fontFamily: "'DM Serif Display', serif", fontSize: 'clamp(52px,7vw,88px)', lineHeight: 1.0, letterSpacing: -2, marginBottom: 24 },
  h1Em: { fontStyle: 'italic', color: 'var(--gold)' },
  heroSub: { fontSize: 17, fontWeight: 300, lineHeight: 1.7, color: 'var(--text-mid)', maxWidth: 540, margin: '0 auto 40px' },

  terminal: { width: '100%', maxWidth: 680, marginBottom: 48, background: 'var(--surface)', border: '1px solid var(--border2)', borderRadius: 8, overflow: 'hidden', boxShadow: '0 32px 80px rgba(0,0,0,0.6)' },
  termBar: { display: 'flex', alignItems: 'center', gap: 8, padding: '12px 16px', background: 'var(--surface2)', borderBottom: '1px solid var(--border)' },
  termDot: { width: 10, height: 10, borderRadius: '50%', display: 'inline-block' },
  termTitle: { fontFamily: "'DM Mono', monospace", fontSize: 11, color: 'var(--text-dim)', marginLeft: 8, letterSpacing: 1 },
  termBody: { padding: 24, textAlign: 'left' },
  termLine: { fontFamily: "'DM Mono', monospace", fontSize: 13, lineHeight: 2, display: 'flex', gap: 12 },
  termPrompt: { color: 'var(--gold)' },
  termInput: { color: 'var(--text)' },
  termOutput: { color: 'var(--green)' },
  cursor: { display: 'inline-block', width: 8, height: 14, background: 'var(--gold)', verticalAlign: 'middle', animation: 'blink 1s step-end infinite' },

  statsBar: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 48, padding: '24px 0', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', width: '100%', maxWidth: 680 },
  stat: { textAlign: 'center' },
  statNum: { fontFamily: "'DM Serif Display', serif", fontSize: 32, color: 'var(--text)', display: 'block' },
  statLabel: { fontSize: 12, color: 'var(--text-dim)', letterSpacing: 1, textTransform: 'uppercase' },
  statDiv: { width: 1, height: 40, background: 'var(--border)' },

  section: { position: 'relative', zIndex: 1, padding: '120px 64px' },
  sectionInner: { maxWidth: 1200, margin: '0 auto' },
  sectionLabel: { fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 16 },
  sectionTitle: { fontFamily: "'DM Serif Display', serif", fontSize: 'clamp(32px,4vw,52px)', lineHeight: 1.1, letterSpacing: -1, marginBottom: 16 },
  sectionSub: { fontSize: 16, fontWeight: 300, color: 'var(--text-mid)', lineHeight: 1.7 },

  howGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center', marginTop: 72 },
  step: { display: 'flex', gap: 24, padding: '28px 0', borderBottom: '1px solid var(--border)' },
  stepNum: { fontFamily: "'DM Mono', monospace", fontSize: 12, color: 'var(--text-dim)', border: '1px solid var(--border)', width: 36, height: 36, borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, letterSpacing: 1 },
  stepTitle: { fontSize: 16, fontWeight: 500, marginBottom: 6 },
  stepDesc: { fontSize: 14, color: 'var(--text-mid)', lineHeight: 1.6 },

  codePreview: { background: 'var(--surface)', border: '1px solid var(--border2)', borderRadius: 8, overflow: 'hidden', boxShadow: '0 24px 60px rgba(0,0,0,0.5)' },
  codeTabs: { display: 'flex', borderBottom: '1px solid var(--border)', background: 'var(--surface2)' },
  codeTab: { fontFamily: "'DM Mono', monospace", fontSize: 11, padding: '10px 20px', color: 'var(--text-dim)', cursor: 'pointer', border: 'none', borderBottom: '2px solid transparent', background: 'none', letterSpacing: 0.5 },
  codeTabActive: { color: 'var(--gold)', borderBottom: '2px solid var(--gold)' },
  codeBody: { padding: 24, display: 'flex', flexDirection: 'column' },

  featSection: { position: 'relative', zIndex: 1, padding: '120px 64px', background: 'var(--surface)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' },
  featGrid: { display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 1, background: 'var(--border)', border: '1px solid var(--border)', borderRadius: 8, overflow: 'hidden' },
  featCard: { background: 'var(--surface)', padding: '36px 32px' },
  featIcon: { width: 44, height: 44, marginBottom: 20, background: 'var(--gold-dim)', border: '1px solid rgba(201,168,76,0.2)', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 },
  featTitle: { fontSize: 16, fontWeight: 500, marginBottom: 10 },
  featDesc: { fontSize: 14, color: 'var(--text-mid)', lineHeight: 1.7 },

  waitlistInner: { maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 100, alignItems: 'start' },
  trustItem: { display: 'flex', alignItems: 'center', gap: 12 },
  trustCheck: { width: 20, height: 20, borderRadius: '50%', background: 'var(--gold-dim)', border: '1px solid rgba(201,168,76,0.3)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: 'var(--gold)', flexShrink: 0 },

  footer: { position: 'relative', zIndex: 1, borderTop: '1px solid var(--border)', padding: '32px 64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
}
