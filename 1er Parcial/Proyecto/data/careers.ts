/**
 * Datos mock de las carreras disponibles para inscripción.
 * Se utilizan imágenes de Unsplash como placeholders de alta resolución.
 */

export interface Career {
    id: string;
    name: string;
    category: 'Ingenierías' | 'Humanidades' | 'Técnicas';
    image: string;
    description: string;
    price: number;
    duration: string;
    modality: string;
    highlights: string[];
}

export const CATEGORIES = [
    { id: 'all', label: 'Todas', icon: 'grid-outline' as const },
    { id: 'Ingenierías', label: 'Ingenierías', icon: 'construct-outline' as const },
    { id: 'Humanidades', label: 'Humanidades', icon: 'book-outline' as const },
    { id: 'Técnicas', label: 'Técnicas', icon: 'hardware-chip-outline' as const },
];

export const CAREERS: Career[] = [
    {
        id: '1',
        name: 'Ingeniería en Sistemas Computacionales',
        category: 'Ingenierías',
        image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80',
        description:
            'Forma profesionistas capaces de diseñar, desarrollar e implementar sistemas de software y hardware. Domina lenguajes de programación, bases de datos, inteligencia artificial y redes de comunicación para resolver problemas tecnológicos complejos en cualquier industria.',
        price: 12500,
        duration: '9 semestres',
        modality: 'Presencial',
        highlights: [
            'Laboratorios de cómputo equipados',
            'Programa de prácticas profesionales',
            'Certificaciones en tecnologías actuales',
        ],
    },
    {
        id: '2',
        name: 'Ingeniería Civil',
        category: 'Ingenierías',
        image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80',
        description:
            'Prepara ingenieros con sólidos conocimientos en estructuras, geotecnia, hidráulica y vías terrestres. Serás capaz de proyectar, construir y supervisar obras de infraestructura que impulsen el desarrollo sustentable de las comunidades.',
        price: 13000,
        duration: '9 semestres',
        modality: 'Presencial',
        highlights: [
            'Visitas técnicas a obras reales',
            'Laboratorio de materiales',
            'Software especializado CAD/BIM',
        ],
    },
    {
        id: '3',
        name: 'Ingeniería Industrial',
        category: 'Ingenierías',
        image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80',
        description:
            'Optimiza procesos productivos, cadenas de suministro y sistemas de calidad. Combina ingeniería, administración y tecnología para mejorar la eficiencia y competitividad de las organizaciones a nivel nacional e internacional.',
        price: 12800,
        duration: '9 semestres',
        modality: 'Presencial',
        highlights: [
            'Enfoque en Lean Manufacturing',
            'Prácticas en empresas del sector',
            'Certificación Six Sigma',
        ],
    },
    {
        id: '4',
        name: 'Licenciatura en Derecho',
        category: 'Humanidades',
        image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80',
        description:
            'Forma abogados con una visión integral del sistema jurídico mexicano e internacional. Desarrolla competencias en litigio, mediación, derecho corporativo y derechos humanos para contribuir a la justicia social.',
        price: 11000,
        duration: '10 semestres',
        modality: 'Presencial',
        highlights: [
            'Bufete jurídico universitario',
            'Convenios con tribunales',
            'Programa de movilidad internacional',
        ],
    },
    {
        id: '5',
        name: 'Licenciatura en Psicología',
        category: 'Humanidades',
        image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&q=80',
        description:
            'Estudia el comportamiento humano desde una perspectiva científica y humanista. Especialízate en psicología clínica, organizacional o educativa para mejorar el bienestar emocional y social de las personas.',
        price: 10500,
        duration: '8 semestres',
        modality: 'Mixta',
        highlights: [
            'Centro de atención psicológica',
            'Laboratorio de neurociencias',
            'Programa de investigación activo',
        ],
    },
    {
        id: '6',
        name: 'Licenciatura en Educación',
        category: 'Humanidades',
        image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80',
        description:
            'Forma educadores innovadores con dominio de estrategias pedagógicas, tecnología educativa y gestión escolar. Contribuye al desarrollo integral de los estudiantes en todos los niveles educativos del país.',
        price: 9800,
        duration: '8 semestres',
        modality: 'Mixta',
        highlights: [
            'Prácticas en escuelas desde 3er semestre',
            'Tecnología educativa de vanguardia',
            'Doble titulación disponible',
        ],
    },
    {
        id: '7',
        name: 'Técnico en Mecatrónica',
        category: 'Técnicas',
        image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80',
        description:
            'Integra mecánica, electrónica, informática y control automático para diseñar y mantener sistemas automatizados. Ideal para la industria 4.0, robótica y manufactura avanzada.',
        price: 8500,
        duration: '6 semestres',
        modality: 'Presencial',
        highlights: [
            'Taller de robótica',
            'Certificación en PLC',
            'Empleo garantizado al egresar',
        ],
    },
    {
        id: '8',
        name: 'Técnico en Energías Renovables',
        category: 'Técnicas',
        image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80',
        description:
            'Aprende a diseñar, instalar y dar mantenimiento a sistemas de energía solar, eólica y biomasa. Contribuye a la transición energética con conocimientos técnicos especializados.',
        price: 9000,
        duration: '6 semestres',
        modality: 'Presencial',
        highlights: [
            'Campo fotovoltaico propio',
            'Certificaciones SEC',
            'Alta demanda laboral',
        ],
    },
];
