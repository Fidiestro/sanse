'use client'

import { useState } from 'react'

const projects = [
  {
    title: 'Reestructuración de deuda',
    description:
      'Rediseño de la deuda corporativa de una firma industrial, ahorro estimado 18% anual.',
  },
  {
    title: 'Ronda Serie A',
    description:
      'Acompañamos la estructuración y búsqueda de inversores para una fintech regional.',
  },
  {
    title: 'Fondo sectorial',
    description: 'Diseño y lanzamiento de fondo sectorial con enfoque en energía renovable.',
  },
  {
    title: 'Optimización de portafolio',
    description: 'Mejora del Sharpe ratio mediante diversificación y cobertura estratégica.',
  },
]

export default function Portfolio() {
  const [index, setIndex] = useState(0)

  const prev = () => setIndex((i) => Math.max(0, i - 1))
  const next = () => setIndex((i) => Math.min(projects.length - 1, i + 1))

  return (
    <section
      id="portfolio"
      className="mx-auto max-w-6xl px-5 py-14"
      aria-labelledby="portfolio-title"
    >
      <h3 id="portfolio-title" className="text-2xl font-bold">
        Proyectos destacados
      </h3>
      <p className="mt-2 text-muted">Algunos ejemplos selectos de proyectos y colaboraciones.</p>

      <div className="relative mt-6 overflow-hidden rounded-2xl bg-gradient-to-b from-white to-slate-50 p-4">
        {/* Navigation buttons */}
        <div className="absolute right-4 top-4 z-10 flex gap-2">
          <button
            onClick={prev}
            disabled={index === 0}
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-white shadow-md transition-colors hover:bg-gray-50 disabled:opacity-40"
            aria-label="Anterior"
          >
            ◀
          </button>
          <button
            onClick={next}
            disabled={index >= projects.length - 1}
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-white shadow-md transition-colors hover:bg-gray-50 disabled:opacity-40"
            aria-label="Siguiente"
          >
            ▶
          </button>
        </div>

        {/* Slides */}
        <div className="overflow-hidden py-3">
          <div
            className="flex gap-3 transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${index * 312}px)` }}
          >
            {projects.map((project) => (
              <div
                key={project.title}
                className="min-w-[300px] flex-shrink-0 rounded-xl bg-white p-4 shadow-md"
              >
                <h4 className="mb-2 font-bold">{project.title}</h4>
                <p className="text-sm text-muted">{project.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
