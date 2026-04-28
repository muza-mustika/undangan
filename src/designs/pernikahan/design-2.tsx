import React, { useEffect, useRef } from 'react';

interface Template2Props {
  data?: {
    brideName: string;
    groomName: string;
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
  };
}

export default function Template2(props: any) {
  // Handle null props case
  if (!props || !props.data) {
    return <div>Loading...</div>;
  }

  const { data } = props;
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize animations or other effects
    if (containerRef.current) {
      // Add entrance animations
      const elements = containerRef.current.querySelectorAll('.animate-fade-in');
      elements.forEach((el, index) => {
        setTimeout(() => {
          el.classList.add('opacity-100');
          el.classList.remove('opacity-0');
        }, index * 200);
      });
    }
  }, [data]);

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* CSS Styles */}
      <style>{`
        .animate-fade-in {
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.6s ease-out;
        }
        .animate-fade-in.opacity-100 {
          opacity: 1;
          transform: translateY(0);
        }
        .text-shadow {
          text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
        }
        .card-shadow {
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }
      `}</style>

      {/* Header */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
          <div className="absolute top-40 right-20 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute -bottom-8 left-40 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" style={{ animationDelay: '4s' }}></div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-4 animate-fade-in">
          <div className="mb-8">
            <h1 className="text-6xl md:text-8xl font-bold text-blue-900 mb-4 text-shadow">
              {data.groomName}
            </h1>
            <div className="text-3xl md:text-4xl text-indigo-600 mb-4 text-shadow">&</div>
            <h1 className="text-6xl md:text-8xl font-bold text-blue-900 mb-8 text-shadow">
              {data.brideName}
            </h1>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 max-w-md mx-auto card-shadow">
            <p className="text-lg text-gray-700 mb-2">Kami mengundang Anda untuk merayakan</p>
            <p className="text-2xl font-semibold text-blue-800 mb-4">Pernikahan Kami</p>
            <div className="w-16 h-1 bg-gradient-to-r from-blue-400 to-indigo-400 mx-auto mb-4"></div>
            <p className="text-gray-600">{data.weddingDay}, {data.weddingDate}</p>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-blue-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-blue-400 rounded-full mt-2"></div>
          </div>
        </div>
      </div>

      {/* Quote Section */}
      <div className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Kutipan Cinta</h2>
          <div className="relative">
            <div className="text-6xl text-blue-200 absolute -top-4 -left-4">"</div>
            <p className="text-xl md:text-2xl text-gray-700 italic mb-4 relative z-10 px-8">
              {data.quote}
            </p>
            <div className="text-6xl text-blue-200 absolute -bottom-4 -right-4">"</div>
          </div>
          <p className="text-lg text-indigo-600 mt-4">— {data.quoteSource}</p>
        </div>
      </div>

      {/* Couple Section */}
      <div className="py-20 px-4 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-16 animate-fade-in">Mempelai</h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Groom */}
            <div className="text-center animate-fade-in">
              <div className="w-40 h-40 mx-auto mb-6 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-xl">
                {data.groomName.charAt(0)}
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">{data.groomName}</h3>
              <p className="text-gray-600 mb-4">Putra Pertama</p>
              <p className="text-gray-700 whitespace-pre-line">{data.groomParents}</p>
            </div>

            {/* Separator */}
            <div className="flex justify-center items-center animate-fade-in">
              <div className="text-4xl text-indigo-400">&</div>
            </div>

            {/* Bride */}
            <div className="text-center animate-fade-in">
              <div className="w-40 h-40 mx-auto mb-6 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-xl">
                {data.brideName.charAt(0)}
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">{data.brideName}</h3>
              <p className="text-gray-600 mb-4">Putri Kedua</p>
              <p className="text-gray-700 whitespace-pre-line">{data.brideParents}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Event Details */}
      <div className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-16 animate-fade-in">Detail Acara</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Akad */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 card-shadow animate-fade-in">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Akad Nikah</h3>
                <p className="text-lg text-indigo-600 font-semibold mb-2">{data.akadTime}</p>
                <p className="text-gray-700 whitespace-pre-line">{data.akadLocation}</p>
              </div>
            </div>

            {/* Resepsi */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 card-shadow animate-fade-in">
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Resepsi</h3>
                <p className="text-lg text-purple-600 font-semibold mb-2">{data.resepsiTime}</p>
                <p className="text-gray-700 whitespace-pre-line">{data.resepsiLocation}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="py-12 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 animate-fade-in">{data.groomName} & {data.brideName}</h2>
          <p className="text-lg opacity-90 animate-fade-in">Kami yang berbahagia</p>
          <p className="text-md opacity-80 mt-2 animate-fade-in">{data.weddingDay}, {data.weddingDate}</p>
        </div>
      </div>
    </div>
  );
}
