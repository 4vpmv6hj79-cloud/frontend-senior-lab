import type { ContentBlock } from '../../models/learning.model';

export const PERFORMANCE_LAZY_CONTENT: readonly ContentBlock[] = [
  {
    type: 'text',
    content: {
      es: 'Lazy loading significa cargar solo el código que la ruta actual necesita. En Angular, cada ruta puede ser un chunk independiente que se descarga bajo demanda. El resultado: tu bundle inicial es más pequeño y la primera carga es más rápida.',
      en: 'Lazy loading means loading only the code the current route needs. In Angular, each route can be an independent chunk downloaded on demand. The result: your initial bundle is smaller and the first load is faster.',
    },
  },
  {
    type: 'code',
    content: {
      es: `// Lazy loading de rutas (cada una genera un chunk JS separado)
export const routes: Route[] = [
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./features/dashboard/dashboard-page')
        .then(m => m.DashboardPage),
  },
];

// @defer para lazy loading DENTRO de una página
@Component({
  template: \`
    <!-- Se carga inmediatamente (above the fold) -->
    <app-hero-section />

    <!-- Se carga solo cuando es visible en viewport -->
    @defer (on viewport) {
      <app-heavy-chart [data]="chartData()" />
    } @placeholder {
      <div class="h-64 animate-pulse bg-slate-800 rounded-2xl"></div>
    }
  \`
})`,
      en: `// Lazy loading routes (each generates a separate JS chunk)
export const routes: Route[] = [
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./features/dashboard/dashboard-page')
        .then(m => m.DashboardPage),
  },
];

// @defer for lazy loading WITHIN a page
@Component({
  template: \`
    <!-- Loaded immediately (above the fold) -->
    <app-hero-section />

    <!-- Loaded only when visible in viewport -->
    @defer (on viewport) {
      <app-heavy-chart [data]="chartData()" />
    } @placeholder {
      <div class="h-64 animate-pulse bg-slate-800 rounded-2xl"></div>
    }
  \`
})`,
    },
    language: 'typescript',
  },
  {
    type: 'tip',
    content: {
      es: 'Usa npx source-map-explorer dist/browser/main.*.js para ver qué ocupa espacio en tu bundle. A menudo encontrarás librerías que importaste completas cuando solo necesitabas una función.',
      en: "Use npx source-map-explorer dist/browser/main.*.js to see what takes space in your bundle. You'll often find libraries you imported completely when you only needed one function.",
    },
  },
];

export const PERFORMANCE_VIRTUAL_CONTENT: readonly ContentBlock[] = [
  {
    type: 'text',
    content: {
      es: 'Virtual scrolling renderiza solo los elementos visibles en pantalla (típicamente 10-20 items), sin importar si la lista tiene 10,000. El truco: se calcula la posición de scroll y se renderizan solo los items del viewport actual.',
      en: 'Virtual scrolling renders only the elements visible on screen (typically 10-20 items), regardless of whether the list has 10,000. The trick: scroll position is calculated and only items in the current viewport are rendered.',
    },
  },
  {
    type: 'code',
    content: {
      es: `// Con Angular CDK Virtual Scrolling
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';

@Component({
  template: \`
    <cdk-virtual-scroll-viewport
      itemSize="48"
      class="h-[400px]"
    >
      <div
        *cdkVirtualFor="let item of items; trackBy: trackById"
        class="h-12 flex items-center px-4"
      >
        {{ item.name }}
      </div>
    </cdk-virtual-scroll-viewport>
  \`
})
export class UserList {
  items = signal<User[]>([]); // puede tener 50,000 items

  trackById(_: number, item: User) {
    return item.id; // tracking estable para evitar re-renders
  }
}`,
      en: `// With Angular CDK Virtual Scrolling
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';

@Component({
  template: \`
    <cdk-virtual-scroll-viewport
      itemSize="48"
      class="h-[400px]"
    >
      <div
        *cdkVirtualFor="let item of items; trackBy: trackById"
        class="h-12 flex items-center px-4"
      >
        {{ item.name }}
      </div>
    </cdk-virtual-scroll-viewport>
  \`
})
export class UserList {
  items = signal<User[]>([]); // can have 50,000 items

  trackById(_: number, item: User) {
    return item.id; // stable tracking to avoid re-renders
  }
}`,
    },
    language: 'typescript',
  },
  {
    type: 'tip',
    content: {
      es: 'Virtual scrolling no es la única solución para listas grandes. Considera también: paginación (más simple), infinite scroll (carga progresiva), o filtrado en el servidor si los datos son demasiados.',
      en: "Virtual scrolling isn't the only solution for large lists. Also consider: pagination (simpler), infinite scroll (progressive loading), or server-side filtering if data is too large.",
    },
  },
];

