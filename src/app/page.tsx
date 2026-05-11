"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Truck,
  GraduationCap,
  Building2,
  Calculator,
  Phone,
  Mail,
  MapPin,
  Clock,
  ChevronRight,
  CheckCircle2,
  Star,
  Shield,
  Users,
  TrendingUp,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

/* ───────────────────────── NAVBAR ───────────────────────── */
function Navbar() {
  const [open, setOpen] = useState(false);
  const links = [
    { href: "#inicio", label: "Inicio" },
    { href: "#servicios", label: "Servicios" },
    { href: "#nosotros", label: "Nosotros" },
    { href: "#testimonios", label: "Testimonios" },
    { href: "#faq", label: "FAQ" },
    { href: "#contacto", label: "Contacto" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-navy-dark/70 backdrop-blur-lg border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a href="#inicio" className="flex items-center gap-3">
            <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-lg bg-gold/20 flex items-center justify-center">
              <Truck className="w-6 h-6 lg:w-7 lg:h-7 text-gold" />
            </div>
            <div>
              <span className="text-lg lg:text-xl font-bold text-white tracking-tight">
                Trans<span className="text-gold">Pro</span>
              </span>
              <span className="hidden sm:block text-[10px] text-slate-400 -mt-1 tracking-widest uppercase">
                Services
              </span>
            </div>
          </a>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-8">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-semibold text-slate-200 hover:text-gold transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA Desktop */}
          <div className="hidden lg:flex items-center gap-3">
            <a href="tel:+18005551234">
              <Button
                variant="outline"
                size="sm"
                className="border-gold/40 text-gold hover:bg-gold hover:text-navy-dark"
              >
                <Phone className="w-4 h-4 mr-2" />
                Llamar Ahora
              </Button>
            </a>
            <a href="#contacto">
              <Button
                size="sm"
                className="bg-gold hover:bg-gold-light text-navy-dark font-semibold"
              >
                Consulta Gratis
              </Button>
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden text-white p-2"
            aria-label="Toggle menu"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-navy-dark border-t border-white/10 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-2">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block py-2 px-3 text-slate-300 hover:text-gold hover:bg-white/5 rounded-lg transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <Separator className="bg-white/10 my-2" />
              <a
                href="#contacto"
                onClick={() => setOpen(false)}
                className="block"
              >
                <Button className="w-full bg-gold hover:bg-gold-light text-navy-dark font-semibold mt-2">
                  Consulta Gratis
                </Button>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

/* ───────────────────────── HERO ───────────────────────── */
function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src="/hero-bg.png"
          alt="Transporte y logistica"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <Badge className="mb-6 bg-gold text-navy-dark border-gold px-4 py-2 text-sm font-bold">
              <Star className="w-3.5 h-3.5 mr-1.5" />
              Mas de 500 empresas confian en nosotros
            </Badge>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white leading-tight mb-6 drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)]">
              Tu socio estrategico en el{" "}
              <span className="text-gold">sector transporte</span>
            </h1>

            <p className="text-lg sm:text-xl font-medium text-white mb-8 max-w-2xl leading-relaxed drop-shadow-[0_1px_6px_rgba(0,0,0,0.8)]">
              Te ayudamos a construir, crecer y proteger tu negocio de
              transporte. Desde la creacion de tu LLC hasta la contabilidad y
              los impuestos, somos tu equipo de expertos.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#contacto">
                <Button
                  size="lg"
                  className="bg-gold hover:bg-gold-light text-navy-dark font-extrabold text-lg px-10 py-7 w-full sm:w-auto shadow-lg shadow-gold/30 hover:shadow-xl hover:shadow-gold/40"
                >
                  Comienza Tu Consulta Gratis
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              </a>
              <a href="#servicios">
                <Button
                  size="lg"
                  className="bg-white text-navy-dark font-extrabold text-lg px-10 py-7 w-full sm:w-auto shadow-lg hover:bg-white/90"
                >
                  Nuestros Servicios
                </Button>
              </a>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center gap-6 mt-12 pt-8 border-t border-white/30">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-gold" />
                <span className="text-sm font-bold text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
                  Licenciados y Certificados
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-gold" />
                <span className="text-sm font-bold text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
                  +500 Clientes Activos
                </span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-gold" />
                <span className="text-sm font-bold text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
                  15 Anos de Experiencia
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
          <div className="w-1 h-3 bg-gold rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}

/* ───────────────────────── STATS ───────────────────────── */
function Stats() {
  const stats = [
    { value: "500+", label: "Empresas Creadas" },
    { value: "98%", label: "Tasa de Satisfaccion" },
    { value: "15+", label: "Anos de Experiencia" },
    { value: "24/7", label: "Soporte Disponible" },
  ];

  return (
    <section className="bg-navy py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="text-center p-6 rounded-xl bg-white/5 border border-white/10"
            >
              <div className="text-3xl lg:text-4xl font-bold text-gold mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-slate-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── SERVICES ───────────────────────── */
function Services() {
  const services = [
    {
      icon: GraduationCap,
      title: "Adiestramiento Comercial",
      description:
        "Capacitacion integral para conductores y propietarios de flotas. Cubrimos regulaciones FMCSA, requisitos del DOT, seguridad operacional, gestion de rutasy mejores practicas de la industria del transporte.",
      features: [
        "Capacitacion FMCSA y DOT",
        "Certificacion de conductores",
        "Seguridad operacional",
        "Gestion de flotas",
      ],
    },
    {
      icon: Building2,
      title: "Creacion de LLC",
      description:
        "Establece tu estructura legal de forma correcta desde el primer dia. Nos encargamos de todo el proceso de formacion de tu LLC, incluyendo registro estatal, obtencion del EIN y cumplimiento de requisitos legales del sector transporte.",
      features: [
        "Registro en tu estado",
        "Obtencion de EIN / ITIN",
        "Acuerdos operativos",
        "Registro de marcas",
      ],
    },
    {
      icon: TrendingUp,
      title: "Estructura Financiera",
      description:
        "Diseñamos una estructura financiera solida para tu negocio de transporte. Desde la apertura de cuentas bancarias empresariales hasta la obtencion de creditoy lineas de capital de trabajo para hacer crecer tu operacion.",
      features: [
        "Cuentas bancarias B2B",
        "Lineas de credito",
        "Planificacion fiscal",
        "Gestion de flujo de caja",
      ],
    },
    {
      icon: Calculator,
      title: "Contabilidad e Impuestos",
      description:
        "Servicios completos de contabilidad y preparacion de impuestos especializados para empresas de transporte. Manejamos IRS 2290, IFTA, HVUT y todas las obligaciones fiscales especificas de la industria.",
      features: [
        "IRS 2290 y HVUT",
        "Reportes IFTA",
        "Contabilidad mensual",
        "Planificacion de impuestos",
      ],
    },
  ];

  return (
    <section id="servicios" className="py-20 lg:py-28 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <Badge
            variant="outline"
            className="mb-4 border-gold/40 text-gold-dark bg-gold/10"
          >
            Nuestros Servicios
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy-dark mb-4">
            Todo lo que necesitas para tu{" "}
            <span className="text-gold-dark">negocio de transporte</span>
          </h2>
          <p className="text-lg text-slate-600">
            Ofrecemos soluciones integrales diseñadas especificamente para
            empresas y operadores del sector transporte. Cada servicio esta
            adaptado a las necesidades unicas de tu negocio.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="group h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white">
                <CardContent className="p-6 lg:p-8">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-14 h-14 rounded-xl bg-navy/10 flex items-center justify-center flex-shrink-0 group-hover:bg-navy group-hover:text-gold transition-colors duration-300">
                      <service.icon className="w-7 h-7 text-navy group-hover:text-gold transition-colors duration-300" />
                    </div>
                    <h3 className="text-xl lg:text-2xl font-bold text-navy-dark pt-2">
                      {service.title}
                    </h3>
                  </div>

                  <p className="text-slate-600 mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {service.features.map((feature) => (
                      <div
                        key={feature}
                        className="flex items-center gap-2 text-sm"
                      >
                        <CheckCircle2 className="w-4 h-4 text-gold-dark flex-shrink-0" />
                        <span className="text-slate-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── ABOUT ───────────────────────── */
function About() {
  return (
    <section id="nosotros" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/hero-bg.png"
                alt="Nuestro equipo"
                className="w-full h-[400px] lg:h-[500px] object-cover"
              />
            </div>
            {/* Floating card */}
            <div className="absolute -bottom-6 -right-4 sm:right-4 bg-navy-dark text-white rounded-xl p-4 lg:p-6 shadow-xl max-w-[200px]">
              <div className="text-3xl lg:text-4xl font-bold text-gold mb-1">
                15+
              </div>
              <div className="text-sm text-slate-300">
                Anos ayudando empresas de transporte
              </div>
            </div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Badge
              variant="outline"
              className="mb-4 border-gold/40 text-gold-dark bg-gold/10"
            >
              Sobre Nosotros
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-dark mb-6">
              Experto en el sector transporte con{" "}
              <span className="text-gold-dark">resultados comprobados</span>
            </h2>
            <p className="text-slate-600 mb-6 leading-relaxed">
              En TransPro Services entendemos los desafios unicos del sector
              transporte. Nuestro equipo de profesionales con anos de
              experiencia en logistica, finanzas, derecho corporativo e
              impuestos, esta dedicado a proporcionar soluciones integrales que
              impulsan el crecimiento de tu negocio.
            </p>
            <p className="text-slate-600 mb-8 leading-relaxed">
              Hemos ayudado a mas de 500 empresas de transporte a establecerse
              legalmente, optimizar sus finanzas y cumplir con todas las
              regulaciones federales y estatales. Nuestro enfoque personalizado
              garantiza que cada cliente reciba la atencion y los servicios que
              realmente necesita para tener exito en la industria del transporte.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {[
                "Equipo multidisciplinario",
                "Atencion personalizada",
                "Resultado garantizado",
                "Precios competitivos",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-gold-dark" />
                  </div>
                  <span className="text-slate-700 font-medium">{item}</span>
                </div>
              ))}
            </div>

            <a href="#contacto">
              <Button
                size="lg"
                className="bg-navy-dark hover:bg-navy text-white font-semibold"
              >
                Conoce Nuestro Equipo
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── PROCESS ───────────────────────── */
function Process() {
  const steps = [
    {
      step: "01",
      title: "Consulta Inicial",
      description:
        "Agendamos una llamada donde evaluamos tu situacion actual, tus metas de negocio y tus necesidades especificas en el sector transporte. Es completamente gratis y sin compromiso.",
    },
    {
      step: "02",
      title: "Plan Personalizado",
      description:
        "Nuestro equipo diseña una estrategia a medida que cubre todos los aspectos legales, financieros y operacionales que tu negocio de transporte necesita para operar con exito.",
    },
    {
      step: "03",
      title: "Ejecucion Completa",
      description:
        "Nos encargamos de implementar cada paso del plan: desde la creacion de tu LLC y obtencion de permisos, hasta la configuracion de tu estructura financiera y contable.",
    },
    {
      step: "04",
      title: "Soporte Continuo",
      description:
        "No te dejamos solo. Ofrecemos soporte continuo con reportes mensuales, asesoria fiscal trimestral y actualizaciones sobre cambios regulatorios que afecten tu negocio.",
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-navy-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <Badge className="mb-4 bg-gold/20 text-gold border-gold/30">
            Como Funciona
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Tu camino hacia el exito en{" "}
            <span className="text-gold">4 pasos simples</span>
          </h2>
          <p className="text-lg text-slate-400">
            Un proceso claro y transparente diseñado para que empieces a operar
            lo antes posible con toda la proteccion legal y financiera que
            necesitas.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {steps.map((item, index) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="relative"
            >
              <div className="p-6 rounded-xl bg-white/5 border border-white/10 hover:border-gold/30 transition-colors duration-300 h-full">
                <div className="text-4xl font-bold text-gold/30 mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
              {/* Connector */}
              {index < 3 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-px bg-gradient-to-r from-gold/40 to-transparent" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── TESTIMONIALS ───────────────────────── */
function Testimonials() {
  const testimonials = [
    {
      name: "Carlos Rodriguez",
      role: "Propietario, Rodriguez Trucking LLC",
      text: "TransPro Services me ayudo a crear mi LLC desde cero. El proceso fue rapido, profesional y sin dolores de cabeza. Ahora tengo mi negocio legalmente establecido y creciendo. Increible equipo de trabajo.",
      rating: 5,
    },
    {
      name: "Maria Gonzalez",
      role: "Gerente, MG Logistics Inc.",
      text: "Sus servicios de contabilidad y preparation de impuestos han sido fundamentales para mi operacion. Me ahorran tiempo y dinero, y siempre estan disponibles cuando los necesito. Totalmente recomendados para cualquier empresa de transporte.",
      rating: 5,
    },
    {
      name: "Roberto Martinez",
      role: "Conductor Independiente",
      text: "Gracias a su adiestramiento comercial, obtuve todos mis permisos y certificaciones. El entrenamiento fue completo y me dio la confianza para operar legalmente. Ahora entiendo todos los requisitos del DOT y FMCSA.",
      rating: 5,
    },
  ];

  return (
    <section id="testimonios" className="py-20 lg:py-28 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <Badge
            variant="outline"
            className="mb-4 border-gold/40 text-gold-dark bg-gold/10"
          >
            Testimonios
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy-dark mb-4">
            Lo que dicen{" "}
            <span className="text-gold-dark">nuestros clientes</span>
          </h2>
          <p className="text-lg text-slate-600">
            La satisfaccion de nuestros clientes es nuestra mejor carta de
            presentacion. Cada testimonio refleja nuestro compromiso con la
            excelencia y el servicio personalizado.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full border-0 shadow-lg bg-white">
                <CardContent className="p-6 lg:p-8">
                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 text-gold fill-gold"
                      />
                    ))}
                  </div>

                  <p className="text-slate-600 mb-6 leading-relaxed italic">
                    &ldquo;{testimonial.text}&rdquo;
                  </p>

                  <Separator className="mb-4" />

                  <div>
                    <div className="font-bold text-navy-dark">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-slate-500">
                      {testimonial.role}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── FAQ ───────────────────────── */
function FAQ() {
  const faqs = [
    {
      q: "¿Cuanto tiempo toma crear una LLC?",
      a: "El tiempo varia segun el estado, pero generalmente el proceso completo toma entre 5 a 10 dias habiles. Incluimos la preparacion de documentos, presentacion ante el estado, obtencion del EIN y la configuracion de tu estructura legal. Nos encargamos de todo para que tu solo te preocupes por operar tu negocio.",
    },
    {
      q: "¿Que es el IRS 2290 y necesito pagarlo?",
      a: "El IRS 2290 es el impuesto federal de uso de vehiculos pesados (HVUT). Todo vehiculo con un peso bruto de 55,000 libras o mas que circule en carreteras publicas debe pagar este impuesto anualmente. Nosotros nos encargamos del calculo, la presentacion y el pago para que tu operacion este siempre al dia con el IRS.",
    },
    {
      q: "¿Que incluye el adiestramiento comercial?",
      a: "Nuestro adiestramiento cubre todos los aspectos necesarios para operar legalmente en el sector transporte: regulaciones FMCSA, requisitos del DOT, seguridad operacional, gestioon de rutas, cumplimiento de horas de servicio (HOS), inspecciones preventivas y documentacion requerida. Incluimos material de estudio y asesorla personalizada.",
    },
    {
      q: "¿Pueden ayudarme si ya tengo mi negocio de transporte?",
      a: "Por supuesto. Muchos de nuestros clientes ya tenlan su negocio operando pero necesitaban optimizar su estructura financiera, mejorar su contabilidad o ponerse al dla con sus impuestos. Evaluamos tu situacion actual y creamos un plan para llevar tu operacion al siguiente nivel.",
    },
    {
      q: "¿Cuales son los costos de sus servicios?",
      a: "Nuestros costos varlan segun los servicios que necesites. Ofrecemos paquetes integrales y servicios individuales. La consulta inicial es completamente gratis, y all evaluamos tus necesidades para darte una cotizacion transparente sin costos ocultos. Contacanos para obtener un presupuesto personalizado.",
    },
    {
      q: "¿Ofrecen servicios en espanol?",
      a: "Si, todos nuestros servicios estan disponibles en espanol y ingles. Entendemos la importancia de comunicarnos en tu idioma para que entiendas cada paso del proceso. Nuestro equipo bilingue esta listo para atenderte.",
    },
  ];

  return (
    <section id="faq" className="py-20 lg:py-28 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge
            variant="outline"
            className="mb-4 border-gold/40 text-gold-dark bg-gold/10"
          >
            Preguntas Frecuentes
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-dark mb-4">
            Resolvemos tus <span className="text-gold-dark">dudas</span>
          </h2>
          <p className="text-lg text-slate-600">
            Aqui encontraras respuestas a las preguntas mas comunes sobre
            nuestros servicios. Si no encuentras lo que buscas, no dudes en
            contactarnos.
          </p>
        </motion.div>

        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <AccordionItem
                value={`item-${index}`}
                className="border border-slate-200 rounded-xl px-6 data-[state=open]:border-gold/40 transition-colors"
              >
                <AccordionTrigger className="text-left text-base font-semibold text-navy-dark hover:text-gold-dark hover:no-underline py-5">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 leading-relaxed pb-5">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

/* ───────────────────────── CONTACT ───────────────────────── */
function Contact() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    toast({
      title: "Mensaje enviado con exito",
      description:
        "Hemos recibido tu solicitud. Nos pondremos en contacto contigo dentro de las proximas 24 horas.",
    });

    setFormData({ name: "", phone: "", email: "", service: "", message: "" });
  };

  return (
    <section id="contacto" className="py-20 lg:py-28 bg-navy-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <Badge className="mb-4 bg-gold/20 text-gold border-gold/30">
            Contacto
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Agenda tu{" "}
            <span className="text-gold">consulta gratis</span>
          </h2>
          <p className="text-lg text-slate-400">
            Da el primer paso hacia el exito de tu negocio de transporte.
            Completa el formulario y un asesor se pondra en contacto contigo.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-gold/20 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">Llamanos</h4>
                  <a
                    href="tel:+18005551234"
                    className="text-gold hover:text-gold-light transition-colors"
                  >
                    +1 (800) 555-1234
                  </a>
                  <p className="text-sm text-slate-400 mt-1">Lunes a Viernes 8am - 6pm</p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-gold/20 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">Email</h4>
                  <a
                    href="mailto:info@transproservices.com"
                    className="text-gold hover:text-gold-light transition-colors"
                  >
                    info@transproservices.com
                  </a>
                  <p className="text-sm text-slate-400 mt-1">
                    Respuesta en menos de 24 horas
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-gold/20 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">Oficina</h4>
                  <p className="text-slate-400">
                    123 Logistics Ave, Suite 200
                    <br />
                    Houston, TX 77001
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-gold/20 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">Horario</h4>
                  <p className="text-slate-400">
                    Lunes - Viernes: 8:00 AM - 6:00 PM
                    <br />
                    Sabado: 9:00 AM - 2:00 PM
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              className="p-6 lg:p-8 rounded-2xl bg-white/5 border border-white/10"
            >
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm text-slate-300 mb-2">
                    Nombre Completo *
                  </label>
                  <Input
                    required
                    placeholder="Tu nombre"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:border-gold/50"
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-300 mb-2">
                    Telefono *
                  </label>
                  <Input
                    required
                    type="tel"
                    placeholder="(555) 123-4567"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:border-gold/50"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm text-slate-300 mb-2">
                  Correo Electronico *
                </label>
                <Input
                  required
                  type="email"
                  placeholder="tu@email.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:border-gold/50"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm text-slate-300 mb-2">
                  Servicio de Interes
                </label>
                <select
                  value={formData.service}
                  onChange={(e) =>
                    setFormData({ ...formData, service: e.target.value })
                  }
                  className="w-full h-10 rounded-md bg-white/5 border border-white/10 text-white px-3 text-sm focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/50"
                >
                  <option value="" className="bg-navy-dark">
                    Selecciona un servicio...
                  </option>
                  <option
                    value="adiestramiento"
                    className="bg-navy-dark"
                  >
                    Adiestramiento Comercial
                  </option>
                  <option value="llc" className="bg-navy-dark">
                    Creacion de LLC
                  </option>
                  <option value="financiera" className="bg-navy-dark">
                    Estructura Financiera
                  </option>
                  <option value="contabilidad" className="bg-navy-dark">
                    Contabilidad e Impuestos
                  </option>
                  <option value="paquete" className="bg-navy-dark">
                    Paquete Completo
                  </option>
                </select>
              </div>

              <div className="mb-6">
                <label className="block text-sm text-slate-300 mb-2">
                  Mensaje
                </label>
                <Textarea
                  placeholder="Cuentanos sobre tu negocio y como podemos ayudarte..."
                  rows={4}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:border-gold/50 resize-none"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                size="lg"
                className="w-full bg-gold hover:bg-gold-light text-navy-dark font-bold text-base py-6"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-navy-dark/30 border-t-navy-dark rounded-full animate-spin" />
                    Enviando...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    Enviar Solicitud
                    <ChevronRight className="w-5 h-5" />
                  </span>
                )}
              </Button>

              <p className="text-center text-xs text-slate-500 mt-4">
                Tu informacion es confidencial. No compartimos tus datos con
                terceros.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── CTA BANNER ───────────────────────── */
function CTABanner() {
  return (
    <section className="py-16 lg:py-20 bg-gold">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-navy-dark mb-4">
          Comienza a construir tu futuro en el transporte
        </h2>
        <p className="text-lg text-navy-dark/70 mb-8 max-w-2xl mx-auto">
          No esperes mas. Agenda tu consulta gratis hoy y descubre como
          podemos ayudarte a hacer crecer tu negocio de transporte de manera
          legal, segura y rentable.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#contacto">
            <Button
              size="lg"
              className="bg-navy-dark hover:bg-navy text-white font-bold px-8 py-6 w-full sm:w-auto"
            >
              Agenda Tu Consulta Gratis
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </a>
          <a href="tel:+18005551234">
            <Button
              variant="outline"
              size="lg"
              className="border-navy-dark/30 text-navy-dark hover:bg-navy-dark/10 px-8 py-6 w-full sm:w-auto"
            >
              <Phone className="w-5 h-5 mr-2" />
              Llamar Ahora
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── FOOTER ───────────────────────── */
function Footer() {
  return (
    <footer className="bg-navy-dark border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gold/20 flex items-center justify-center">
                <Truck className="w-6 h-6 text-gold" />
              </div>
              <div>
                <span className="text-lg font-bold text-white">
                  Trans<span className="text-gold">Pro</span>
                </span>
                <span className="block text-[10px] text-slate-400 -mt-1 tracking-widest uppercase">
                  Services
                </span>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Tu socio estrategico en el sector transporte. Soluciones integrales
              para empresas y operadores del transporte comercial.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-4">Servicios</h4>
            <ul className="space-y-3">
              {[
                "Adiestramiento Comercial",
                "Creacion de LLC",
                "Estructura Financiera",
                "Contabilidad e Impuestos",
              ].map((service) => (
                <li key={service}>
                  <a
                    href="#servicios"
                    className="text-sm text-slate-400 hover:text-gold transition-colors"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Enlaces Rapidos</h4>
            <ul className="space-y-3">
              {[
                { label: "Inicio", href: "#inicio" },
                { label: "Sobre Nosotros", href: "#nosotros" },
                { label: "Testimonios", href: "#testimonios" },
                { label: "Preguntas Frecuentes", href: "#faq" },
                { label: "Contacto", href: "#contacto" },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-gold transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contacto</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                <a
                  href="tel:+18005551234"
                  className="text-sm text-slate-400 hover:text-gold transition-colors"
                >
                  +1 (800) 555-1234
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                <a
                  href="mailto:info@transproservices.com"
                  className="text-sm text-slate-400 hover:text-gold transition-colors"
                >
                  info@transproservices.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                <span className="text-sm text-slate-400">
                  123 Logistics Ave, Suite 200
                  <br />
                  Houston, TX 77001
                </span>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="bg-white/10 my-8" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} TransPro Services. Todos los
            derechos reservados.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-sm text-slate-500 hover:text-gold transition-colors"
            >
              Politica de Privacidad
            </a>
            <a
              href="#"
              className="text-sm text-slate-500 hover:text-gold transition-colors"
            >
              Terminos de Servicio
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ───────────────────────── MAIN PAGE ───────────────────────── */
export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Stats />
        <Services />
        <About />
        <Process />
        <Testimonials />
        <FAQ />
        <CTABanner />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
