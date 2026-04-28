import React, { useState, useEffect } from 'react';
import { InvitationTemplate, InvitationData } from '../data/invitation-templates';

// Manual design mapping for now (more reliable than glob)
const templateMap: Record<string, () => Promise<any>> = {
  'design-1': () => import('../designs/pernikahan/design-1'),
  'design-1-simple': () => import('../designs/pernikahan/design-1-simple'),
  'design-2': () => import('../designs/pernikahan/design-2'),
};

// Dynamic template loader
export class TemplateLoader {
  private static templateCache = new Map<string, React.ComponentType<{ data: InvitationData }>>();

  static async loadTemplate(templateId: string): Promise<React.ComponentType<{ data: InvitationData }> | null> {
    try {
      const loader = templateMap[templateId];
      
      if (!loader) {
        console.warn(`Template ${templateId} not found. Available: ${Object.keys(templateMap).join(', ')}`);
        return null;
      }

      const component = await loader();
      
      console.log(`Loaded component for ${templateId}:`, component, typeof component);

      if (component && typeof component === 'function') {
        return component;
      }
      
      console.error(`Invalid component for ${templateId}:`, component);
      return null;
    } catch (error) {
      console.error(`Error loading template ${templateId}:`, error);
      return null;
    }
  }

  // Auto-discover templates in specific directories
  static async discoverTemplates(): Promise<string[]> {
    return Object.keys(templateMap);
  }

  // Clear cache (useful for development)
  static clearCache(): void {
    this.templateCache.clear();
  }

  // Preload templates for better performance
  static async preloadTemplates(templateIds: string[]): Promise<void> {
    const loadPromises = templateIds.map(id => this.loadTemplate(id));
    await Promise.allSettled(loadPromises);
  }
}

// Template factory for creating new template instances
export class TemplateFactoryClass {
  static async createTemplate(templateId: string, data: InvitationData): Promise<React.ReactElement | null> {
    const Component = await TemplateLoader.loadTemplate(templateId);
    
    if (!Component) {
      return null;
    }

    return React.createElement(Component, { data });
  }

  // Clone template with new data
  static async cloneTemplate(templateId: string, newData: Partial<InvitationData>): Promise<React.ReactElement | null> {
    // Get default data for the template
    const { getTemplateById } = await import('../data/invitation-templates');
    const template = getTemplateById(templateId);
    
    if (!template) {
      return null;
    }

    // Merge default data with new data
    const mergedData = { ...template.defaultData, ...newData };
    
    return this.createTemplate(templateId, mergedData);
  }
}

// React component wrapper for TemplateFactory
export function TemplateFactory({ templateId, data }: { templateId: string; data: InvitationData }) {
  const [Component, setComponent] = useState<React.ComponentType<{ data: InvitationData }> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    TemplateLoader.loadTemplate(templateId).then(comp => {
      if (!comp) {
        setError(`Template ${templateId} not found`);
      }
      setComponent(comp);
      setLoading(false);
    }).catch(err => {
      console.error('Error loading template:', err);
      setError('Failed to load template');
      setLoading(false);
    });
  }, [templateId]);

  if (loading) {
    return React.createElement('div', null, 'Loading template...');
  }

  if (error) {
    return React.createElement('div', null, error);
  }

  if (!Component) {
    return React.createElement('div', null, 'Template not found');
  }

  // Ensure data is not null before passing
  const safeData = data || {
    brideName: '',
    groomName: '',
    groomTitlesBefore: [],
    groomTitlesAfter: [],
    brideTitlesBefore: [],
    brideTitlesAfter: [],
    brideParents: '',
    groomParents: '',
    weddingDate: '',
    weddingDay: '',
    akadTime: '',
    akadLocation: '',
    resepsiTime: '',
    resepsiLocation: '',
    quote: '',
    quoteSource: ''
  };

  try {
    return React.createElement(Component, { data: safeData });
  } catch (err) {
    console.error('Error rendering template:', err);
    return React.createElement('div', null, 'Error rendering template');
  }
}

// Template utilities
export const TemplateUtils = {
  // Export template data as JSON
  exportTemplateData(templateId: string, data: InvitationData): string {
    return JSON.stringify({
      templateId,
      data,
      exportedAt: new Date().toISOString()
    }, null, 2);
  },

  // Import template data from JSON
  importTemplateData(jsonString: string): { templateId: string; data: InvitationData } | null {
    try {
      const parsed = JSON.parse(jsonString);
      return {
        templateId: parsed.templateId,
        data: parsed.data
      };
    } catch (error) {
      console.error('Error importing template data:', error);
      return null;
    }
  },

  // Validate template data
  validateTemplateData(data: any): data is InvitationData {
    const requiredFields = [
      'brideName', 'groomName', 'brideParents', 'groomParents',
      'weddingDate', 'weddingDay', 'akadTime', 'akadLocation',
      'resepsiTime', 'resepsiLocation', 'quote', 'quoteSource'
    ];

    return requiredFields.every(field => field in data && typeof data[field] === 'string');
  },

  // Generate template preview URL
  getPreviewUrl(templateId: string): string {
    return `/templates/previews/${templateId}.jpg`;
  },

  // Get template file path
  getTemplatePath(templateId: string, category: string): string {
    return `../designs/${category}/${templateId}`;
  }
};
