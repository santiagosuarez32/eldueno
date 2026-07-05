import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';

export const metadata = {
  title: 'Políticas de Privacidad | El Dueño Vende',
  description: 'Políticas de privacidad y manejo de datos de El Dueño Vende.',
};

export default function PrivacidadPage() {
  return (
    <div className="bg-white text-slate-900 min-h-screen">
      <Navbar />
      <main className="pt-32 pb-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-950 mb-8">Políticas de Privacidad</h1>
        
        <div className="prose prose-slate max-w-none prose-headings:text-slate-950 prose-a:text-[#FFFF33] space-y-6">
          <p className="text-sm text-slate-500">Última actualización: {new Date().toLocaleDateString('es-CR')}</p>
          
          <section>
            <h2 className="text-2xl font-bold mt-8 mb-4">1. Recopilación de Información</h2>
            <p className="text-slate-600 leading-relaxed">
              En El Dueño Vende recopilamos información personal que usted nos proporciona voluntariamente, como su nombre, número de teléfono, dirección de correo electrónico y detalles sobre propiedades que desea comprar, vender o alquilar. Esta información se recoge a través de nuestros formularios de contacto y consultas.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mt-8 mb-4">2. Uso de la Información</h2>
            <p className="text-slate-600 leading-relaxed">
              La información que recopilamos se utiliza para:
            </p>
            <ul className="list-disc pl-6 text-slate-600 leading-relaxed space-y-2 mt-2">
              <li>Contactarle en respuesta a sus consultas.</li>
              <li>Proporcionar los servicios inmobiliarios y de arquitectura solicitados.</li>
              <li>Mejorar nuestro sitio web y la experiencia del usuario.</li>
              <li>Enviar actualizaciones relevantes sobre propiedades o servicios de su interés (con su consentimiento).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mt-8 mb-4">3. Protección de Datos</h2>
            <p className="text-slate-600 leading-relaxed">
              Implementamos una variedad de medidas de seguridad para mantener la seguridad de su información personal. Sus datos no serán vendidos, intercambiados, transferidos o dados a ninguna otra empresa sin su consentimiento, excepto con el propósito expreso de entregar el servicio adquirido.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mt-8 mb-4">4. Divulgación a Terceros</h2>
            <p className="text-slate-600 leading-relaxed">
              No vendemos, comercializamos ni transferimos de ningún modo a terceros su información de identificación personal. Esto no incluye a los terceros de confianza que nos asisten en la operación de nuestro sitio web o en la prestación de servicios, siempre que dichas partes acepten mantener esta información confidencial.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mt-8 mb-4">5. Sus Derechos</h2>
            <p className="text-slate-600 leading-relaxed">
              De acuerdo con las leyes de protección de datos aplicables, usted tiene derecho a acceder, rectificar o eliminar su información personal. Si desea ejercer alguno de estos derechos, comuníquese con nosotros a <strong>bienesraices@elduenovende.com</strong>.
            </p>
          </section>
        </div>
      </main>
      <Footer showCTA={false} />
    </div>
  );
}
