import React, { useState } from 'react';
import { 
  Home, 
  Key, 
  FileText, 
  ShieldCheck, 
  Scale, 
  Building, 
  Menu, 
  X, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ArrowRight, 
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import logoArsin from './assets/log_arsin.png';
import heroBuilding from './assets/hero_building.png';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Form input validation logic (on Blur)
  const validateField = (name, value) => {
    let error = '';
    if (name === 'name' && !value.trim()) {
      error = 'Por favor, introduce tu nombre completo.';
    } else if (name === 'email') {
      if (!value.trim()) {
        error = 'El correo electrónico es requerido.';
      } else if (!/\S+@\S+\.\S+/.test(value)) {
        error = 'Introduce un formato de correo electrónico válido.';
      }
    } else if (name === 'phone') {
      if (!value.trim()) {
        error = 'El teléfono de contacto es requerido.';
      } else if (!/^\d{10}$/.test(value.replace(/\D/g, ''))) {
        error = 'El teléfono debe contener 10 dígitos.';
      }
    } else if (name === 'message' && !value.trim()) {
      error = 'Por favor, escribe tu mensaje o consulta.';
    }
    return error;
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setFormErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error immediately as user types
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate all fields on submit
    const errors = {};
    Object.keys(formState).forEach(key => {
      const error = validateField(key, formState[key]);
      if (error) errors[key] = error;
    });

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      // Focus on first invalid input
      const firstErrorField = Object.keys(errors)[0];
      const element = document.getElementById(firstErrorField);
      if (element) element.focus();
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormState({ name: '', email: '', phone: '', message: '' });
    }, 1200);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-brand-wine/20 selection:text-brand-wine">
      
      {/* HEADER / NAVBAR */}
      <header className="sticky top-0 z-50 glass-panel shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <a href="#inicio" className="flex items-center gap-3">
            <img 
              src={logoArsin} 
              alt="Logo ARSIN" 
              className="h-14 w-auto object-contain"
            />
            <div className="hidden sm:block">
              <span className="font-serif text-xl font-bold tracking-tight text-brand-wine block leading-none">ARSIN</span>
              <span className="text-[9px] uppercase tracking-widest text-brand-gray font-semibold block mt-1">Servicios Inmobiliarios y Notariales</span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#inicio" className="text-brand-gray-dark hover:text-brand-wine font-medium text-sm transition-colors">Inicio</a>
            <a href="#servicios" className="text-brand-gray-dark hover:text-brand-wine font-medium text-sm transition-colors">Servicios</a>
            <a href="#nosotros" className="text-brand-gray-dark hover:text-brand-wine font-medium text-sm transition-colors">Nosotros</a>
            <a href="#contacto" className="text-brand-gray-dark hover:text-brand-wine font-medium text-sm transition-colors">Contacto</a>
          </nav>

          <div className="hidden md:block">
            <a 
              href="https://wa.me/522293061825"
              target="_blank"
              rel="noopener noreferrer" 
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-brand-wine text-white text-sm font-semibold hover:bg-brand-wine-light shadow-md hover:shadow-lg transform hover:-translate-y-0.5 smooth-hover"
            >
              Contacto Directo
            </a>
          </div>

          {/* Mobile menu button */}
          <button 
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-brand-gray hover:text-brand-wine focus:outline-none focus:ring-2 focus:ring-brand-wine"
            aria-expanded={isMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* Mobile Navigation Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden glass-panel border-t border-brand-gray/10 animate-fade-in absolute w-full left-0 shadow-xl">
            <div className="px-4 pt-2 pb-6 space-y-3">
              <a 
                href="#inicio" 
                onClick={() => setIsMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-brand-gray-dark hover:bg-brand-wine/5 hover:text-brand-wine"
              >
                Inicio
              </a>
              <a 
                href="#servicios" 
                onClick={() => setIsMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-brand-gray-dark hover:bg-brand-wine/5 hover:text-brand-wine"
              >
                Servicios
              </a>
              <a 
                href="#nosotros" 
                onClick={() => setIsMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-brand-gray-dark hover:bg-brand-wine/5 hover:text-brand-wine"
              >
                Nosotros
              </a>
              <a 
                href="#contacto" 
                onClick={() => setIsMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-brand-gray-dark hover:bg-brand-wine/5 hover:text-brand-wine"
              >
                Contacto
              </a>
              <div className="pt-4 px-3">
                <a 
                  href="tel:2293061825"
                  className="w-full inline-flex items-center justify-center px-4 py-3 rounded-lg bg-brand-wine text-white text-base font-semibold hover:bg-brand-wine-light shadow-md"
                >
                  Llamar 229 306 1825
                </a>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* HERO SECTION */}
      <section id="inicio" className="relative bg-brand-gray-dark min-h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with elegant overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={heroBuilding} 
            alt="Fachada de oficinas modernas" 
            className="w-full h-full object-cover object-center scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-wine-dark/95 via-brand-wine-dark/80 to-brand-gray-dark/70"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-white grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-8 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-gold/20 border border-brand-gold/30 text-brand-gold text-xs font-semibold uppercase tracking-wider">
              <ShieldCheck size={14} /> Certeza Inmobiliaria y Legal
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-serif leading-tight tracking-tight max-w-3xl">
              Certeza jurídica y respaldo profesional en cada paso
            </h1>
            <p className="text-lg sm:text-xl text-gray-200 font-light max-w-2xl leading-relaxed">
              En ARSIN combinamos la experiencia de más de 10 años en el ramo inmobiliario con un profundo dominio de la gestoría legal y notarial en Coatzacoalcos, Veracruz.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
              <a 
                href="#servicios" 
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-lg bg-brand-gold text-brand-wine-dark hover:bg-white hover:text-brand-wine font-bold transition-all shadow-lg hover:shadow-brand-gold/20"
              >
                Explorar Servicios
                <ArrowRight size={18} className="ml-2" />
              </a>
              <a 
                href="#contacto" 
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-lg border-2 border-white text-white hover:bg-white/10 font-bold transition-all"
              >
                Hablar con un Asesor
              </a>
            </div>
          </div>

          {/* Quick Contact Form Mini Panel */}
          <div className="lg:col-span-4 hidden lg:block">
            <div className="glass-panel-dark text-white p-8 rounded-2xl shadow-2xl border border-white/10 space-y-6">
              <h3 className="font-serif text-2xl font-semibold border-b border-white/10 pb-4">Asesoría Inmediata</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-brand-gold/20 rounded-lg text-brand-gold mt-1">
                    <Phone size={20} />
                  </div>
                  <div>
                    <span className="text-xs text-gray-300 block">Teléfono de Atención</span>
                    <a href="tel:2293061825" className="text-lg font-bold hover:text-brand-gold transition-colors">229 306 1825</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-brand-gold/20 rounded-lg text-brand-gold mt-1">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <span className="text-xs text-gray-300 block">Ubicación Corporativa</span>
                    <span className="text-sm font-semibold">Cuauhtémoc 301 Altos, Centro, Coatzacoalcos</span>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-brand-gold/20 rounded-lg text-brand-gold mt-1">
                    <Clock size={20} />
                  </div>
                  <div>
                    <span className="text-xs text-gray-300 block">Horario de Oficina</span>
                    <span className="text-sm font-semibold">Lun - Vie: 9:00 AM - 6:00 PM</span>
                  </div>
                </div>
              </div>
              <a 
                href="https://wa.me/522293061825"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-green-600 hover:bg-green-700 text-white font-bold transition-all shadow-md text-sm"
              >
                Contactar por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="bg-brand-wine-dark text-white border-y border-brand-gold/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-x divide-white/10">
            <div className="px-4">
              <span className="block text-3xl sm:text-4xl font-serif font-bold text-brand-gold">10+</span>
              <span className="block text-xs uppercase tracking-wider text-gray-300 mt-1">Años de Trayectoria</span>
            </div>
            <div className="px-4">
              <span className="block text-3xl sm:text-4xl font-serif font-bold text-brand-gold">2014</span>
              <span className="block text-xs uppercase tracking-wider text-gray-300 mt-1">Año de Fundación</span>
            </div>
            <div className="px-4">
              <span className="block text-3xl sm:text-4xl font-serif font-bold text-brand-gold">100%</span>
              <span className="block text-xs uppercase tracking-wider text-gray-300 mt-1">Certeza Jurídica</span>
            </div>
            <div className="px-4">
              <span className="block text-3xl sm:text-4xl font-serif font-bold text-brand-gold">Coatzacoalcos</span>
              <span className="block text-xs uppercase tracking-wider text-gray-300 mt-1">Sede Principal</span>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section id="servicios" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-brand-gray-dark">Nuestros Servicios Integrales</h2>
            <div className="w-20 h-1 bg-brand-wine mx-auto mt-4 mb-6 rounded"></div>
            <p className="text-brand-gray text-base sm:text-lg font-light leading-relaxed">
              Brindamos soluciones profesionales tanto en el mercado inmobiliario como en la gestión jurídica y notarial de tus trámites para proteger tu patrimonio.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            
            {/* SERVICIOS INMOBILIARIOS CARD */}
            <div className="bg-brand-gray-light rounded-2xl p-8 border border-gray-200/60 shadow-md flex flex-col justify-between hover:shadow-xl transition-shadow">
              <div>
                <div className="inline-flex items-center gap-3 text-brand-wine font-serif text-2xl font-bold mb-6">
                  <div className="p-3 bg-brand-wine/10 rounded-lg">
                    <Home size={26} />
                  </div>
                  Servicios Inmobiliarios
                </div>
                <p className="text-brand-gray font-light text-sm mb-8 leading-relaxed">
                  Facilitamos las operaciones de arrendamiento y compra-venta con total transparencia y seguridad para propietarios e inquilinos.
                </p>

                <ul className="space-y-6">
                  <li className="flex gap-4">
                    <div className="text-brand-wine-light mt-1"><Key size={20} /></div>
                    <div>
                      <h4 className="font-semibold text-brand-gray-dark text-base">Arrendamiento Seguro</h4>
                      <p className="text-brand-gray text-sm font-light mt-1">Investigación integral de prospectos, blindaje con contratos legales y administración de rentas mensuales.</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="text-brand-wine-light mt-1"><Building size={20} /></div>
                    <div>
                      <h4 className="font-semibold text-brand-gray-dark text-base">Compra, Venta y Promoción</h4>
                      <p className="text-brand-gray text-sm font-light mt-1">Comercialización profesional de propiedades residenciales, comerciales e industriales bajo valores justos de mercado.</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="text-brand-wine-light mt-1"><ShieldCheck size={20} /></div>
                    <div>
                      <h4 className="font-semibold text-brand-gray-dark text-base">Administración de Inmuebles</h4>
                      <p className="text-brand-gray text-sm font-light mt-1">Gestión completa de mantenimiento preventivo, cobranza periódica y enlace directo con inquilinos.</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <a 
                  href="#contacto" 
                  className="inline-flex items-center gap-2 text-brand-wine font-semibold hover:text-brand-wine-light text-sm"
                >
                  Cotizar servicio inmobiliario <ArrowRight size={16} />
                </a>
              </div>
            </div>

            {/* SERVICIOS LEGALES Y NOTARIALES CARD */}
            <div className="bg-brand-gray-light rounded-2xl p-8 border border-gray-200/60 shadow-md flex flex-col justify-between hover:shadow-xl transition-shadow">
              <div>
                <div className="inline-flex items-center gap-3 text-brand-wine font-serif text-2xl font-bold mb-6">
                  <div className="p-3 bg-brand-wine/10 rounded-lg">
                    <Scale size={26} />
                  </div>
                  Servicios Legales y Notariales
                </div>
                <p className="text-brand-gray font-light text-sm mb-8 leading-relaxed">
                  Damos soporte y asesoría integral para que cada trámite y documento cumpla cabalmente con las regulaciones de ley correspondientes.
                </p>

                <ul className="space-y-6">
                  <li className="flex gap-4">
                    <div className="text-brand-wine-light mt-1"><FileText size={20} /></div>
                    <div>
                      <h4 className="font-semibold text-brand-gray-dark text-base">Gestoría Ante Notarías</h4>
                      <p className="text-brand-gray text-sm font-light mt-1">Coordinación de escrituraciones, poderes notariales, testamentos y cotejo de documentos con absoluta rapidez.</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="text-brand-wine-light mt-1"><Scale size={20} /></div>
                    <div>
                      <h4 className="font-semibold text-brand-gray-dark text-base">Elaboración de Contratos</h4>
                      <p className="text-brand-gray text-sm font-light mt-1">Confección y revisión técnica de contratos de compraventa, comodato, fideicomisos y actas corporativas.</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="text-brand-wine-light mt-1"><ShieldCheck size={20} /></div>
                    <div>
                      <h4 className="font-semibold text-brand-gray-dark text-base">Asesoría Legal e Inmobiliaria</h4>
                      <p className="text-brand-gray text-sm font-light mt-1">Dictamen de escrituras, regularización de predios intestados o con gravamen y prevención de fraudes inmobiliarios.</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <a 
                  href="#contacto" 
                  className="inline-flex items-center gap-2 text-brand-wine font-semibold hover:text-brand-wine-light text-sm"
                >
                  Solicitar asesoría legal <ArrowRight size={16} />
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ABOUT US SECTION */}
      <section id="nosotros" className="py-24 bg-brand-gray-light border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Left Column: Text Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-wine/10 text-brand-wine text-xs font-semibold uppercase tracking-wider">
                Sobre Nosotros
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold font-serif text-brand-gray-dark">
                Más de una década brindando seguridad y tranquilidad patrimonial
              </h2>
              <div className="w-16 h-1 bg-brand-wine rounded"></div>
              
              <p className="text-brand-gray font-light text-base leading-relaxed">
                Fundada formalmente el <strong>29 de octubre de 2014</strong> en el corazón de Coatzacoalcos, Veracruz, <strong>ARSIN</strong> (Arrendamientos y Servicios Inmobiliarios y Notariales S.A. de C.V.) nació con la misión de llenar una brecha crítica en el mercado local: la falta de seguridad jurídica integral en las transacciones de bienes raíces.
              </p>
              <p className="text-brand-gray font-light text-base leading-relaxed">
                A lo largo de más de 10 años, hemos consolidado una red confiable de asesores legales, peritos valuadores y notarios aliados. Esto nos permite garantizar que cada contrato que firmamos y cada propiedad que comercializamos cuenten con el sustento legal óptimo, libre de vicios o problemas futuros.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                <div className="p-5 bg-white rounded-xl border border-gray-200 shadow-sm">
                  <h4 className="font-serif font-bold text-lg text-brand-wine">Nuestra Misión</h4>
                  <p className="text-brand-gray text-xs font-light mt-2">Proteger y hacer crecer el patrimonio inmobiliario de nuestros clientes con absoluta transparencia, legalidad y ética profesional.</p>
                </div>
                <div className="p-5 bg-white rounded-xl border border-gray-200 shadow-sm">
                  <h4 className="font-serif font-bold text-lg text-brand-wine">Nuestra Filosofía</h4>
                  <p className="text-brand-gray text-xs font-light mt-2">La certeza jurídica es la base de cualquier negocio exitoso. Trabajamos bajo estricto cumplimiento para evitar riesgos innecesarios.</p>
                </div>
              </div>
            </div>

            {/* Right Column: Corporate Trust Visual Card */}
            <div className="lg:col-span-5">
              <div className="relative p-8 rounded-2xl bg-gradient-to-br from-brand-wine to-brand-wine-dark text-white shadow-2xl border border-brand-gold/25 overflow-hidden">
                {/* Decorative background visual elements */}
                <div className="absolute -right-16 -bottom-16 w-48 h-48 rounded-full bg-brand-gold/10 blur-xl"></div>
                <div className="absolute -left-12 -top-12 w-36 h-36 rounded-full bg-brand-gold/5 blur-lg"></div>
                
                <h3 className="font-serif text-2xl font-bold border-b border-white/20 pb-4 mb-6">Por qué elegir a ARSIN</h3>
                
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-brand-gold/20 flex items-center justify-center text-brand-gold shrink-0 font-bold">1</div>
                    <div>
                      <h5 className="font-semibold text-sm">Experiencia Comprobada</h5>
                      <p className="text-xs text-gray-200 mt-1 font-light">Más de una década gestionando con éxito arrendamientos complejos y apoyando trámites ante notarios.</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-brand-gold/20 flex items-center justify-center text-brand-gold shrink-0 font-bold">2</div>
                    <div>
                      <h5 className="font-semibold text-sm">Prevención de Riesgos Legales</h5>
                      <p className="text-xs text-gray-200 mt-1 font-light">Análisis de solvencia de inquilinos y dictámenes rigurosos de estatus registral de propiedades.</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-brand-gold/20 flex items-center justify-center text-brand-gold shrink-0 font-bold">3</div>
                    <div>
                      <h5 className="font-semibold text-sm">Ubicación y Calidez Local</h5>
                      <p className="text-xs text-gray-200 mt-1 font-light">Atención presencial en Coatzacoalcos Centro y conocimiento profundo de las notarías de la zona.</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-4 rounded-lg bg-white/5 border border-white/10 text-center">
                  <span className="text-xs text-brand-gold font-semibold block uppercase tracking-wider">Llámanos hoy</span>
                  <a href="tel:2293061825" className="text-xl font-bold block mt-1 hover:text-brand-gold transition-colors">229 306 1825</a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contacto" className="py-24 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            {/* Left Column: Contact info and location */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-brand-wine/10 text-brand-wine text-xs font-semibold uppercase tracking-wider mb-3">Contacto</span>
                <h2 className="text-3xl sm:text-4xl font-bold font-serif text-brand-gray-dark">Estamos para servirte</h2>
                <div className="w-12 h-1 bg-brand-wine mt-3 mb-6 rounded"></div>
                <p className="text-brand-gray font-light text-base leading-relaxed">
                  Visítanos en nuestras oficinas o ponte en contacto por cualquiera de nuestros medios. Te atenderemos con gusto y total confidencialidad.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-brand-gray-light rounded-lg text-brand-wine mt-1 border border-gray-200">
                    <Phone size={22} />
                  </div>
                  <div>
                    <h5 className="font-semibold text-brand-gray-dark text-sm">Teléfono Principal</h5>
                    <a href="tel:2293061825" className="text-base font-bold text-brand-wine hover:underline block mt-1">229 306 1825</a>
                    <span className="text-xs text-brand-gray font-light">Llamadas y WhatsApp habilitados.</span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-brand-gray-light rounded-lg text-brand-wine mt-1 border border-gray-200">
                    <MapPin size={22} />
                  </div>
                  <div>
                    <h5 className="font-semibold text-brand-gray-dark text-sm">Dirección de Oficina</h5>
                    <span className="text-sm text-brand-gray-dark font-medium block mt-1">Cuauhtémoc 301 Altos</span>
                    <span className="text-xs text-brand-gray block">Coatzacoalcos Centro, C.P. 96400</span>
                    <span className="text-xs text-brand-gray block">Veracruz, México.</span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-brand-gray-light rounded-lg text-brand-wine mt-1 border border-gray-200">
                    <Clock size={22} />
                  </div>
                  <div>
                    <h5 className="font-semibold text-brand-gray-dark text-sm">Horarios de Atención</h5>
                    <span className="text-xs text-brand-gray-dark font-medium block mt-1">Lunes a Viernes: 9:00 AM - 6:00 PM</span>
                    <span className="text-xs text-brand-gray block">Sábados: Previa cita programada.</span>
                  </div>
                </div>
              </div>

              {/* Small location map simulation with high UX card */}
              <div className="p-6 rounded-2xl bg-brand-gray-light border border-gray-200/80 shadow-sm relative overflow-hidden">
                <div className="absolute right-4 top-4 text-brand-wine/10"><MapPin size={80} /></div>
                <h4 className="font-serif font-bold text-brand-gray-dark text-base">Ubicación Estratégica</h4>
                <p className="text-brand-gray text-xs font-light mt-1.5 max-w-xs leading-relaxed">
                  Ubicados convenientemente en la zona centro de Coatzacoalcos, de fácil acceso y estacionamiento cercano para tu comodidad.
                </p>
                <div className="mt-4">
                  <a 
                    href="https://maps.google.com/?q=Cuauhtémoc+301+Altos,+Coatzacoalcos+Centro,+C.P.+96400,+Veracruz" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-wine hover:text-brand-wine-light"
                  >
                    Ver en Google Maps <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Contact Form */}
            <div className="lg:col-span-7">
              <div className="p-8 sm:p-10 rounded-2xl bg-brand-gray-light border border-gray-200 shadow-lg">
                <h3 className="font-serif text-2xl font-bold text-brand-gray-dark mb-2">Envíanos un mensaje</h3>
                <p className="text-brand-gray font-light text-sm mb-8">
                  Completa el formulario a continuación y un asesor legal o de bienes raíces se comunicará contigo en menos de 24 horas hábiles.
                </p>

                {submitSuccess ? (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-8 text-center space-y-4 animate-fade-in">
                    <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mx-auto">
                      <CheckCircle size={36} />
                    </div>
                    <h4 className="font-serif font-bold text-xl text-emerald-900">¡Mensaje enviado con éxito!</h4>
                    <p className="text-emerald-700 text-sm font-light max-w-md mx-auto">
                      Hemos recibido tu consulta satisfactoriamente. Uno de nuestros asesores especializados se comunicará al teléfono o correo electrónico proporcionados a la brevedad.
                    </p>
                    <button 
                      type="button" 
                      onClick={() => setSubmitSuccess(false)}
                      className="mt-4 px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-all shadow"
                    >
                      Enviar otro mensaje
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                    
                    {/* Name input */}
                    <div className="space-y-1">
                      <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-brand-gray-dark">
                        Nombre Completo <span className="text-brand-wine">*</span>
                      </label>
                      <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        value={formState.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        autocomplete="name"
                        required
                        className={`w-full px-4 py-3 rounded-lg border bg-white text-brand-gray-dark focus:outline-none focus:ring-2 transition-all ${
                          formErrors.name 
                            ? 'border-red-500 focus:ring-red-200' 
                            : 'border-gray-300 focus:border-brand-wine focus:ring-brand-wine/10'
                        }`}
                      />
                      {formErrors.name && (
                        <p className="text-xs text-red-600 font-semibold flex items-center gap-1 mt-1">
                          <AlertCircle size={12} /> {formErrors.name}
                        </p>
                      )}
                    </div>

                    {/* Email and Phone Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Email input */}
                      <div className="space-y-1">
                        <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-brand-gray-dark">
                          Correo Electrónico <span className="text-brand-wine">*</span>
                        </label>
                        <input 
                          type="email" 
                          id="email" 
                          name="email" 
                          value={formState.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          autocomplete="email"
                          required
                          className={`w-full px-4 py-3 rounded-lg border bg-white text-brand-gray-dark focus:outline-none focus:ring-2 transition-all ${
                            formErrors.email 
                              ? 'border-red-500 focus:ring-red-200' 
                              : 'border-gray-300 focus:border-brand-wine focus:ring-brand-wine/10'
                          }`}
                        />
                        {formErrors.email && (
                          <p className="text-xs text-red-600 font-semibold flex items-center gap-1 mt-1">
                            <AlertCircle size={12} /> {formErrors.email}
                          </p>
                        )}
                      </div>

                      {/* Phone input */}
                      <div className="space-y-1">
                        <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-wider text-brand-gray-dark">
                          Teléfono de Contacto <span className="text-brand-wine">*</span>
                        </label>
                        <input 
                          type="tel" 
                          id="phone" 
                          name="phone" 
                          value={formState.phone}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          autocomplete="tel"
                          inputmode="tel"
                          required
                          className={`w-full px-4 py-3 rounded-lg border bg-white text-brand-gray-dark focus:outline-none focus:ring-2 transition-all ${
                            formErrors.phone 
                              ? 'border-red-500 focus:ring-red-200' 
                              : 'border-gray-300 focus:border-brand-wine focus:ring-brand-wine/10'
                          }`}
                        />
                        {formErrors.phone && (
                          <p className="text-xs text-red-600 font-semibold flex items-center gap-1 mt-1">
                            <AlertCircle size={12} /> {formErrors.phone}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Message input */}
                    <div className="space-y-1">
                      <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-brand-gray-dark">
                        Detalle de su Consulta <span className="text-brand-wine">*</span>
                      </label>
                      <textarea 
                        id="message" 
                        name="message" 
                        rows="4"
                        value={formState.message}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                        className={`w-full px-4 py-3 rounded-lg border bg-white text-brand-gray-dark focus:outline-none focus:ring-2 transition-all resize-y ${
                          formErrors.message 
                            ? 'border-red-500 focus:ring-red-200' 
                            : 'border-gray-300 focus:border-brand-wine focus:ring-brand-wine/10'
                        }`}
                      ></textarea>
                      {formErrors.message && (
                        <p className="text-xs text-red-600 font-semibold flex items-center gap-1 mt-1">
                          <AlertCircle size={12} /> {formErrors.message}
                        </p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full inline-flex items-center justify-center px-6 py-4.5 rounded-lg bg-brand-wine text-white font-bold hover:bg-brand-wine-light transition-all shadow-md disabled:bg-brand-wine/50 disabled:cursor-not-allowed text-base"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Enviando...
                        </span>
                      ) : 'Enviar Mensaje de Consulta'}
                    </button>

                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-brand-gray-dark text-white border-t-2 border-brand-gold/30 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-12 gap-12">
          
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <img src={logoArsin} alt="Logo ARSIN" className="h-10 w-auto brightness-0 invert" />
              <span className="font-serif text-xl font-bold text-brand-gold">ARSIN</span>
            </div>
            <p className="text-gray-300 font-light text-xs sm:text-sm leading-relaxed max-w-sm">
              ARRENDAMIENTOS Y SERVICIOS INMOBILIARIOS Y NOTARIALES S.A. DE C.V.<br />
              Brindando seriedad, respaldo y certeza en operaciones de bienes raíces desde 2014.
            </p>
          </div>

          <div className="md:col-span-3 space-y-3">
            <h5 className="font-serif text-sm font-semibold text-brand-gold uppercase tracking-wider">Enlaces Rápidos</h5>
            <ul className="space-y-2 text-xs sm:text-sm font-light text-gray-300">
              <li><a href="#inicio" className="hover:text-brand-gold transition-colors">Inicio</a></li>
              <li><a href="#servicios" className="hover:text-brand-gold transition-colors">Nuestros Servicios</a></li>
              <li><a href="#nosotros" className="hover:text-brand-gold transition-colors">Sobre Nosotros</a></li>
              <li><a href="#contacto" className="hover:text-brand-gold transition-colors">Contacto Oficial</a></li>
            </ul>
          </div>

          <div className="md:col-span-4 space-y-3">
            <h5 className="font-serif text-sm font-semibold text-brand-gold uppercase tracking-wider">Contacto Legal</h5>
            <div className="space-y-2 text-xs sm:text-sm font-light text-gray-300">
              <p className="flex items-center gap-2">
                <MapPin size={16} className="text-brand-gold shrink-0" />
                Cuauhtémoc 301 Altos, Coatzacoalcos Centro, C.P. 96400, Veracruz.
              </p>
              <p className="flex items-center gap-2">
                <Phone size={16} className="text-brand-gold shrink-0" />
                <a href="tel:2293061825" className="hover:underline">229 306 1825</a>
              </p>
              <p className="flex items-center gap-2">
                <Mail size={16} className="text-brand-gold shrink-0" />
                <a href="mailto:ARSINarsinsadecv@outlook.com" className="hover:underline">ARSINarsinsadecv@outlook.com</a>
              </p>
            </div>
          </div>
          
        </div>

        <div className="bg-brand-gray-dark border-t border-white/5 py-6 text-center text-xs text-gray-400 font-light">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p>ARSIN S.A. DE C.V. &copy; {new Date().getFullYear()}. Todos los derechos reservados.</p>
            <p className="text-[10px] text-gray-500 uppercase tracking-widest">Servicios Inmobiliarios y Trámites Legales en Veracruz</p>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default App;
