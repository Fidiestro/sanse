'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const navLinks = [
  { href: '#about', label: 'Sobre' },
  { href: '#services', label: 'Servicios' },
  { href: '#portfolio', label: 'Proyectos' },
  { href: '#contact', label: 'Contacto' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    setMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/75 backdrop-blur-md">
      <div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between px-5">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <Image
            src="/logo_sanse_sin_fondo.png"
            alt="Sanse Capital - logo"
            width={90}
            height={90}
            className="rounded-lg"
          />
          <h1 className="hidden text-lg font-semibold tracking-tight sm:block">Sanse Capital</h1>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:block" aria-label="Navegación principal">
          <ul className="flex items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="text-sm font-semibold opacity-90 transition-opacity hover:opacity-100"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Login Button */}
        <div className="hidden items-center gap-4 md:flex">
          <Link
            href="/login"
            className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
          >
            Iniciar sesión
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="flex h-10 w-10 items-center justify-center rounded-lg text-xl md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-label="Abrir menú"
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <nav className="border-t border-black/5 bg-white p-4 md:hidden">
          <ul className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="block text-sm font-semibold"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <Link
                href="/login"
                className="inline-block rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white"
              >
                Iniciar sesión
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  )
}
