import Link from 'next/link';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { mockProperties } from '@/app/data/properties';
import { ArrowLeft, Bed, Bath, Square, MapPin, Shield, Calendar, Landmark, DollarSign, Phone, MessageCircle, AlertTriangle } from 'lucide-react';

interface PropertyDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function PropertyDetailPage({ params }: PropertyDetailPageProps) {
  const { id } = await params;
  const property = mockProperties.find((p) => p.id === id);

  if (!property) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center space-y-6 pt-24 px-4">
          <AlertTriangle className="h-16 w-16 text-amber-500 animate-bounce" />
          <h1 className="text-2xl sm:text-3xl font-bold">Propiedad No Encontrada</h1>
          <p className="text-slate-400 text-center max-w-md">
            Lo sentimos, el inmueble que estás buscando no existe o fue dado de baja por su propietario.
          </p>
          <Link
            href="/propiedades"
            className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-3 px-6 rounded-2xl transition-colors text-sm"
          >
            Volver al Catálogo
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  // Calculate specific savings for this property price (4%)
  const savings = (property.price * 4) / 100;

  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(property.price);

  const formattedSavings = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(savings);

  return (
    <>
      <Navbar />

      <main className="min-h-screen pt-28 pb-24 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <div className="mb-8">
            <Link
              href="/propiedades"
              className="inline-flex items-center gap-2 text-slate-400 hover:text-white font-semibold transition-colors text-sm group"
            >
              <ArrowLeft className="h-4 w-4 transform group-hover:-translate-x-1 transition-transform" />
              Volver al Catálogo
            </Link>
          </div>

          {/* Main Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Side: Photo, details, specifications */}
            <div className="lg:col-span-8 space-y-10">
              
              {/* Photo Showcase */}
              <div className="relative aspect-video w-full rounded-3xl overflow-hidden bg-slate-900 border border-slate-800/80 shadow-2xl">
                {/* fallback background */}
                <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-900 to-slate-950 flex flex-col items-center justify-center">
                  <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px]" />
                  <span className="text-sm text-slate-500 font-semibold mb-2">Galería de Fotos del Inmueble</span>
                  <span className="text-xs text-slate-600">Publicado directamente por el propietario</span>
                </div>
                
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-full object-cover relative z-10"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />

                {/* Badge Overlay */}
                <div className="absolute top-6 left-6 z-20">
                  <span className="bg-slate-950/80 backdrop-blur-md text-emerald-400 text-xs font-bold px-4 py-2 rounded-full border border-emerald-500/25 shadow-lg flex items-center gap-1.5">
                    <Shield className="h-4 w-4 flex-shrink-0" />
                    Dueño Directo Verificado
                  </span>
                </div>
              </div>

              {/* Title & Price Header */}
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="bg-slate-900 text-slate-300 text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full border border-slate-800">
                    {property.type === 'departamento' ? 'Departamento' : property.type === 'casa' ? 'Casa' : property.type === 'ph' ? 'PH' : 'Loft'}
                  </span>
                  <div className="flex items-center text-xs text-slate-400 gap-1 font-semibold">
                    <MapPin className="h-4 w-4 text-emerald-400" />
                    <span>{property.neighborhood}, {property.location}</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <h1 className="text-2xl sm:text-4xl font-bold text-white tracking-tight leading-snug">
                    {property.title}
                  </h1>
                  <span className="text-3xl font-extrabold text-emerald-400 tracking-tight shrink-0">
                    {formattedPrice}
                  </span>
                </div>
              </div>

