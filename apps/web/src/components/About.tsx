const cards = [
  {
    title: 'Visión',
    description:
      'Ser el socio de referencia para empresas en búsqueda de optimización de capital y crecimiento sostenible.',
  },
  {
    title: 'Misión',
    description:
      'Entregar soluciones financieras integradas que posicionen a nuestros clientes frente a oportunidades de mercado.',
  },
  {
    title: 'Valores',
    description: 'Integridad, excelencia, innovación y foco en clientes.',
  },
]

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-5 py-14" aria-labelledby="about-title">
      <h3 id="about-title" className="text-2xl font-bold">
        Sobre Sanse Capital
      </h3>
      <p className="mt-2 max-w-2xl text-muted">
        Combinamos análisis cuantitativo y experiencia humana para diseñar soluciones financieras a
        la medida. Transparencia, rigor y orientación al resultado son nuestros pilares.
      </p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <div
            key={card.title}
            className="min-h-[140px] rounded-2xl bg-white p-5 shadow-md shadow-black/5"
          >
            <h4 className="mb-2 font-bold">{card.title}</h4>
            <p className="text-sm text-muted">{card.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
