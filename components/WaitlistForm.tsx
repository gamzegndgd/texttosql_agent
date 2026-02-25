'use client'

import { useState } from 'react'

const DB_OPTIONS = ['PostgreSQL', 'MySQL', 'BigQuery', 'Snowflake', 'Redshift', 'MSSQL', 'SQLite', 'Diğer']
const ROLE_OPTIONS = ['Data Engineer', 'Data Analyst', 'Backend Developer', 'CTO / Teknik Kurucu', 'Ürün Yöneticisi', 'Diğer']

export default function WaitlistForm() {
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', company: '', role: '', database: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  function set(field: string, value: string) {
    setForm(f => ({ ...f, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()

      if (!res.ok) {
        setErrorMsg(data.error || 'Bir hata oluştu.')
        setStatus('error')
      } else {
        setStatus('success')
      }
    } catch {
      setErrorMsg('Bağlantı hatası. Lütfen tekrar deneyin.')
      setStatus('error')
    }
  }

  // ── Success ────────────────────────────────────────────────
  if (status === 'success') {
    return (
      <div style={s.card}>
        <div style={s.successIcon}>✓</div>
        <h3 style={s.successTitle}>Başvurunuz alındı!</h3>
        <p style={s.successSub}>
          Bilgileriniz kaydedildi. En kısa sürede{' '}
          <strong style={{ color: 'var(--gold)' }}>{form.email}</strong>{' '}
          adresinize ulaşacağız.
        </p>
        <div style={s.badge}>
          <span style={s.badgeDot} />
          Ekibimiz sizinle iletişime geçecek
        </div>
      </div>
    )
  }

  // ── Form ───────────────────────────────────────────────────
  return (
    <div style={s.card}>
      <h3 style={s.formTitle}>Erken Erişim Formu</h3>
      <p style={s.formSub}>Formu doldurun, ekibimiz sizinle iletişime geçsin.</p>

      <form onSubmit={handleSubmit}>

        {/* Ad / Soyad */}
        <div style={s.row}>
          <div style={s.group}>
            <label style={s.label}>Ad</label>
            <input style={s.input} placeholder="Ahmet" required
              value={form.firstName} onChange={e => set('firstName', e.target.value)} />
          </div>
          <div style={s.group}>
            <label style={s.label}>Soyad</label>
            <input style={s.input} placeholder="Yılmaz" required
              value={form.lastName} onChange={e => set('lastName', e.target.value)} />
          </div>
        </div>

        {/* E-posta */}
        <div style={{ ...s.group, marginBottom: 16 }}>
          <label style={s.label}>E-posta</label>
          <input style={s.input} type="email" placeholder="ahmet@sirket.com" required
            value={form.email} onChange={e => set('email', e.target.value)} />
        </div>

        {/* Şirket */}
        <div style={{ ...s.group, marginBottom: 16 }}>
          <label style={s.label}>Şirket</label>
          <input style={s.input} placeholder="Şirket Adı"
            value={form.company} onChange={e => set('company', e.target.value)} />
        </div>

        {/* Rol / Veritabanı */}
        <div style={s.row}>
          <div style={s.group}>
            <label style={s.label}>Rol</label>
            <select style={s.select} value={form.role} onChange={e => set('role', e.target.value)}>
              <option value="">Seçin</option>
              {ROLE_OPTIONS.map(r => <option key={r}>{r}</option>)}
            </select>
          </div>
          <div style={s.group}>
            <label style={s.label}>Veritabanı</label>
            <select style={s.select} value={form.database} onChange={e => set('database', e.target.value)}>
              <option value="">Seçin</option>
              {DB_OPTIONS.map(d => <option key={d}>{d}</option>)}
            </select>
          </div>
        </div>

        {/* Hata */}
        {status === 'error' && (
          <div style={s.errorBox}>{errorMsg}</div>
        )}

        {/* Submit */}
        <button type="submit" disabled={status === 'loading'} style={{
          ...s.submitBtn,
          ...(status === 'loading' ? s.submitBtnDisabled : {})
        }}>
          {status === 'loading' ? 'Gönderiliyor...' : 'Erken Erişim Başvurusu Yap →'}
        </button>
      </form>

      <div style={s.badge}>
        <span style={s.badgeDot} />
        Bilgileriniz güvenle saklanır, üçüncü taraflarla paylaşılmaz
      </div>
    </div>
  )
}

const s: Record<string, React.CSSProperties> = {
  card: { background: 'var(--surface)', border: '1px solid var(--border2)', borderRadius: 8, padding: 40, boxShadow: '0 24px 60px rgba(0,0,0,0.4)' },
  formTitle: { fontFamily: "'DM Serif Display', serif", fontSize: 24, marginBottom: 6, color: 'var(--text)' },
  formSub: { fontSize: 14, color: 'var(--text-mid)', marginBottom: 28, lineHeight: 1.6 },
  row: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 },
  group: { display: 'flex', flexDirection: 'column', gap: 8 },
  label: { fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 1, textTransform: 'uppercase' as const, color: 'var(--text-dim)' },
  input: { background: 'var(--bg)', border: '1px solid var(--border2)', borderRadius: 4, padding: '11px 14px', color: 'var(--text)', fontFamily: "'DM Sans', sans-serif", fontSize: 14, outline: 'none', width: '100%' },
  select: { background: 'var(--bg)', border: '1px solid var(--border2)', borderRadius: 4, padding: '11px 14px', color: 'var(--text)', fontFamily: "'DM Sans', sans-serif", fontSize: 14, outline: 'none', width: '100%', appearance: 'none' as const, cursor: 'pointer' },
  errorBox: { background: 'rgba(224,85,85,0.08)', border: '1px solid rgba(224,85,85,0.25)', borderRadius: 4, padding: '12px 16px', marginBottom: 16, fontSize: 14, color: 'var(--red)' },
  submitBtn: { width: '100%', padding: 14, background: 'var(--gold)', color: '#080B0F', border: 'none', borderRadius: 4, fontFamily: "'DM Mono', monospace", fontSize: 13, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase' as const, cursor: 'pointer', marginTop: 8 },
  submitBtnDisabled: { opacity: 0.6, cursor: 'not-allowed' },
  successIcon: { width: 56, height: 56, borderRadius: '50%', background: 'rgba(46,204,138,0.1)', border: '1px solid rgba(46,204,138,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, margin: '0 auto 20px', lineHeight: '56px', textAlign: 'center' as const },
  successTitle: { fontFamily: "'DM Serif Display', serif", fontSize: 22, marginBottom: 8, textAlign: 'center' as const, color: 'var(--text)' },
  successSub: { fontSize: 14, color: 'var(--text-mid)', lineHeight: 1.7, textAlign: 'center' as const, marginBottom: 20 },
  badge: { display: 'flex', alignItems: 'center', gap: 8, marginTop: 16, fontFamily: "'DM Mono', monospace", fontSize: 12, color: 'var(--text-dim)' },
  badgeDot: { display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: 'var(--green)', flexShrink: 0 },
}