              {/* Specifications Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-t border-b border-slate-900">
                <div className="bg-slate-900/35 border border-slate-900 p-4 rounded-2xl text-center space-y-1">
                  <Bed className="h-5 w-5 text-emerald-400 mx-auto" />
                  <p className="text-xs text-slate-500 font-semibold">Dormitorios</p>
                  <p className="text-sm font-bold text-white">{property.beds}</p>
                </div>
                <div className="bg-slate-900/35 border border-slate-900 p-4 rounded-2xl text-center space-y-1">
                  <Bath className="h-5 w-5 text-emerald-400 mx-auto" />
                  <p className="text-xs text-slate-500 font-semibold">Baños</p>
                  <p className="text-sm font-bold text-white">{property.baths}</p>
                </div>
                <div className="bg-slate-900/35 border border-slate-900 p-4 rounded-2xl text-center space-y-1">
                  <Square className="h-5 w-5 text-emerald-400 mx-auto" />
                  <p className="text-xs text-slate-500 font-semibold">Superficie Total</p>
                  <p className="text-sm font-bold text-white">{property.area} m²</p>
                </div>
                <div className="bg-slate-900/35 border border-slate-900 p-4 rounded-2xl text-center space-y-1">
                  <Calendar className="h-5 w-5 text-emerald-400 mx-auto" />
                  <p className="text-xs text-slate-500 font-semibold">Antigüedad</p>
                  <p className="text-sm font-bold text-white">{property.age === 0 ? 'A Estrenar' : `${property.age} años`}</p>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-white">Descripción de la Propiedad</h3>
                <p className="text-slate-400 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                  {property.description}
                </p>
              </div>

              {/* Detailed Specs list */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-white">Ficha Técnica</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-sm bg-slate-900/20 border border-slate-900/60 p-6 rounded-2xl">
                  <div className="flex justify-between py-2 border-b border-slate-900">
                    <span className="text-slate-450 font-medium">Expensas</span>
                    <span className="text-white font-bold">{property.expenses ? `ARS ${property.expenses.toLocaleString('es-AR')}` : 'No aplica'}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-900">
                    <span className="text-slate-450 font-medium">Cochera</span>
                    <span className="text-white font-bold">{property.parking ? 'Sí, cubierta' : 'No tiene'}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-900">
                    <span className="text-slate-450 font-medium">Tipo de Operación</span>
                    <span className="text-white font-bold">Venta Directa</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-900">
                    <span className="text-slate-450 font-medium">Comisión Inmobiliaria</span>
                    <span className="text-emerald-400 font-bold">0% (Comisión Cero)</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Side: Contact owner, WhatsApp call, savings detail */}
            <div className="lg:col-span-4 space-y-8">
              
              {/* Contact Box */}
              <div className="bg-slate-900/50 border border-slate-800/80 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
                <div className="space-y-2 border-b border-slate-800/60 pb-4">
                  <span className="text-xs font-bold text-slate-450 uppercase tracking-wider block">Propietario Directo</span>
                  <h3 className="text-xl font-bold text-white">{property.owner.name}</h3>
                </div>

                <div className="space-y-4">
                  <p className="text-slate-450 text-xs font-semibold leading-relaxed">
                    Comunicate directamente con el dueño para despejar dudas, solicitar documentación catastral o coordinar una visita física al inmueble.
                  </p>

                  <a
                    href={property.owner.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-3.5 px-6 rounded-2xl transition-all duration-200 shadow-md shadow-emerald-500/10 flex items-center justify-center gap-2 group hover:-translate-y-0.5 text-sm"
                  >
                    <MessageCircle className="h-5 w-5 fill-slate-950" />
                    Contactar por WhatsApp
                  </a>

                  <div className="flex items-center justify-center gap-2 text-slate-350 text-xs font-semibold pt-2">
                    <Phone className="h-3.5 w-3.5 text-emerald-400" />
                    <span>Llamar al {property.owner.phone}</span>
                  </div>
                </div>
              </div>

              {/* Specific Savings box */}
              <div className="bg-gradient-to-br from-emerald-500/10 to-slate-900 border border-emerald-500/20 rounded-3xl p-6 sm:p-8 space-y-6">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                  <DollarSign className="h-5 w-5" />
                  AHORRO EN COMISIÓN
                </div>

                <div className="space-y-2">
                  <h4 className="text-3xl font-extrabold text-white tracking-tight">{formattedSavings}</h4>
                  <p className="text-xs text-slate-450 font-medium leading-relaxed">
                    Al comprar esta propiedad sin inmobiliarias, evitan pagar el 4% habitual de comisión (dividido entre vendedor y comprador). Este dinero queda en sus manos.
                  </p>
                </div>
              </div>

              {/* Legal Notice */}
              <div className="bg-slate-950 border border-slate-900 rounded-3xl p-6 space-y-4">
                <div className="flex items-center gap-2 text-amber-500 font-bold text-xs uppercase tracking-wider">
                  <Shield className="h-4.5 w-4.5" />
                  Operación Transparente
                </div>
                <p className="text-slate-500 text-xs leading-relaxed">
                  Para tu tranquilidad, El Dueño Vende te ofrece el servicio de **Boleto Seguro**. Te proveemos plantillas contractuales homologadas y asesoría con escribanos matriculados que supervisan la firma del boleto.
                </p>
              </div>

            </div>

          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
