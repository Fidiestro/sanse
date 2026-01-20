'use client'

export default function Hero() {
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <section id="home" className="mx-auto max-w-6xl px-5 py-16 md:py-24" aria-label="Hero">
      <div className="flex flex-col-reverse items-center gap-10 md:flex-row md:gap-12">
        {/* Left content */}
        <div className="flex-1 text-center md:text-left">
          <span className="inline-block rounded-full bg-gradient-to-r from-blue-50 to-blue-100 px-3 py-1.5 text-xs font-bold text-accent">
            Finanzas - Inversión - Estrategia
          </span>

          <h2 className="mt-5 text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">
            Soluciones financieras modernas para impulsar tu crecimiento
          </h2>

          <p className="mt-4 max-w-xl text-base text-muted md:text-lg">
            Sanse Capital ofrece asesoría estratégica y estructuración de capital para empresas y
            proyectos. Enfocados en resultados medibles, cumplimiento y crecimiento sostenible.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 md:justify-start">
            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, '#contact')}
              className="rounded-xl bg-accent px-5 py-3 font-bold text-white shadow-lg shadow-accent/20 transition-transform hover:scale-105"
            >
              Contactar ahora
            </a>
            <a
              href="#services"
              onClick={(e) => scrollToSection(e, '#services')}
              className="text-sm font-medium text-muted hover:text-primary"
            >
              Ver servicios →
            </a>
          </div>
        </div>

        {/* Right - Mock Card */}
        <div className="flex flex-1 justify-center">
          <div className="w-full max-w-xs rounded-2xl bg-gradient-to-b from-white to-slate-50 p-5 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <strong className="text-sm">Panel de control</strong>
              <span className="text-xs text-muted">v1.0</span>
            </div>

            <div className="mb-3 flex items-center justify-between">
              <div>
                <div className="text-sm font-bold">Portfolio</div>
                <div className="text-xs text-muted">Gestión activa</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-green-600">+14%</div>
                <div className="text-xs text-muted">último trimestre</div>
              </div>
            </div>

            <div className="mb-3 h-2 overflow-hidden rounded-full bg-gray-100">
              <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-accent to-blue-400" />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-bold">Proyectos</div>
                <div className="text-xs text-muted">Diversificados</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold">32</div>
                <div className="text-xs text-muted">activos</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
