export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  neighborhood: string;
  beds?: number;
  baths?: number;
  area?: number; // built construction area (m²)
  landArea?: number; // land plot area (m²)
  constructionArea?: number; // construction area (m²)
  parkingSpaces?: number; // number of parking spaces
  aposentos?: number; // number of spaces/rooms for commercial
  image: string;
  type: 'casa' | 'departamento' | 'terreno' | 'comercial' | 'ph' | 'loft';
  featured: boolean;
  expenses?: number;
  age?: number;
  parking?: boolean;
  owner: {
    name: string;
    phone: string;
    whatsappUrl: string;
  };
  gallery: string[];
  views: number;
  saves: number;
  code: string;
  energyRating: 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G';
  furnished: 'Sí' | 'No' | 'Parcial';
  gardenArea?: number;
  terraceArea?: number;
  cadastralIncome?: number;
  videoUrl?: string;
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
    landArea: 120,
    image: "/images/prop-1.webp",
    type: "departamento",
    featured: true,
    expenses: 85,
    age: 0,
    parking: true,
    owner: {
      name: "Mariana Rodríguez",
      phone: "+506 8876-5432",
      whatsappUrl: "https://wa.me/50688765432?text=Hola%20Mariana,%20estoy%20interesado%20en%20el%20Duplex%20de%20Escazu%20que%20vi%20en%20Due%C3%B1oDirecto."
    },
    gallery: [
      "/images/prop-1.webp",
      "/images/prop-2.webp",
      "/images/prop-3.webp",
      "/images/prop-4.webp"
    ],
    views: 142,
    saves: 12,
    code: "EDV-10901",
    energyRating: "B",
    furnished: "Parcial",
    terraceArea: 24,
    cadastralIncome: 1250
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
    area: 280, // m² de construcción
    landArea: 450, // m² de terreno
    constructionArea: 280, // m² de construcción
    parkingSpaces: 3, // Estacionamientos
    image: "/images/prop-2.webp",
    type: "casa",
    featured: true,
    expenses: 0,
    age: 12,
    parking: true,
    owner: {
      name: "Juan Pablo Gómez",
      phone: "+506 8765-4321",
      whatsappUrl: "https://wa.me/50687654321?text=Hola%20Juan%20Pablo,%20estoy%20interesado%20en%20la%20Casa%20con%20Piscina%20en%20Santa%20Ana%20que%20vi%20en%20Due%C3%B1oDirecto."
    },
    gallery: [
      "/images/prop-2.webp",
      "/images/prop-5.webp",
      "/images/prop-6.webp",
      "/images/prop-1.webp"
    ],
    views: 298,
    saves: 45,
    code: "EDV-10902",
    energyRating: "D",
    furnished: "No",
    gardenArea: 150,
    terraceArea: 35,
    cadastralIncome: 2100
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
    image: "/images/prop-3.webp",
    type: "loft",
    featured: true,
    expenses: 60,
    age: 80,
    parking: false,
    owner: {
      name: "Roberto Peralta",
      phone: "+506 8321-0987",
      whatsappUrl: "https://wa.me/50683210987?text=Hola%20Roberto,%20estoy%20interesado%20en%20el%20Loft%20Industrial%20en%20Barrio%20Amon%20que%20vi%20en%20Due%C3%B1oDirecto."
    },
    gallery: [
      "/images/prop-3.webp",
      "/images/prop-4.webp",
      "/images/prop-1.webp",
      "/images/prop-5.webp"
    ],
    views: 89,
    saves: 7,
    code: "EDV-10903",
    energyRating: "E",
    furnished: "Sí",
    cadastralIncome: 800
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
    image: "/images/prop-4.webp",
    type: "departamento",
    featured: false,
    expenses: 250,
    age: 5,
    parking: true,
    owner: {
      name: "Clara Mitre",
      phone: "+506 8987-6543",
      whatsappUrl: "https://wa.me/50689876543?text=Hola%20Clara,%20estoy%20interesada%20en%20el%20Penthouse%20en%20Tamarindo%20que%20vi%20en%20Due%C3%B1oDirecto."
    },
    gallery: [
      "/images/prop-4.webp",
      "/images/prop-1.webp",
      "/images/prop-3.webp",
      "/images/prop-6.webp"
    ],
    views: 412,
    saves: 83,
    code: "EDV-10904",
    energyRating: "A",
    furnished: "Sí",
    terraceArea: 40,
    cadastralIncome: 3400
  },
  {
    id: "prop-5",
    title: "Terreno Listo para Construir en Condominio",
    description: "Excelente lote totalmente plano listo para construir en exclusivo condominio en Cariari. Cuenta con todos los servicios públicos subterráneos habilitados, calles adoquinadas, seguridad perimetral y vigilancia privada las 24 horas. Listo para escriturar y construir la casa de tus sueños.",
    price: 195000,
    location: "Heredia, Costa Rica",
    neighborhood: "Cariari",
    landArea: 650, // Metros de terreno
    image: "/images/prop-5.webp",
    type: "terreno",
    featured: false,
    expenses: 120,
    age: 0,
    parking: false,
    owner: {
      name: "Esteban Paz",
      phone: "+506 8678-4321",
      whatsappUrl: "https://wa.me/50686784321?text=Hola%20Esteban,%20estoy%20interesado%20en%20la%20Casa%20en%20Cariari%20que%20vi%20en%20Due%C3%B1oDirecto."
    },
    gallery: [
      "/images/prop-5.webp",
      "/images/prop-2.webp",
      "/images/prop-6.webp",
      "/images/prop-3.webp"
    ],
    views: 176,
    saves: 22,
    code: "EDV-10905",
    energyRating: "C",
    furnished: "No",
    cadastralIncome: 1800
  },
  {
    id: "prop-6",
    title: "Edificación Comercial / Locales en Excelente Ubicación",
    description: "Edificio comercial de dos plantas en excelente ubicación comercial sobre avenida principal de Tres Ríos. Cuenta con 8 amplios aposentos ideales para oficinas, consultorios o cubículos comerciales, y estacionamiento frontal cómodo para clientes. Alta afluencia de personas y excelente exposición de marca.",
    price: 680000,
    location: "Cartago, Costa Rica",
    neighborhood: "Tres Ríos",
    parkingSpaces: 10, // Estacionamientos
    aposentos: 8, // Aposentos
    area: 380, // m² de construcción
    image: "/images/prop-6.webp",
    type: "comercial",
    featured: false,
    expenses: 150,
    age: 5,
    parking: true,
    owner: {
      name: "Alejandro Szabo",
      phone: "+506 8345-6789",
      whatsappUrl: "https://wa.me/50683456789?text=Hola%20Alejandro,%20estoy%20interesado%20en%20la%20Casa%20en%20Tres%20Rios%20que%20vi%20en%20Due%C3%B1oDirecto."
    },
    gallery: [
      "/images/prop-6.webp",
      "/images/prop-2.webp",
      "/images/prop-5.webp",
      "/images/prop-4.webp"
    ],
    views: 520,
    saves: 94,
    code: "EDV-10906",
    energyRating: "A",
    furnished: "No",
    cadastralIncome: 4200
  }
];
