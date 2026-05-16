export type Lang = 'es' | 'en';

export const videoContent = {
  scene1: {
    es: { line1: '¿Eres inmigrante', line2: 'en España?' },
    en: { line1: 'Are you an immigrant', line2: 'in Spain?' },
  },
  scene2: {
    es: {
      title: 'Conocemos los retos...',
      challenges: ['Trámites', 'Burocracia', 'Idioma'],
    },
    en: {
      title: 'We know the challenges...',
      challenges: ['Paperwork', 'Bureaucracy', 'Language'],
    },
  },
  scene3: {
    es: {
      title: 'Nosotros te <br/><span class="text-white">ayudamos</span>',
      titlePlain: 'Nosotros te ayudamos',
      services: [
        'Gestión de trámites',
        'Orientación experta',
        'Impresión de documentos',
        '🌐 Webs para restaurantes y negocios',
      ],
    },
    en: {
      title: 'We are here <br/><span class="text-white">to help you</span>',
      titlePlain: 'We are here to help',
      services: [
        'Document Management',
        'Expert Guidance',
        'Document Printing',
        '🌐 Websites for Restaurants & Businesses',
      ],
    },
  },
  scene4: {
    es: { title: 'Estamos cerca de ti' },
    en: { title: 'We are here for you' },
  },
  scene5: {
    es: { tagline: 'Tu solución en Parets del Vallès', url: 'www.flexsolution.es' },
    en: { tagline: 'Your solution in Parets del Vallès', url: 'www.flexsolution.es' },
  },
} as const;
