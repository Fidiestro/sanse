const services = [
  {
    title: 'Consultoría financiera',
    description: 'Diagnóstico, planificación y optimización de estructuras financieras.',
  },
  {
    title: 'Estructuración de capital',
    description: 'Diseño de rondas de inversión y alternativas de financiación.',
  },
  {
    title: 'Gestión de portafolios',
    description: 'Monitoreo y reequilibrio con enfoque en retorno ajustado al riesgo.',
  },
]

export default function Services() {
  return (
    <section
      id="services"
      className="mx-auto max-w-6xl px-5 py-14"
      aria-labelledby="services-title"
    >
      <h3 id="services-title" className="text-2xl font-bold">
        Servicios
      </h3>
      <p className="mt-2 text-muted">Ofrecemos servicios adaptados a tu etapa y necesidades.</p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <div
            key={service.title}
            className="min-h-[140px] rounded-2xl bg-white p-5 shadow-md shadow-black/5"
          >
            <h4 className="mb-2 font-bold">{service.title}</h4>
            <p className="text-sm text-muted">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
