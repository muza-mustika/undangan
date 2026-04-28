export type InvitationType = 'wedding' | 'birthday' | 'meeting' | 'hajatan' | 'seminar' | 'graduation' | 'corporate' | 'custom';

export interface InvitationData {
  id: string;
  type: InvitationType;
  title: string;
  subtitle?: string;
  hostName: string;
  hostTitle?: string;
  eventDate: string;
  eventTime: string;
  endTime?: string;
  venue: string;
  venueAddress: string;
  mapLink?: string;
  coverImage: string;
  galleryImages: string[];
  description: string;
  agenda?: string[];
  dressCode?: string;
  rsvpRequired: boolean;
  rsvpDeadline?: string;
  contactInfo: {
    phone: string;
    email?: string;
    website?: string;
  };
  socialLinks?: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
    linkedin?: string;
  };
  paymentInfo?: {
    bankName?: string;
    accountNumber?: string;
    accountName?: string;
    digitalWallet?: {
      provider: string;
      number: string;
      accountName: string;
    };
  };
  theme: string;
  customFields?: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

export interface Theme {
  id: string;
  name: string;
  category: 'classic' | 'modern' | 'minimalist' | 'festive' | 'corporate';
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  textColor: string;
  accentColor: string;
  fontFamily: string;
  preview: string;
  suitableFor: InvitationType[];
}

export interface InvitationTemplate {
  id: string;
  name: string;
  type: InvitationType;
  description: string;
  thumbnail: string;
  sections: TemplateSection[];
  theme: string;
  customizable: boolean;
}

export interface TemplateSection {
  id: string;
  type: 'cover' | 'title' | 'details' | 'gallery' | 'rsvp' | 'contact' | 'payment' | 'custom';
  required: boolean;
  customizable: boolean;
  defaultContent?: any;
}
