import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';

export const metadata = {
  title: 'Términos y Condiciones | El Dueño Vende',
  description: 'Términos y condiciones de uso de la plataforma El Dueño Vende.',
};

export default function TerminosPage() {
  return (
    <div className="bg-white text-slate-900 min-h-screen">
      <Navbar />
      <main className="pt-32 pb-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-950 mb-8">Términos y Condiciones</h1>
        
        <div className="prose prose-slate max-w-none prose-headings:text-slate-950 prose-a:text-[#FFFF33] space-y-6">
          <p className="text-sm text-slate-500">Última actualización: {new Date().toLocaleDateString('es-CR')}</p>
          
          <section>
            <h2 className="text-2xl font-bold mt-8 mb-4">1. Aceptación de los Términos</h2>
            <p className="text-slate-600 leading-relaxed">
              Al acceder y utilizar el sitio web de El Dueño Vende, usted acepta estar sujeto a estos Términos y Condiciones, así como a todas las leyes y regulaciones aplicables en la República de Costa Rica. Si no está de acuerdo con alguno de estos términos, le rogamos que no utilice nuestro sitio.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mt-8 mb-4">2. Uso del Sitio</h2>
            <p className="text-slate-600 leading-relaxed">
              Nuestro sitio web está diseñado para facilitar la compra, venta y alquiler de propiedades, así como ofrecer servicios de arquitectura y préstamos hipotecarios. Usted se compromete a proporcionar información verdadera, exacta, actual y completa al momento de interactuar con nuestra plataforma.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mt-8 mb-4">3. Propiedad Intelectual</h2>
            <p className="text-slate-600 leading-relaxed">
              Todo el contenido presente en este sitio web, incluyendo textos, gráficos, logotipos, íconos de botones, imágenes y compilaciones de datos, es propiedad de El Dueño Vende o de sus proveedores de contenido y está protegido por las leyes de propiedad intelectual internacionales y de Costa Rica.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mt-8 mb-4">4. Limitación de Responsabilidad</h2>
            <p className="text-slate-600 leading-relaxed">
              El Dueño Vende actúa como un intermediario y facilitador en transacciones inmobiliarias. No nos hacemos responsables de disputas que surjan directamente entre compradores y vendedores si no formamos parte integral de la gestión pactada. La información sobre las propiedades es suministrada en su mayoría por los propietarios y debe ser verificada por los interesados.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mt-8 mb-4">5. Modificaciones</h2>
            <p className="text-slate-600 leading-relaxed">
              Nos reservamos el derecho de modificar estos términos en cualquier momento. Su uso continuado del sitio web después de tales cambios constituirá su aceptación de los nuevos términos.
            </p>
          </section>
        </div>
      </main>
      <Footer showCTA={false} />
    </div>
  );
}
