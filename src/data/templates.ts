import { InvitationTemplate, InvitationType } from './types';

export const invitationTemplates: InvitationTemplate[] = [
  // Wedding Templates
  {
    id: 'wedding-elegant',
    name: 'Elegant Wedding',
    type: 'wedding',
    description: 'Template pernikahan yang elegan dan romantis',
    thumbnail: 'https://picsum.photos/seed/wedding-elegant/400/300.jpg',
    sections: [
      { id: 'cover', type: 'cover', required: true, customizable: true },
      { id: 'title', type: 'title', required: true, customizable: true },
      { id: 'details', type: 'details', required: true, customizable: true },
      { id: 'gallery', type: 'gallery', required: false, customizable: true },
      { id: 'rsvp', type: 'rsvp', required: true, customizable: true },
      { id: 'payment', type: 'payment', required: false, customizable: true }
    ],
    theme: 'elegant-rose',
    customizable: true
  },
  {
    id: 'wedding-modern',
    name: 'Modern Wedding',
    type: 'wedding',
    description: 'Template pernikahan modern dan minimalis',
    thumbnail: 'https://picsum.photos/seed/wedding-modern/400/300.jpg',
    sections: [
      { id: 'cover', type: 'cover', required: true, customizable: true },
      { id: 'title', type: 'title', required: true, customizable: true },
      { id: 'details', type: 'details', required: true, customizable: true },
      { id: 'gallery', type: 'gallery', required: false, customizable: true },
      { id: 'rsvp', type: 'rsvp', required: true, customizable: true }
    ],
    theme: 'ocean-blue',
    customizable: true
  },

  // Birthday Templates
  {
    id: 'birthday-kids',
    name: 'Kids Birthday Party',
    type: 'birthday',
    description: 'Template ulang tahun anak yang ceria dan warna-warni',
    thumbnail: 'https://picsum.photos/seed/birthday-kids/400/300.jpg',
    sections: [
      { id: 'cover', type: 'cover', required: true, customizable: true },
      { id: 'title', type: 'title', required: true, customizable: true },
      { id: 'details', type: 'details', required: true, customizable: true },
      { id: 'gallery', type: 'gallery', required: false, customizable: true },
      { id: 'rsvp', type: 'rsvp', required: true, customizable: true }
    ],
    theme: 'golden-sunset',
    customizable: true
  },
  {
    id: 'birthday-adult',
    name: 'Adult Birthday',
    type: 'birthday',
    description: 'Template ulang tahun dewasa yang elegan',
    thumbnail: 'https://picsum.photos/seed/birthday-adult/400/300.jpg',
    sections: [
      { id: 'cover', type: 'cover', required: true, customizable: true },
      { id: 'title', type: 'title', required: true, customizable: true },
      { id: 'details', type: 'details', required: true, customizable: true },
      { id: 'rsvp', type: 'rsvp', required: true, customizable: true }
    ],
    theme: 'classic-black',
    customizable: true
  },

  // Meeting Templates
  {
    id: 'meeting-corporate',
    name: 'Corporate Meeting',
    type: 'meeting',
    description: 'Template rapat korporat yang profesional',
    thumbnail: 'https://picsum.photos/seed/meeting-corporate/400/300.jpg',
    sections: [
      { id: 'cover', type: 'cover', required: true, customizable: true },
      { id: 'title', type: 'title', required: true, customizable: true },
      { id: 'details', type: 'details', required: true, customizable: true },
      { id: 'agenda', type: 'custom', required: true, customizable: true },
      { id: 'contact', type: 'contact', required: true, customizable: true }
    ],
    theme: 'ocean-blue',
    customizable: true
  },
  {
    id: 'meeting-casual',
    name: 'Casual Meeting',
    type: 'meeting',
    description: 'Template rapat informal yang modern',
    thumbnail: 'https://picsum.photos/seed/meeting-casual/400/300.jpg',
    sections: [
      { id: 'cover', type: 'cover', required: true, customizable: true },
      { id: 'title', type: 'title', required: true, customizable: true },
      { id: 'details', type: 'details', required: true, customizable: true },
      { id: 'contact', type: 'contact', required: true, customizable: true }
    ],
    theme: 'forest-green',
    customizable: true
  },

  // Hajatan Templates
  {
    id: 'hajatan-traditional',
    name: 'Hajatan Traditional',
    type: 'hajatan',
    description: 'Template hajatan tradisional Indonesia',
    thumbnail: 'https://picsum.photos/seed/hajatan-traditional/400/300.jpg',
    sections: [
      { id: 'cover', type: 'cover', required: true, customizable: true },
      { id: 'title', type: 'title', required: true, customizable: true },
      { id: 'details', type: 'details', required: true, customizable: true },
      { id: 'gallery', type: 'gallery', required: false, customizable: true },
      { id: 'rsvp', type: 'rsvp', required: true, customizable: true }
    ],
    theme: 'golden-sunset',
    customizable: true
  },

  // Seminar Templates
  {
    id: 'seminar-professional',
    name: 'Professional Seminar',
    type: 'seminar',
    description: 'Template seminar yang profesional dan informatif',
    thumbnail: 'https://picsum.photos/seed/seminar-professional/400/300.jpg',
    sections: [
      { id: 'cover', type: 'cover', required: true, customizable: true },
      { id: 'title', type: 'title', required: true, customizable: true },
      { id: 'details', type: 'details', required: true, customizable: true },
      { id: 'agenda', type: 'custom', required: true, customizable: true },
      { id: 'contact', type: 'contact', required: true, customizable: true },
      { id: 'rsvp', type: 'rsvp', required: true, customizable: true }
    ],
    theme: 'royal-purple',
    customizable: true
  },

  // Graduation Templates
  {
    id: 'graduation-formal',
    name: 'Formal Graduation',
    type: 'graduation',
    description: 'Template wisuda yang formal dan elegan',
    thumbnail: 'https://picsum.photos/seed/graduation-formal/400/300.jpg',
    sections: [
      { id: 'cover', type: 'cover', required: true, customizable: true },
      { id: 'title', type: 'title', required: true, customizable: true },
      { id: 'details', type: 'details', required: true, customizable: true },
      { id: 'gallery', type: 'gallery', required: false, customizable: true },
      { id: 'rsvp', type: 'rsvp', required: true, customizable: true }
    ],
    theme: 'classic-black',
    customizable: true
  },

  // Corporate Templates
  {
    id: 'corporate-launch',
    name: 'Product Launch',
    type: 'corporate',
    description: 'Template peluncuran produk korporat',
    thumbnail: 'https://picsum.photos/seed/corporate-launch/400/300.jpg',
    sections: [
      { id: 'cover', type: 'cover', required: true, customizable: true },
      { id: 'title', type: 'title', required: true, customizable: true },
      { id: 'details', type: 'details', required: true, customizable: true },
      { id: 'agenda', type: 'custom', required: true, customizable: true },
      { id: 'contact', type: 'contact', required: true, customizable: true },
      { id: 'rsvp', type: 'rsvp', required: true, customizable: true }
    ],
    theme: 'ocean-blue',
    customizable: true
  },

  // Custom Template
  {
    id: 'custom-flexible',
    name: 'Custom Design',
    type: 'custom',
    description: 'Template yang sepenuhnya dapat dikustomisasi',
    thumbnail: 'https://picsum.photos/seed/custom-flexible/400/300.jpg',
    sections: [
      { id: 'cover', type: 'cover', required: false, customizable: true },
      { id: 'title', type: 'title', required: false, customizable: true },
      { id: 'details', type: 'details', required: false, customizable: true },
      { id: 'gallery', type: 'gallery', required: false, customizable: true },
      { id: 'rsvp', type: 'rsvp', required: false, customizable: true },
      { id: 'contact', type: 'contact', required: false, customizable: true },
      { id: 'payment', type: 'payment', required: false, customizable: true },
      { id: 'custom', type: 'custom', required: false, customizable: true }
    ],
    theme: 'classic-black',
    customizable: true
  }
];

export const getTemplatesByType = (type: InvitationType): InvitationTemplate[] => {
  return invitationTemplates.filter(template => template.type === type);
};

export const getTemplateById = (id: string): InvitationTemplate | undefined => {
  return invitationTemplates.find(template => template.id === id);
};
