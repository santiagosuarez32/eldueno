export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  neighborhood: string;
  beds: number;
  baths: number;
  area: number; // in m²
  image: string;
  type: 'departamento' | 'casa' | 'ph' | 'loft';
  featured: boolean;
  expenses?: number; // in CRC or USD
  age?: number; // in years
  parking?: boolean;
  owner: {
    name: string;
    phone: string;
    whatsappUrl: string;
  };
}

export const mockProperties: Property[] = [
  {
    id: "prop-1",
    title: "Duplex de Diseño con Terraza y Parrilla",
    description: "Espectacular duplex a estrenar en el corazón de Escazú. Amplio living comedor con cocina integrada de última generación, terraza privada con parrilla propia y deck de madera. Dormitorio principal en suite con vestidor. Detalles de categoría y excelente iluminación natural en todos los ambientes.",
    price: 320000,
    location: "San José, Costa Rica",
    neighborhood: "Escazú",
    beds: 2,
    baths: 2,
    area: 95,
    image: "/images/prop-1.png",
    type: "departamento",
    featured: true,
    expenses: 85, // USD
    age: 0,
    parking: true,
    owner: {
      name: "Mariana Rodríguez",
      phone: "+506 8876-5432",
      whatsappUrl: "https://wa.me/50688765432?text=Hola%20Mariana,%20estoy%20interesado%20en%20el%20Duplex%20de%20Escazu%20que%20vi%20en%20Due%C3%B1oDirecto."
    }
  },
  {
    id: "prop-2",
    title: "Casa Familiar con Gran Jardín y Piscina",
    description: "Hermosa propiedad desarrollada en dos plantas en la exclusiva zona residencial de Santa Ana. Living con chimenea, comedor principal, cocina con comedor diario. Suite principal con balcón al jardín y dos dormitorios adicionales. Hermosa galería con parrilla, gran jardín arbolado y piscina climatizada.",
    price: 540000,
    location: "San José, Costa Rica",
    neighborhood: "Santa Ana",
    beds: 4,
    baths: 3,
    area: 280,
    image: "/images/prop-2.png",
    type: "casa",
    featured: true,
    expenses: 0,
    age: 12,
    parking: true,
    owner: {
      name: "Juan Pablo Gómez",
      phone: "+506 8765-4321",
      whatsappUrl: "https://wa.me/50687654321?text=Hola%20Juan%20Pablo,%20estoy%20interesado%20en%20la%20Casa%20con%20Piscina%20en%20Santa%20Ana%20que%20vi%20en%20Due%C3%B1oDirecto."
    }
  },
  {
    id: "prop-3",
    title: "Loft Industrial de Techos Altos y Ladrillo Visto",
    description: "Exclusivo loft de estilo neoyorquino en un histórico edificio reciclado de Barrio Amón. Techos de 4.5 metros de altura con bovedilla original, columnas de hierro fundido y grandes ventanales. Planta libre con entrepiso para dormitorio. Cocina industrial de acero inoxidable. Apto profesional.",
    price: 185000,
    location: "San José, Costa Rica",
    neighborhood: "Barrio Amón",
    beds: 1,
    baths: 1,
    area: 72,
    image: "/images/prop-3.png",
    type: "loft",
    featured: true,
    expenses: 60, // USD
    age: 80,
    parking: false,
    owner: {
      name: "Roberto Peralta",
      phone: "+506 8321-0987",
      whatsappUrl: "https://wa.me/50683210987?text=Hola%20Roberto,%20estoy%20interesado%20en%20el%20Loft%20Industrial%20en%20Barrio%20Amon%20que%20vi%20en%20Due%C3%B1oDirecto."
    }
  },
  {
    id: "prop-4",
    title: "Penthouse Exclusivo con Vista al Mar",
    description: "Espectacular piso alto en torre de categoría en Tamarindo. Vista panorámica libre de 360 grados al mar y los atardeceres. Palier privado, master suite con jacuzzi y vestidor doble, cocina con isla central, living comedor de 10x5 metros. Amenities en el edificio: seguridad 24 hs, piscina, gimnasio y acceso directo a la playa.",
    price: 790000,
    location: "Guanacaste, Costa Rica",
    neighborhood: "Tamarindo",
    beds: 3,
    baths: 4,
    area: 210,
    image: "/images/prop-4.png",
    type: "departamento",
    featured: false,
    expenses: 250, // USD
    age: 5,
    parking: true,
    owner: {
      name: "Clara Mitre",
      phone: "+506 8987-6543",
      whatsappUrl: "https://wa.me/50689876543?text=Hola%20Clara,%20estoy%20interesada%20en%20el%20Penthouse%20en%20Tamarindo%20que%20vi%20en%20Due%C3%B1oDirecto."
    }
  },
  {
    id: "prop-5",
    title: "Casa de Lujo en Zona Cariari",
    description: "Hermosa residencia de lujo reciclada por completo con acabados de primera en el área del Club de Golf Cariari. Amplio hall de entrada, living con techos altos, terraza y 2 suites completas. Cocina con sobres de cuarzo y desayunador.",
    price: 450000,
    location: "Heredia, Costa Rica",
    neighborhood: "Cariari",
    beds: 3,
    baths: 2.5,
    area: 220,
    image: "/images/prop-5.png",
    type: "casa",
    featured: false,
    expenses: 120, // USD
    age: 15,
    parking: true,
    owner: {
      name: "Esteban Paz",
      phone: "+506 8678-4321",
      whatsappUrl: "https://wa.me/50686784321?text=Hola%20Esteban,%20estoy%20interesado%20en%20la%20Casa%20en%20Cariari%20que%20vi%20en%20Due%C3%B1oDirecto."
    }
  },
  {
    id: "prop-6",
    title: "Casa Minimalista con Vista a las Montañas",
    description: "Imponente casa moderna en condominio privado en Tres Ríos, Cartago. Estilo racionalista con grandes paños vidriados. Living comedor de doble altura. Piscina infinity integrada al paisaje. Galería cubierta, master suite y 3 dormitorios en planta alta. Domótica integrada.",
    price: 980000,
    location: "Cartago, Costa Rica",
    neighborhood: "Tres Ríos",
    beds: 5,
    baths: 5,
    area: 410,
    image: "/images/prop-6.png",
    type: "casa",
    featured: false,
    expenses: 150, // USD
    age: 2,
    parking: true,
    owner: {
      name: "Alejandro Szabo",
      phone: "+506 8345-6789",
      whatsappUrl: "https://wa.me/50683456789?text=Hola%20Alejandro,%20estoy%20interesado%20en%20la%20Casa%20en%20Tres%20Rios%20que%20vi%20en%20Due%C3%B1oDirecto."
    }
  }
];
