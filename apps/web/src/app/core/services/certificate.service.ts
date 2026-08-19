import { inject, Injectable } from '@angular/core';
import { jsPDF } from 'jspdf';

import { LanguageService } from '../i18n/language.service';
import { AuthStore } from '../../features/auth/services/auth.store';

export interface CertificateData {
  readonly moduleName: string;
  readonly frameworkName: string;
  readonly completedAt: string;
  readonly score?: number;
}

const COPY = {
  es: {
    title: 'CERTIFICADO DE FINALIZACIÓN',
    subtitle: 'Frontend Senior Lab',
    body: 'Certifica que',
    completed: 'ha completado exitosamente el módulo',
    framework: 'Framework',
    date: 'Fecha de finalización',
    footer: 'Este certificado valida el conocimiento adquirido a través de evaluaciones prácticas.',
    downloadName: 'certificado',
  },
  en: {
    title: 'CERTIFICATE OF COMPLETION',
    subtitle: 'Frontend Senior Lab',
    body: 'This certifies that',
    completed: 'has successfully completed the module',
    framework: 'Framework',
    date: 'Completion date',
    footer: 'This certificate validates knowledge acquired through practical assessments.',
    downloadName: 'certificate',
  },
} as const;

/**
 * Service that generates PDF certificates when a user completes a learning module.
 * Uses jsPDF to create a professional-looking certificate downloadable as PDF.
 */
@Injectable({
  providedIn: 'root',
})
export class CertificateService {
  private readonly languageService = inject(LanguageService);
  private readonly authStore = inject(AuthStore);

  /**
   * Generate and download a certificate PDF for a completed module.
   */
  generateCertificate(data: CertificateData): void {
    const lang = this.languageService.language();
    const copy = COPY[lang];
    const userName = this.authStore.user()?.name ?? 'User';

    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4',
    });

    const width = pdf.internal.pageSize.getWidth();
    const height = pdf.internal.pageSize.getHeight();

    // Background
    pdf.setFillColor(2, 6, 23); // slate-950
    pdf.rect(0, 0, width, height, 'F');

    // Border
    pdf.setDrawColor(34, 211, 238); // cyan-400
    pdf.setLineWidth(1);
    pdf.rect(10, 10, width - 20, height - 20);

    // Inner border
    pdf.setDrawColor(34, 211, 238, 0.3);
    pdf.setLineWidth(0.3);
    pdf.rect(15, 15, width - 30, height - 30);

    // Logo text
    pdf.setTextColor(34, 211, 238);
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.text('</>', width / 2, 35, { align: 'center' });

    // Subtitle
    pdf.setTextColor(148, 163, 184); // slate-400
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    pdf.text(copy.subtitle, width / 2, 42, { align: 'center' });

    // Title
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(24);
    pdf.setFont('helvetica', 'bold');
    pdf.text(copy.title, width / 2, 60, { align: 'center' });

    // Decorative line
    pdf.setDrawColor(34, 211, 238);
    pdf.setLineWidth(0.5);
    pdf.line(width / 2 - 40, 66, width / 2 + 40, 66);

    // "This certifies that"
    pdf.setTextColor(148, 163, 184);
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'normal');
    pdf.text(copy.body, width / 2, 82, { align: 'center' });

    // User name
    pdf.setTextColor(34, 211, 238);
    pdf.setFontSize(22);
    pdf.setFont('helvetica', 'bold');
    pdf.text(userName, width / 2, 95, { align: 'center' });

    // "has completed"
    pdf.setTextColor(148, 163, 184);
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'normal');
    pdf.text(copy.completed, width / 2, 108, { align: 'center' });

    // Module name
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.text(data.moduleName, width / 2, 120, { align: 'center' });

    // Framework
    pdf.setTextColor(148, 163, 184);
    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'normal');
    pdf.text(`${copy.framework}: ${data.frameworkName}`, width / 2, 132, { align: 'center' });

    // Date
    const formattedDate = this.formatDate(data.completedAt, lang);
    pdf.text(`${copy.date}: ${formattedDate}`, width / 2, 142, { align: 'center' });

    // Footer
    pdf.setTextColor(100, 116, 139); // slate-500
    pdf.setFontSize(8);
    pdf.text(copy.footer, width / 2, height - 25, { align: 'center' });

    // URL
    pdf.setTextColor(34, 211, 238);
    pdf.setFontSize(8);
    pdf.text('frontend-senior-lab.vercel.app', width / 2, height - 18, { align: 'center' });

    // Download
    const fileName = `${copy.downloadName}-${data.moduleName.toLowerCase().replace(/\s+/g, '-')}.pdf`;
    pdf.save(fileName);
  }

  private formatDate(isoDate: string, lang: string): string {
    try {
      return new Date(isoDate).toLocaleDateString(
        lang === 'es' ? 'es-MX' : 'en-US',
        { year: 'numeric', month: 'long', day: 'numeric' },
      );
    } catch {
      return isoDate;
    }
  }
}
