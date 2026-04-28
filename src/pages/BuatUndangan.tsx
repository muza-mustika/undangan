import React, { useState, useEffect } from 'react';
import { Plus, ArrowLeft, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { invitationTemplates } from '../data/invitation-templates';

const BuatUndangan: React.FC = () => {
  const navigate = useNavigate();
  const [cardHeight, setCardHeight] = useState(0);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  useEffect(() => {
    const calculateCardHeight = () => {
      const windowHeight = window.innerHeight;
      const padding = 32; // Top and bottom padding
      const gap = 12; // Gap between rows
      const availableHeight = windowHeight - padding - gap;
      const cardHeight = (availableHeight / 2); // 2 rows
      setCardHeight(cardHeight);
    };

    calculateCardHeight();
    window.addEventListener('resize', calculateCardHeight);
    return () => window.removeEventListener('resize', calculateCardHeight);
  }, []);

  const handleUseTemplate = async (templateId: string) => {
    try {
      const template = invitationTemplates.find(t => t.id === templateId);
      if (!template) return;

      navigate(`/undangan/${template.category}/create`, { 
        state: { 
          templateId: template.id,
          defaultData: template.defaultData 
        } 
      });
    } catch (error) {
      console.error('Error using template:', error);
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'pernikahan': 'bg-pink-500',
      'khitanan': 'bg-green-500',
      'ulang-tahun': 'bg-purple-500',
      'custom': 'bg-orange-500'
    };
    return colors[category] || 'bg-gray-500';
  };

  const getCategoryLabel = (category: string) => {
    const labels: { [key: string]: string } = {
      'pernikahan': 'Pernikahan',
      'khitanan': 'Khitanan',
      'ulang-tahun': 'Ulang Tahun',
      'custom': 'Custom'
    };
    return labels[category] || category;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Gallery Grid */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 md:gap-4 lg:gap-6">
          {invitationTemplates.map((template) => (
            <div
              key={template.id}
              className="group relative"
              onClick={() => setSelectedTemplate(template.id)}
            >
              {/* Card */}
              <div 
                className="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
                style={{ 
                  height: cardHeight > 0 ? `${cardHeight}px` : 'auto',
                  aspectRatio: cardHeight > 0 ? 'auto' : '1/1'
                }}
              >
                {/* Category Badge */}
                <div className="absolute top-3 right-3 z-20">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium text-white bg-black/50 backdrop-blur-sm">
                    {getCategoryLabel(template.category)}
                  </span>
                </div>

                {/* Preview - Iframe */}
                <div className="absolute inset-0">
                  <iframe
                    src={`/preview/${template.category}/${template.id}`}
                    className="w-full h-full border-0"
                    style={{ 
                      transform: 'scale(0.3)',
                      transformOrigin: 'top left',
                      width: '333%',
                      height: '333%',
                      pointerEvents: 'none'
                    }}
                    loading="lazy"
                    title={template.name}
                  />
                </div>

                {/* Title Overlay - Bottom */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 z-10">
                  <h3 className="font-medium text-white text-sm line-clamp-2 pr-10">{template.id}</h3>
                </div>

                {/* Buat Button - Icon Only */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleUseTemplate(template.id);
                  }}
                  className="absolute bottom-3 right-3 bg-white text-gray-900 w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors shadow-lg z-10"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Full Screen Preview Modal */}
      {selectedTemplate && (
        <div className="fixed inset-0 bg-black/90 z-[100] flex flex-col">
          {/* Header */}
          <div className="absolute top-0 left-0 right-0 z-20 p-4 flex items-center justify-between">
            <button
              onClick={() => setSelectedTemplate(null)}
              className="bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-lg font-medium text-white bg-black/50 backdrop-blur-sm">
              {getCategoryLabel(invitationTemplates.find(t => t.id === selectedTemplate)?.category || '')}
            </span>
          </div>

          {/* Preview Iframe */}
          <div className="flex-1">
            <iframe
              src={`/preview/${invitationTemplates.find(t => t.id === selectedTemplate)?.category}/${selectedTemplate}`}
              className="w-full h-full border-0"
              title="Preview"
            />
          </div>

          {/* Bottom Overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 z-20">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center justify-between">
                <div className="flex-1 pr-4">
                  <h3 className="font-medium text-white text-lg line-clamp-2">
                    {selectedTemplate}
                  </h3>
                </div>
                <button
                  onClick={() => {
                    handleUseTemplate(selectedTemplate);
                    setSelectedTemplate(null);
                  }}
                  className="bg-white text-gray-900 px-6 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors flex items-center gap-2 shadow-lg"
                >
                  <Plus className="w-5 h-5" />
                  Buat
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BuatUndangan;
