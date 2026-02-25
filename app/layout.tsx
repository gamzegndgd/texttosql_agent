import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'QueryMind — SQL\'i Unutun',
  description: 'Veritabanınıza Türkçe sorun, SQL alın. Kurumsal Text-to-SQL platformu.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Mono:wght@400;500&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  )
}
