import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header, Footer } from '@/components'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Sanse Capital | Fondo de Inversión',
  description:
    'Sanse Capital — Fondo privado de inversión y préstamos entre particulares. Soluciones financieras modernas para impulsar tu crecimiento.',
  keywords: ['inversión', 'fondo', 'finanzas', 'capital', 'préstamos', 'Colombia'],
  authors: [{ name: 'Sanse Capital' }],
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.png', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: 'Sanse Capital | Fondo de Inversión',
    description: 'Soluciones financieras modernas para impulsar tu crecimiento.',
    url: 'https://sansecapital.co',
    siteName: 'Sanse Capital',
    locale: 'es_CO',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sanse Capital | Fondo de Inversión',
    description: 'Soluciones financieras modernas para impulsar tu crecimiento.',
    creator: '@sansecapital',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`${inter.variable} font-sans antialiased`}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
