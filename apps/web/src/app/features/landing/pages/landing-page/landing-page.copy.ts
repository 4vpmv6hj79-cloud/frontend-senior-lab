import type { SupportedLanguage } from '../../../../core/i18n/language.service';

interface LandingPageCopy {
  navigation: {
    features: string;
    learning: string;
    interviews: string;
    signIn: string;
  };
  hero: {
    badge: string;
    title: string;
    highlightedTitle: string;
    description: string;
    primaryAction: string;
    secondaryAction: string;
  };
  metrics: readonly {
    value: string;
    label: string;
  }[];
  features: {
    eyebrow: string;
    title: string;
    description: string;
    cards: readonly {
      number: string;
      title: string;
      description: string;
    }[];
  };
}

export const LANDING_PAGE_COPY = {
  es: {
    navigation: {
      features: 'Características',
      learning: 'Aprendizaje',
      interviews: 'Entrevistas',
      signIn: 'Ingresar',
    },
    hero: {
      badge: 'Tu laboratorio de crecimiento frontend',
      title: 'Convierte tu experiencia en un perfil',
      highlightedTitle: 'senior comprobable.',
      description:
        'Evalúa tus habilidades, construye una ruta personalizada y practica entrevistas técnicas en español e inglés.',
      primaryAction: 'Iniciar diagnóstico',
      secondaryAction: 'Explorar plataforma',
    },
    metrics: [
      {
        value: '7+',
        label: 'áreas técnicas',
      },
      {
        value: '100%',
        label: 'progreso medible',
      },
      {
        value: 'ES / EN',
        label: 'práctica bilingüe',
      },
    ],
    features: {
      eyebrow: 'Crecimiento estructurado',
      title: 'Todo lo que necesitas para alcanzar el siguiente nivel',
      description:
        'Una experiencia creada para desarrolladores frontend que quieren detectar brechas, practicar y demostrar habilidades senior.',
      cards: [
        {
          number: '01',
          title: 'Diagnóstico técnico',
          description:
            'Evalúa Angular, TypeScript, arquitectura, rendimiento, testing y habilidades de ingeniería.',
        },
        {
          number: '02',
          title: 'Ruta personalizada',
          description:
            'Obtén un plan de aprendizaje basado en tus fortalezas y áreas de oportunidad.',
        },
        {
          number: '03',
          title: 'Simulador de entrevistas',
          description:
            'Practica preguntas técnicas y escenarios reales en español e inglés.',
        },
      ],
    },
  },
  en: {
    navigation: {
      features: 'Features',
      learning: 'Learning',
      interviews: 'Interviews',
      signIn: 'Sign in',
    },
    hero: {
      badge: 'Your frontend growth laboratory',
      title: 'Turn your experience into a',
      highlightedTitle: 'proven senior profile.',
      description:
        'Assess your skills, build a personalized roadmap, and practice technical interviews in Spanish and English.',
      primaryAction: 'Start diagnostic',
      secondaryAction: 'Explore platform',
    },
    metrics: [
      {
        value: '7+',
        label: 'technical areas',
      },
      {
        value: '100%',
        label: 'measurable progress',
      },
      {
        value: 'ES / EN',
        label: 'bilingual practice',
      },
    ],
    features: {
      eyebrow: 'Structured growth',
      title: 'Everything you need to reach the next level',
      description:
        'An experience built for frontend developers who want to identify gaps, practice, and demonstrate senior-level skills.',
      cards: [
        {
          number: '01',
          title: 'Technical diagnostic',
          description:
            'Assess Angular, TypeScript, architecture, performance, testing, and engineering skills.',
        },
        {
          number: '02',
          title: 'Personalized roadmap',
          description:
            'Get a learning plan based on your strengths and improvement opportunities.',
        },
        {
          number: '03',
          title: 'Interview simulator',
          description:
            'Practice technical questions and realistic scenarios in Spanish and English.',
        },
      ],
    },
  },
} as const satisfies Record<SupportedLanguage, LandingPageCopy>;