export const PERFORMANCE_CWV_CONTENT: readonly ContentBlock[] = [
  {
    type: 'text',
    content: {
      es: 'Core Web Vitals son 3 métricas que Google usa para evaluar la experiencia real del usuario: LCP (velocidad de carga del contenido principal), INP (respuesta a interacciones), y CLS (estabilidad visual). Afectan directamente al SEO.',
      en: 'Core Web Vitals are 3 metrics Google uses to evaluate real user experience: LCP (main content load speed), INP (interaction responsiveness), and CLS (visual stability). They directly affect SEO.',
    },
  },
  {
    type: 'code',
    content: {
      es: `// LCP: optimizar el elemento más grande visible
// 1. Preload de la imagen hero
<link rel="preload" as="image" href="/hero.webp">

// 2. Usar formato moderno con fallback
<picture>
  <source srcset="/hero.avif" type="image/avif">
  <source srcset="/hero.webp" type="image/webp">
  <img src="/hero.jpg" width="1200" height="600"
       fetchpriority="high" alt="Hero">
</picture>

// CLS: reservar espacio para contenido dinámico
// Siempre incluir width y height en imágenes
<img width="300" height="200" ... />

// INP: dividir tareas largas
async function processLargeList(items: Item[]) {
  for (const chunk of splitIntoChunks(items, 50)) {
    processChunk(chunk);
    await scheduler.yield(); // Ceder el hilo al navegador
  }
}`,
      en: `// LCP: optimize the largest visible element
// 1. Preload the hero image
<link rel="preload" as="image" href="/hero.webp">

// 2. Use modern format with fallback
<picture>
  <source srcset="/hero.avif" type="image/avif">
  <source srcset="/hero.webp" type="image/webp">
  <img src="/hero.jpg" width="1200" height="600"
       fetchpriority="high" alt="Hero">
</picture>

// CLS: reserve space for dynamic content
// Always include width and height on images
<img width="300" height="200" ... />

// INP: break long tasks
async function processLargeList(items: Item[]) {
  for (const chunk of splitIntoChunks(items, 50)) {
    processChunk(chunk);
    await scheduler.yield(); // Yield thread to browser
  }
}`,
    },
    language: 'html',
  },
  {
    type: 'tip',
    content: {
      es: 'Mide siempre con datos reales (RUM), no solo Lighthouse. PageSpeed Insights muestra los datos del Chrome UX Report (CrUX) que representan usuarios reales en los últimos 28 días.',
      en: 'Always measure with real data (RUM), not just Lighthouse. PageSpeed Insights shows Chrome UX Report (CrUX) data representing real users over the last 28 days.',
    },
  },
  {
    type: 'text',
    content: {
      es: 'Herramientas esenciales para medir rendimiento: 1) PageSpeed Insights (pagespeed.web.dev) — datos reales + laboratorio. 2) Chrome DevTools → Performance tab — para profiling local. 3) web-vitals library — mide CWV en tu propia app con código. 4) Lighthouse CI — automatiza mediciones en cada deploy.',
      en: 'Essential tools for measuring performance: 1) PageSpeed Insights (pagespeed.web.dev) — real + lab data. 2) Chrome DevTools → Performance tab — for local profiling. 3) web-vitals library — measure CWV in your own app with code. 4) Lighthouse CI — automate measurements on each deploy.',
    },
  },
  {
    type: 'code',
    content: {
      es: `// Medir Core Web Vitals en tu app con la librería web-vitals
import { onLCP, onINP, onCLS } from 'web-vitals';

// Enviar métricas a tu analytics
function sendToAnalytics(metric) {
  console.log(metric.name, metric.value);
  // Enviar a Google Analytics, Datadog, etc.
  navigator.sendBeacon('/api/vitals', JSON.stringify({
    name: metric.name,
    value: metric.value,
    rating: metric.rating, // 'good' | 'needs-improvement' | 'poor'
    url: window.location.href,
  }));
}

onLCP(sendToAnalytics);  // Largest Contentful Paint
onINP(sendToAnalytics);  // Interaction to Next Paint
onCLS(sendToAnalytics);  // Cumulative Layout Shift`,
      en: `// Measure Core Web Vitals in your app with web-vitals library
import { onLCP, onINP, onCLS } from 'web-vitals';

// Send metrics to your analytics
function sendToAnalytics(metric) {
  console.log(metric.name, metric.value);
  // Send to Google Analytics, Datadog, etc.
  navigator.sendBeacon('/api/vitals', JSON.stringify({
    name: metric.name,
    value: metric.value,
    rating: metric.rating, // 'good' | 'needs-improvement' | 'poor'
    url: window.location.href,
  }));
}

onLCP(sendToAnalytics);  // Largest Contentful Paint
onINP(sendToAnalytics);  // Interaction to Next Paint
onCLS(sendToAnalytics);  // Cumulative Layout Shift`,
    },
    language: 'typescript',
  },
];
