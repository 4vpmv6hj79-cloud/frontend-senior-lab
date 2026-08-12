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
        value: '15',
        label: 'preguntas de diagnóstico',
      },
      {
        value: '10',
        label: 'escenarios de entrevista',
      },
      {
        value: '5',
        label: 'módulos de aprendizaje',
      },
    ],
    features: {
      eyebrow: 'Cómo funciona',
      title: 'De "sé programar" a "puedo demostrarlo"',
      description:
        'Tres pasos claros para identificar en qué enfocarte, aprender con propósito y llegar preparado a tu próxima entrevista.',
      cards: [
        {
          number: '01',
          title: 'Descubre tu nivel real',
          description:
            '15 preguntas de escenarios reales evalúan tus habilidades en 5 áreas. En 10 minutos sabrás exactamente dónde estás y qué te falta.',
        },
        {
          number: '02',
          title: 'Sigue tu ruta personalizada',
          description:
            'Basado en tus resultados, recibes un plan ordenado por prioridad con recursos reales (docs oficiales, videos, herramientas). Sin adivinanzas.',
        },
        {
          number: '03',
          title: 'Practica como en la entrevista real',
          description:
            'Escenarios de empresas reales: fintechs, startups, SaaS. Cada pregunta incluye contexto, respuesta modelo y tips de lo que el entrevistador espera.',
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
        value: '15',
        label: 'diagnostic questions',
      },
      {
        value: '10',
        label: 'interview scenarios',
      },
      {
        value: '5',
        label: 'learning modules',
      },
    ],
    features: {
      eyebrow: 'How it works',
      title: 'From "I can code" to "I can prove it"',
      description:
        'Three clear steps to identify what to focus on, learn with purpose, and arrive prepared for your next interview.',
      cards: [
        {
          number: '01',
          title: 'Discover your real level',
          description:
            '15 real-scenario questions assess your skills across 5 areas. In 10 minutes you will know exactly where you stand and what you need.',
        },
        {
          number: '02',
          title: 'Follow your personalized roadmap',
          description:
            'Based on your results, you get a plan ordered by priority with real resources (official docs, videos, tools). No guessing.',
        },
        {
          number: '03',
          title: 'Practice like the real interview',
          description:
            'Scenarios from real companies: fintechs, startups, SaaS. Each question includes context, a model answer, and tips on what the interviewer expects.',
        },
      ],
    },
  },
} as const satisfies Record<SupportedLanguage, LandingPageCopy>;