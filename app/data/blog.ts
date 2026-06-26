export interface BlogPost {
  slug: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  title: string;
  excerpt: string;
  image: string;
  content: string;
  id?: string;
  published?: boolean;
  created_at?: string;
}

export const mockBlogPosts: BlogPost[] = [
  {
    slug: 'como-vender-sin-comisiones',
    category: 'Guía Práctica',
    date: '12 de Junio, 2026',
    readTime: '5 min',
    author: 'Dueño Directo Team',
    title: 'Cómo vender tu propiedad sin comisiones inmobiliarias',
    excerpt: 'Descubrí los pasos clave para publicar, promocionar y negociar tu inmueble de forma directa y segura ahorrando miles de dólares.',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    content: `Vender una propiedad directamente sin pasar por intermediarios inmobiliarios es una de las decisiones financieras más inteligentes que podés tomar. Las comisiones inmobiliarias tradicionales oscilan entre el 3% y el 5% del valor total de venta. En una propiedad de USD 200,000, esto representa un gasto de entre USD 6,000 y USD 10,000 que podés ahorrarte por completo.

Aquí te explicamos la guía práctica paso a paso para vender con éxito directo con el dueño:

### 1. Prepará tu propiedad (Home Staging)
La primera impresión es crucial. Limpiá, despersonalizá y realizá pequeñas reparaciones. Una mano de pintura neutra y una iluminación adecuada multiplican el atractivo visual y el valor percibido.

### 2. Fotos y video profesionales
No escatimes en la calidad visual. Utilizá una cámara de buena resolución o contratá a un profesional para tomar fotografías con luz de día. Mostrá los ambientes abiertos, las vistas y los detalles del baño y la cocina. Un video de recorrido corto ayuda a que los interesados se visualicen caminando por el lugar.

### 3. Establecé el precio correcto
Estudiá los precios de propiedades similares en tu barrio. Si ponés un precio demasiado alto, el aviso quedará inactivo; si es bajo, perderás dinero. Podés solicitar una tasación profesional independiente para tener un valor de mercado realista.

### 4. Redactá un aviso atractivo
Destacá los beneficios únicos: proximidad a transportes, escuelas, seguridad, amenities, si cuenta con cochera o jardín. Sé transparente con las especificaciones técnicas (metros cuadrados cubiertos, expensas, antigüedad).

### 5. Respondé con rapidez
La velocidad de respuesta es fundamental. En Dueño Directo conectamos directamente a compradores por WhatsApp. Respondé de forma amable, clara y coordiná visitas rápidas.`
  },
  {
    slug: 'documentos-compra-directa',
    category: 'Legal',
    date: '8 de Junio, 2026',
    readTime: '7 min',
    author: 'Escribanía Asociada',
    title: 'Documentos necesarios para comprar directo al dueño',
    excerpt: 'Todo lo que necesitás saber sobre boletos de compraventa, escrituras y trámites legales para operar de forma transparente y protegida.',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    content: `La seguridad jurídica es la principal preocupación de los compradores y vendedores en una transacción directa. Sin embargo, realizar la operación de forma directa y segura es perfectamente factible si se conocen los documentos requeridos y se cuenta con el soporte de un escribano de confianza.

Esta es la documentación indispensable que debés revisar antes de realizar cualquier pago:

### 1. Título de Propiedad (Escritura)
Es el documento que acredita que el vendedor es el legítimo propietario del inmueble. El escribano solicitará un informe de dominio en el Registro de la Propiedad para validar que la escritura esté asentada correctamente y que no existan inhibiciones sobre el dueño.

### 2. Certificado de Libre Gravamen
Es vital comprobar que la propiedad no esté hipotecada, embargada ni sujeta a litigios judiciales. Este informe garantiza que el inmueble se transfiere "limpio" de deudas y cargas jurídicas.

### 3. Plano de Catastro
El plano catastral visado indica las dimensiones reales del terreno y la construcción aprobada por el municipio. Permite verificar que las medidas del lote coincidan con la realidad y con lo detallado en la escritura.

### 4. Impuestos y Servicios al Día
Se deben solicitar los últimos comprobantes de pago de los impuestos municipales (como el impuesto territorial o municipal) y servicios públicos (agua, luz, expensas si es condominio). Todas las deudas anteriores a la firma de la escritura deben ser canceladas por el vendedor.

### 5. Boleto de Compraventa y Opción de Compra
Es el contrato preliminar donde se pactan el precio, la forma de pago, la fecha de escrituración y la entrega de la posesión. Generalmente se realiza un pago de reserva (seña) y es aconsejable que sea redactado y certificado por un escribano público.`
  },
  {
    slug: 'zonas-crecimiento-costa-rica',
    category: 'Tendencias',
    date: '3 de Junio, 2026',
    readTime: '4 min',
    author: 'Dpto. de Análisis Dueño Directo',
    title: 'Zonas con mayor crecimiento y retorno en Costa Rica',
    excerpt: 'Analizamos los barrios y distritos que están experimentando el mayor auge inmobiliario, ideales para invertir o mudarte.',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    content: `Costa Rica se consolida como uno de los destinos más atractivos para la inversión en bienes raíces, tanto para residentes locales como para inversores extranjeros y nómadas digitales. La combinación de calidad de vida, seguridad y desarrollo de infraestructura ha impulsado el dinamismo de mercados clave.

Analizamos los distritos y zonas con mayor proyección de revalorización en el país:

### 1. Escazú y Santa Ana (San José)
Siguen siendo los centros urbanos premium por excelencia. Con una oferta inigualable de oficinas corporativas de alto nivel, centros comerciales, gastronomía y escuelas privadas. Su conectividad con la Ruta 27 y su alta demanda de alquileres de ejecutivos multinacionales aseguran un retorno sólido del 6% al 8% anual en dólares.

### 2. Tamarindo y Nosara (Guanacaste)
El auge del turismo ecológico y el teletrabajo ha convertido a Guanacaste en la meca inmobiliaria. Propiedades con cercanía a la playa o vistas al mar en Nosara o Tamarindo registran las tasas de revalorización más altas del país. La demanda de alquiler vacacional en plataformas digitales mantiene ocupaciones promedio muy altas durante todo el año.

### 3. Tres Ríos y Curridabat (San José Este)
El este del Gran Área Metropolitana está experimentando un desarrollo comercial y residencial espectacular. Es una zona muy buscada por familias jóvenes gracias a su clima fresco, excelente oferta académica y un desarrollo de condominios modernos con amenities de primer nivel.

### 4. Cariari y Belén (Heredia)
Favorecidos por la concentración de zonas francas industriales y de tecnología. El alquiler residencial corporativo en estas ubicaciones cuenta con demanda constante de empleados calificados, lo que reduce las tasas de desocupación a mínimos históricos.`
  }
];

export function mapDbToBlogPost(dbPost: any): BlogPost {
  return {
    slug: dbPost.slug || "",
    category: dbPost.category || "General",
    date: dbPost.date || "Fecha desconocida",
    readTime: dbPost.read_time || "5 min",
    author: dbPost.author || "Dueño Directo",
    title: dbPost.title || "",
    excerpt: dbPost.excerpt || "",
    image: dbPost.image || "/placeholder-blog.jpg",
    content: dbPost.content || "",
    published: dbPost.published !== undefined ? Boolean(dbPost.published) : true,
    id: dbPost.id || undefined,
    created_at: dbPost.created_at || undefined
  } as any;
}
