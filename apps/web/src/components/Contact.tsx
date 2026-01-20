'use client'

import { useState } from 'react'

export default function Contact() {
  const [status, setStatus] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setStatus('Enviando...')

    // Simular envío (después conectar con backend real)
    await new Promise((resolve) => setTimeout(resolve, 900))

    setIsSubmitting(false)
    setStatus('¡Mensaje enviado! Te contactaremos pronto.')
    ;(e.target as HTMLFormElement).reset()
  }

  return (
    <section id="contact" className="mx-auto max-w-6xl px-5 py-14" aria-labelledby="contact-title">
      <h3 id="contact-title" className="text-2xl font-bold">
        Contacto
      </h3>
      <p className="mt-2 text-muted">
        ¿Listo para trabajar con nosotros? Completa el formulario y te contactamos.
      </p>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4" aria-label="Formulario de contacto">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="name" className="text-sm font-medium">
              Nombre
            </label>
            <input
              id="name"
              type="text"
              placeholder="Tu nombre"
              required
              className="rounded-xl border border-black/10 bg-transparent px-3 py-2.5 text-sm outline-none focus:border-accent"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="tu@correo.com"
              required
              className="rounded-xl border border-black/10 bg-transparent px-3 py-2.5 text-sm outline-none focus:border-accent"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="message" className="text-sm font-medium">
              Mensaje
            </label>
            <textarea
              id="message"
              rows={6}
              placeholder="Cuéntanos sobre tu proyecto..."
              required
              className="resize-none rounded-xl border border-black/10 bg-transparent px-3 py-2.5 text-sm outline-none focus:border-accent"
            />
          </div>

          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-xl bg-accent px-5 py-3 font-bold text-white shadow-lg shadow-accent/20 transition-transform hover:scale-105 disabled:opacity-50"
            >
              Enviar mensaje
            </button>
            {status && (
              <span className="text-sm text-muted" aria-live="polite">
                {status}
              </span>
            )}
          </div>
        </form>

        {/* Contact Info */}
        <aside className="rounded-2xl bg-white p-5 shadow-md shadow-black/5">
          <h4 className="mb-3 font-bold">Datos de contacto</h4>
          <p className="text-sm text-muted">Email: sansefinance@outlook.com</p>
          <p className="text-sm text-muted">Tel: +57 319 455 2890</p>

          <h4 className="mb-2 mt-5 font-bold">Ubicación</h4>
          <p className="text-sm text-muted">Colombia</p>

          <h4 className="mb-2 mt-5 font-bold">Redes sociales</h4>
          <div className="flex gap-3">
            <a
              href="https://x.com/sansecapital"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-accent hover:underline"
            >
              Twitter/X
            </a>
            <a
              href="https://www.instagram.com/sansecapital"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-accent hover:underline"
            >
              Instagram
            </a>
          </div>
        </aside>
      </div>
    </section>
  )
}
