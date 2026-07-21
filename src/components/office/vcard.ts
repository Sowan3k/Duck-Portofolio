import { profile } from '../../content/profile';

/**
 * vcard.ts - "take a card": a vCard built from profile.ts (name, headline,
 * email, GitHub, LinkedIn). No phone number, ever (CV decision, law 4-adjacent).
 */
export function buildVCard(): string {
  const email = profile.contact.find((c) => c.kind === 'email')?.label ?? '';
  const github = profile.contact.find((c) => c.kind === 'github')?.href ?? '';
  const linkedin = profile.contact.find((c) => c.kind === 'linkedin')?.href ?? '';

  return [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `FN:${profile.name}`,
    `TITLE:${profile.headline}`,
    email ? `EMAIL;TYPE=INTERNET:${email}` : '',
    github ? `URL:${github}` : '',
    linkedin ? `URL:${linkedin}` : '',
    'END:VCARD',
    '',
  ]
    .filter(Boolean)
    .join('\r\n');
}

/** Trigger a client-side download of the vCard. */
export function downloadVCard(): void {
  const blob = new Blob([buildVCard()], { type: 'text/vcard' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'noor-mohammad-sowan.vcf';
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
