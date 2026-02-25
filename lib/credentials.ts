import bcrypt from 'bcryptjs'

// ── Kullanıcı adı üret ──────────────────────────────────────
// "Ahmet Yılmaz" → "ahmet.yilmaz" + rastgele 3 rakam
export function generateUsername(firstName: string, lastName: string): string {
  const normalize = (s: string) =>
    s
      .toLowerCase()
      .replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's')
      .replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c')
      .replace(/[^a-z0-9]/g, '')

  const suffix = Math.floor(100 + Math.random() * 900) // 100-999
  return `${normalize(firstName)}.${normalize(lastName)}${suffix}`
}

// ── Güçlü şifre üret ───────────────────────────────────────
// 12 karakter: büyük/küçük harf + rakam + özel karakter
export function generatePassword(): string {
  const upper   = 'ABCDEFGHJKLMNPQRSTUVWXYZ'
  const lower   = 'abcdefghjkmnpqrstuvwxyz'
  const digits  = '23456789'
  const special = '!@#$%&*'

  const pick = (str: string) => str[Math.floor(Math.random() * str.length)]

  // En az 2'şer tane garantile
  const chars = [
    pick(upper), pick(upper),
    pick(lower), pick(lower),
    pick(digits), pick(digits),
    pick(special),
  ]

  // Kalan 5 karakteri karışık havuzdan doldur
  const all = upper + lower + digits + special
  for (let i = 0; i < 5; i++) chars.push(pick(all))

  // Karıştır
  return chars.sort(() => Math.random() - 0.5).join('')
}

// ── Şifreyi hashle (bcrypt, 10 round) ─────────────────────
export async function hashPassword(plain: string): Promise<string> {
  return bcrypt.hash(plain, 10)
}
