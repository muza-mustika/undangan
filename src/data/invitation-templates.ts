export interface InvitationData {
  groomName: string;
  groomTitlesBefore: string[];
  groomTitlesAfter: string[];
  brideName: string;
  brideTitlesBefore: string[];
  brideTitlesAfter: string[];
  brideParents: string;
  groomParents: string;
  weddingDate: string;
  weddingDay: string;
  akadTime: string;
  akadLocation: string;
  resepsiTime: string;
  resepsiLocation: string;
  quote: string;
  quoteSource: string;
}

export interface InvitationTemplate {
  id: string;
  name: string;
  description: string;
  category: 'pernikahan' | 'khitanan' | 'ulang-tahun' | 'custom';
  preview: string;
  component: React.ComponentType<{ data: InvitationData }>;
  defaultData: InvitationData;
}

export const invitationTemplates: InvitationTemplate[] = [
  {
    id: 'template-1',
    name: 'Elegant Gold (Original)',
    description: 'Template pernikahan elegan dengan tema emas dan animasi yang menarik',
    category: 'pernikahan',
    preview: '/templates/previews/template-1.jpg',
    component: null, // Will be loaded dynamically
    defaultData: {
      groomName: 'Arjuna',
      groomTitlesBefore: [],
      groomTitlesAfter: [],
      brideName: 'Dewi',
      brideTitlesBefore: [],
      brideTitlesAfter: [],
      brideParents: 'Bapak Hendra Wijaya\n& Ibu Sri Mulyani',
      groomParents: 'Bapak Budi Santoso\n& Ibu Ratna Sari',
      weddingDate: '12 Juli 2025',
      weddingDay: 'Sabtu',
      akadTime: '08.00 — 10.00 WIB',
      akadLocation: 'Masjid Al-Ikhlas\nJl. Melati No. 12, Jakarta Selatan',
      resepsiTime: '11.00 — 21.00 WIB',
      resepsiLocation: 'Ballroom Grand Palace\nJl. Jend. Sudirman Kav. 5, Jakarta',
      quote: 'Dan Dia menciptakan pasangan untukmu dari jenismu sendiri, agar kamu merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang.',
      quoteSource: 'QS. AR-RUM : 21'
    }
  },
  {
    id: 'template-1-simple',
    name: 'Elegant Gold (Simple)',
    description: 'Template pernikahan elegan dengan tema emas yang ringan dan pasti berfungsi',
    category: 'pernikahan',
    preview: '/templates/previews/template-1-simple.jpg',
    component: null, // Will be loaded dynamically
    defaultData: {
      groomName: 'Arjuna',
      groomTitlesBefore: [],
      groomTitlesAfter: [],
      brideName: 'Dewi',
      brideTitlesBefore: [],
      brideTitlesAfter: [],
      brideParents: 'Bapak Hendra Wijaya\n& Ibu Sri Mulyani',
      groomParents: 'Bapak Budi Santoso\n& Ibu Ratna Sari',
      weddingDate: '12 Juli 2025',
      weddingDay: 'Sabtu',
      akadTime: '08.00 — 10.00 WIB',
      akadLocation: 'Masjid Al-Ikhlas\nJl. Melati No. 12, Jakarta Selatan',
      resepsiTime: '11.00 — 21.00 WIB',
      resepsiLocation: 'Ballroom Grand Palace\nJl. Jend. Sudirman Kav. 5, Jakarta',
      quote: 'Dan Dia menciptakan pasangan untukmu dari jenismu sendiri, agar kamu merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang.',
      quoteSource: 'QS. AR-RUM : 21'
    }
  },
  {
    id: 'template-2',
    name: 'Modern Blue',
    description: 'Template modern dengan tema biru dan desain gradient yang menarik',
    category: 'pernikahan',
    preview: '/templates/previews/template-2.jpg',
    component: null, // Will be loaded dynamically
    defaultData: {
      groomName: 'Budi',
      groomTitlesBefore: [],
      groomTitlesAfter: [],
      brideName: 'Siti',
      brideTitlesBefore: [],
      brideTitlesAfter: [],
      brideParents: 'Bapak Ahmad Hidayat\n& Ibu Nurhasanah',
      groomParents: 'Bapak Eko Prasetyo\n& Ibu Dewi Lestari',
      weddingDate: '15 Agustus 2025',
      weddingDay: 'Jumat',
      akadTime: '09.00 — 11.00 WIB',
      akadLocation: 'Masjid Al-Hikmah\nJl. Sudirman No. 45, Jakarta Pusat',
      resepsiTime: '13.00 — 20.00 WIB',
      resepsiLocation: 'Hotel Grand Indonesia\nJl. MH Thamrin No. 1, Jakarta',
      quote: 'Cinta bukanlah saling menatap mata satu sama lain, tetapi bersama-sama melihat ke arah yang sama.',
      quoteSource: 'Antoine de Saint-Exupéry'
    }
  }
];

export const getTemplateById = (id: string): InvitationTemplate | undefined => {
  return invitationTemplates.find(template => template.id === id);
};

export const getTemplatesByCategory = (category: string): InvitationTemplate[] => {
  return invitationTemplates.filter(template => template.category === category);
};
