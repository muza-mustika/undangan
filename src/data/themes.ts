import { Theme, InvitationType } from './types';

export const themes: Theme[] = [
  // Classic Themes
  {
    id: 'elegant-rose',
    name: 'Elegant Rose',
    category: 'classic',
    primaryColor: '#f472b6',
    secondaryColor: '#ec4899',
    backgroundColor: '#fdf2f8',
    textColor: '#831843',
    accentColor: '#be185d',
    fontFamily: 'serif',
    preview: 'https://picsum.photos/seed/elegant-rose/400/300.jpg',
    suitableFor: ['wedding', 'hajatan']
  },
  {
    id: 'royal-purple',
    name: 'Royal Purple',
    category: 'classic',
    primaryColor: '#9333ea',
    secondaryColor: '#7c3aed',
    backgroundColor: '#f3f4f6',
    textColor: '#4c1d95',
    accentColor: '#6d28d9',
    fontFamily: 'serif',
    preview: 'https://picsum.photos/seed/royal-purple/400/300.jpg',
    suitableFor: ['wedding', 'hajatan', 'seminar']
  },
  {
    id: 'golden-sunset',
    name: 'Golden Sunset',
    category: 'classic',
    primaryColor: '#f59e0b',
    secondaryColor: '#d97706',
    backgroundColor: '#fef3c7',
    textColor: '#78350f',
    accentColor: '#b45309',
    fontFamily: 'serif',
    preview: 'https://picsum.photos/seed/golden-sunset/400/300.jpg',
    suitableFor: ['wedding', 'hajatan', 'birthday']
  },
  {
    id: 'classic-black',
    name: 'Classic Black',
    category: 'classic',
    primaryColor: '#000000',
    secondaryColor: '#374151',
    backgroundColor: '#f9fafb',
    textColor: '#111827',
    accentColor: '#1f2937',
    fontFamily: 'serif',
    preview: 'https://picsum.photos/seed/classic-black/400/300.jpg',
    suitableFor: ['meeting', 'corporate', 'graduation']
  },

  // Modern Themes
  {
    id: 'ocean-blue',
    name: 'Ocean Blue',
    category: 'modern',
    primaryColor: '#0ea5e9',
    secondaryColor: '#0284c7',
    backgroundColor: '#f0f9ff',
    textColor: '#075985',
    accentColor: '#0c4a6e',
    fontFamily: 'sans-serif',
    preview: 'https://picsum.photos/seed/ocean-blue/400/300.jpg',
    suitableFor: ['meeting', 'corporate', 'seminar', 'birthday']
  },
  {
    id: 'forest-green',
    name: 'Forest Green',
    category: 'modern',
    primaryColor: '#10b981',
    secondaryColor: '#059669',
    backgroundColor: '#f0fdf4',
    textColor: '#064e3b',
    accentColor: '#047857',
    fontFamily: 'sans-serif',
    preview: 'https://picsum.photos/seed/forest-green/400/300.jpg',
    suitableFor: ['meeting', 'seminar', 'hajatan']
  },
  {
    id: 'tech-gray',
    name: 'Tech Gray',
    category: 'modern',
    primaryColor: '#6b7280',
    secondaryColor: '#4b5563',
    backgroundColor: '#f9fafb',
    textColor: '#1f2937',
    accentColor: '#374151',
    fontFamily: 'monospace',
    preview: 'https://picsum.photos/seed/tech-gray/400/300.jpg',
    suitableFor: ['meeting', 'corporate', 'seminar']
  },

  // Minimalist Themes
  {
    id: 'minimal-white',
    name: 'Minimal White',
    category: 'minimalist',
    primaryColor: '#ffffff',
    secondaryColor: '#f3f4f6',
    backgroundColor: '#ffffff',
    textColor: '#111827',
    accentColor: '#9ca3af',
    fontFamily: 'sans-serif',
    preview: 'https://picsum.photos/seed/minimal-white/400/300.jpg',
    suitableFor: ['meeting', 'corporate', 'graduation']
  },
  {
    id: 'clean-beige',
    name: 'Clean Beige',
    category: 'minimalist',
    primaryColor: '#d4d4d8',
    secondaryColor: '#a1a1aa',
    backgroundColor: '#fafaf9',
    textColor: '#18181b',
    accentColor: '#71717a',
    fontFamily: 'sans-serif',
    preview: 'https://picsum.photos/seed/clean-beige/400/300.jpg',
    suitableFor: ['meeting', 'seminar', 'birthday']
  },

  // Festive Themes
  {
    id: 'celebration-red',
    name: 'Celebration Red',
    category: 'festive',
    primaryColor: '#ef4444',
    secondaryColor: '#dc2626',
    backgroundColor: '#fef2f2',
    textColor: '#991b1b',
    accentColor: '#b91c1c',
    fontFamily: 'serif',
    preview: 'https://picsum.photos/seed/celebration-red/400/300.jpg',
    suitableFor: ['birthday', 'hajatan', 'wedding']
  },
  {
    id: 'party-purple',
    name: 'Party Purple',
    category: 'festive',
    primaryColor: '#a855f7',
    secondaryColor: '#9333ea',
    backgroundColor: '#faf5ff',
    textColor: '#6b21a8',
    accentColor: '#7c3aed',
    fontFamily: 'sans-serif',
    preview: 'https://picsum.photos/seed/party-purple/400/300.jpg',
    suitableFor: ['birthday', 'graduation', 'hajatan']
  },

  // Corporate Themes
  {
    id: 'business-blue',
    name: 'Business Blue',
    category: 'corporate',
    primaryColor: '#2563eb',
    secondaryColor: '#1d4ed8',
    backgroundColor: '#eff6ff',
    textColor: '#1e3a8a',
    accentColor: '#1e40af',
    fontFamily: 'sans-serif',
    preview: 'https://picsum.photos/seed/business-blue/400/300.jpg',
    suitableFor: ['meeting', 'corporate', 'seminar']
  },
  {
    id: 'professional-navy',
    name: 'Professional Navy',
    category: 'corporate',
    primaryColor: '#1e3a8a',
    secondaryColor: '#1e40af',
    backgroundColor: '#f8fafc',
    textColor: '#0f172a',
    accentColor: '#334155',
    fontFamily: 'serif',
    preview: 'https://picsum.photos/seed/professional-navy/400/300.jpg',
    suitableFor: ['meeting', 'corporate', 'graduation']
  }
];

export const getThemesByCategory = (category: string): Theme[] => {
  return themes.filter(theme => theme.category === category);
};

export const getThemesForType = (type: InvitationType): Theme[] => {
  return themes.filter(theme => theme.suitableFor.includes(type));
};

export const getThemeById = (id: string): Theme | undefined => {
  return themes.find(theme => theme.id === id);
};
