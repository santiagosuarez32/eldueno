-- Crear tabla 'blogs'
CREATE TABLE IF NOT EXISTS public.blogs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  category TEXT DEFAULT 'General',
  date TEXT,
  read_time TEXT DEFAULT '5 min',
  author TEXT DEFAULT 'Dueño Directo',
  excerpt TEXT,
  image TEXT,
  content TEXT,
  published BOOLEAN DEFAULT false
);

-- Configurar RLS (Row Level Security)
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;

-- Políticas de RLS
-- Permitir lectura a todos (anon o autenticados) si el blog está publicado
CREATE POLICY "Public blogs are viewable by everyone."
  ON public.blogs FOR SELECT
  USING (published = true);

-- Permitir a usuarios autenticados o service_role leer y modificar cualquier blog (para la parte admin)
-- Nota: Si usas anon_key en el admin, necesitarás políticas adicionales para INSERT/UPDATE/DELETE.
-- Por simplicidad y como suele ser un dashboard de admin:
CREATE POLICY "Enable all access for authenticated users" 
  ON public.blogs FOR ALL 
  TO authenticated 
  USING (true) 
  WITH CHECK (true);

-- Si el panel de admin en local usa anon_key sin loguear un usuario, quizás necesites esto (solo para desarrollo local, NO RECOMENDADO EN PRODUCCIÓN):
-- CREATE POLICY "Enable all access for anon users (dev only)" ON public.blogs FOR ALL TO anon USING (true) WITH CHECK (true);

-- Insertar los blogs de prueba iniciales
INSERT INTO public.blogs (title, slug, category, date, read_time, author, excerpt, image, content, published)
VALUES
(
  '¿Por qué trabajar con una empresa de bienes raíces?',
  'por-que-trabajar-con-empresa-bienes-raices',
  'Guía Práctica',
  '12 de Junio, 2026',
  '5 min',
  'Empresa Inmobiliaria Team',
  'El mercado inmobiliario puede ser complejo y competitivo, por lo que contar con el apoyo de una empresa de bienes raíces se convierte en una decisión estratégica para cualquier persona que desee comprar, vender o invertir en una propiedad.',
  'https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
  '¿Por qué trabajar con una empresa de bienes raíces?
El mercado inmobiliario puede ser complejo y competitivo, por lo que contar con el apoyo de una empresa de bienes raíces se convierte en una decisión estratégica para cualquier persona que desee comprar, vender o invertir en una propiedad.

### 1. Conocimiento del mercado
Una empresa inmobiliaria cuenta con experiencia y análisis del mercado local, lo que permite determinar precios justos, identificar oportunidades de inversión y evitar errores comunes en la toma de decisiones.

### 2. Ahorro de tiempo y esfuerzo
Buscar, promocionar o negociar una propiedad puede ser un proceso largo. Un equipo profesional se encarga de filtrar opciones, coordinar visitas y gestionar cada etapa del proceso, ahorrando tiempo al cliente.

### 3. Asesoría profesional
Los expertos inmobiliarios brindan acompañamiento en aspectos legales, financieros y técnicos, asegurando que cada transacción se realice de manera correcta y segura.

### 4. Mayor seguridad en la negociación
Trabajar con profesionales reduce riesgos como fraudes, sobrevaloraciones o problemas legales. Cada operación se maneja con transparencia y respaldo.

### 5. Acceso a mejores oportunidades
Las empresas inmobiliarias suelen contar con propiedades exclusivas o de acceso limitado, lo que amplía las opciones para compradores e inversionistas.

### 6. Mejor poder de negociación
Un agente inmobiliario experimentado puede negociar mejores condiciones de compra o venta, logrando beneficios económicos para el cliente.

### Conclusión
Trabajar con una empresa de bienes raíces no solo facilita el proceso, sino que también brinda seguridad, confianza y mejores resultados. Es una inversión inteligente que garantiza acompañamiento profesional en una de las decisiones más importantes: tu patrimonio.',
  true
),
(
  'Primeros pasos para comprar una propiedad',
  'primeros-pasos-para-comprar-una-propiedad',
  'Guía Práctica',
  '8 de Junio, 2026',
  '7 min',
  'Primeros Pasos',
  'Comprar una propiedad es una de las decisiones financieras más importantes en la vida de una persona. Para hacerlo de manera segura y exitosa, es fundamental seguir un proceso ordenado que permita tomar decisiones informadas.',
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
  'Primeros pasos para comprar una propiedad
Comprar una propiedad es una de las decisiones financieras más importantes en la vida de una persona. Para hacerlo de manera segura y exitosa, es fundamental seguir un proceso ordenado que permita tomar decisiones informadas.

### 1. Definir el presupuesto
El primer paso es establecer cuánto se puede invertir. Esto incluye ahorro disponible, ingresos mensuales y capacidad de endeudamiento en caso de requerir financiamiento.

### 2. Evaluar opciones de financiamiento
Es importante conocer las alternativas de crédito hipotecario disponibles en bancos o entidades financieras. Esto permite saber el monto real que se puede financiar y las condiciones de pago.

### 3. Identificar necesidades y prioridades
Antes de buscar una propiedad, se deben definir aspectos como ubicación, tamaño, tipo de inmueble, número de habitaciones y características específicas que se requieren.

### 4. Buscar asesoría inmobiliaria
Contar con un asesor o empresa de bienes raíces facilita el proceso, ya que brinda acceso a opciones del mercado, orientación profesional y acompañamiento en cada etapa.

### 5. Visitar propiedades
Es recomendable visitar varias opciones para comparar condiciones, precios y ubicaciones, asegurando que la decisión sea la más adecuada.

### 6. Revisar la documentación legal
Antes de realizar cualquier compra, es fundamental verificar que la propiedad esté debidamente inscrita y libre de problemas legales.

### 7. Realizar la oferta y negociación
Una vez seleccionada la propiedad, se procede a realizar la oferta y negociar las condiciones de compra con el vendedor.

### 8. Formalizar la compra
El proceso final incluye la firma de contratos y la inscripción legal de la propiedad a nombre del comprador.

### Conclusión
Comprar una propiedad requiere planificación, análisis y asesoría profesional. Siguiendo estos pasos, el proceso se vuelve más seguro, claro y eficiente, permitiendo una inversión inteligente y sin riesgos innecesarios.',
  true
)
ON CONFLICT (slug) DO NOTHING;
