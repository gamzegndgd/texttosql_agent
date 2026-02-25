import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  try {
    // ── 1. Form verilerini al ──────────────────────────────────
    const body = await req.json()
    const { firstName, lastName, email, company, role, database } = body

    // Basit validasyon
    if (!firstName || !lastName || !email) {
      return NextResponse.json(
        { error: 'Ad, soyad ve e-posta zorunludur.' },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Geçerli bir e-posta adresi giriniz.' },
        { status: 400 }
      )
    }

    // ── 2. Daha önce kayıt olmuş mu? ──────────────────────────
    const { data: existing } = await supabaseAdmin
      .from('waitlist_users')
      .select('id')
      .eq('email', email)
      .single()

    if (existing) {
      return NextResponse.json(
        { error: 'Bu e-posta adresi zaten kayıtlı.' },
        { status: 409 }
      )
    }

    // ── 3. Supabase'e kaydet ──────────────────────────────────
    const { error: dbError } = await supabaseAdmin
      .from('waitlist_users')
      .insert({
        first_name: firstName,
        last_name:  lastName,
        email,
        company:    company  || null,
        role:       role     || null,
        database:   database || null,
      })

    if (dbError) {
      console.error('Supabase insert error:', dbError)
      return NextResponse.json(
        { error: 'Kayıt sırasında bir hata oluştu.' },
        { status: 500 }
      )
    }

    // ── 4. Başarılı — mail gönderilmiyor ─────────────────────
    return NextResponse.json({ success: true })

  } catch (err) {
    console.error('Register API error:', err)
    return NextResponse.json(
      { error: 'Beklenmeyen bir hata oluştu.' },
      { status: 500 }
    )
  }
}
