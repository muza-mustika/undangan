import React, { useState } from 'react';
import { Palette, Calendar, MapPin, Users, Clock, Save, Eye, Settings, Sparkles } from 'lucide-react';

const UndanganCustom: React.FC = () => {
  const [formData, setFormData] = useState({
    judulAcara: '',
    deskripsiAcara: '',
    tanggalAcara: '',
    waktuAcara: '',
    tempatAcara: '',
    alamatMaps: '',
    galeriFoto: [] as string[],
    kataKata: '',
    kontak: '',
    temaWarna: '#5085B1',
    temaFont: 'modern'
  });

  const [previewMode, setPreviewMode] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    // TODO: Implement save logic
    console.log('Saving custom invitation:', formData);
  };

  const handlePreview = () => {
    setPreviewMode(!previewMode);
  };

  if (previewMode) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
        {/* Preview Template */}
        <div className="container mx-auto px-4 py-8">
          <div className="bg-white rounded-2xl shadow-xl max-w-4xl mx-auto overflow-hidden">
            {/* Header Preview */}
            <div 
              className="text-white p-8 text-center"
              style={{ backgroundColor: formData.temaWarna }}
            >
              <div className="mb-4">
                <Sparkles className="w-16 h-16 mx-auto text-white animate-pulse" />
              </div>
              <h1 className="text-4xl font-bold mb-2">
                {formData.judulAcara || 'Judul Acara'}
              </h1>
              <p className="text-lg opacity-90">
                {formData.deskripsiAcara || 'Deskripsi acara'}
              </p>
            </div>

            {/* Content Preview */}
            <div className="p-8">
              <div className="text-center mb-8">
                <p className="text-gray-700 mb-6 text-lg">
                  {formData.kataKata || 'Kami mengundang Anda untuk hadir dalam acara spesial kami'}
                </p>
              </div>

              <div className="text-center p-6 rounded-lg mb-8" style={{ backgroundColor: `${formData.temaWarna}10` }}>
                <Calendar className="w-8 h-8 mx-auto mb-2" style={{ color: formData.temaWarna }} />
                <h3 className="font-semibold text-gray-800 mb-2">Detail Acara</h3>
                <p className="text-gray-700 mb-2">
                  {formData.tanggalAcara || 'Hari, Tanggal Bulan Tahun'}
                </p>
                <p className="text-gray-700 mb-2">
                  {formData.waktuAcara || '00:00 WIB'}
                </p>
                <p className="text-gray-600">
                  <MapPin className="w-4 h-4 inline mr-1" />
                  {formData.tempatAcara || 'Tempat Acara'}
                </p>
              </div>

              <div className="text-center">
                <p className="text-gray-600 mb-4">
                  Kehadiran Anda akan sangat berarti bagi kami
                </p>
                <div className="text-lg font-semibold" style={{ color: formData.temaWarna }}>
                  Terima Kasih
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-6">
            <button
              onClick={handlePreview}
              className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
            >
              Kembali ke Editor
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Undangan Kustom</h2>
          <p className="text-gray-600">Buat undangan sesuai keinginan Anda</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handlePreview}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
          >
            <Eye className="w-4 h-4" />
            Preview
          </button>
          <button
            onClick={handleSave}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            Simpan
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form Input */}
        <div className="lg:col-span-2 space-y-6">
          {/* Informasi Acara */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-500" />
              Informasi Acara
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Judul Acara</label>
                <input
                  type="text"
                  name="judulAcara"
                  value={formData.judulAcara}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Masukkan judul acara"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Deskripsi Acara</label>
                <input
                  type="text"
                  name="deskripsiAcara"
                  value={formData.deskripsiAcara}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Masukkan deskripsi singkat acara"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tanggal Acara</label>
                <input
                  type="date"
                  name="tanggalAcara"
                  value={formData.tanggalAcara}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Waktu Acara</label>
                <input
                  type="time"
                  name="waktuAcara"
                  value={formData.waktuAcara}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Tempat Acara</label>
                <input
                  type="text"
                  name="tempatAcara"
                  value={formData.tempatAcara}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Masukkan tempat acara"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Alamat Maps</label>
                <input
                  type="text"
                  name="alamatMaps"
                  value={formData.alamatMaps}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Link Google Maps"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Kontak</label>
                <input
                  type="text"
                  name="kontak"
                  value={formData.kontak}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nomor WhatsApp"
                />
              </div>
            </div>
          </div>

          {/* Kata-kata */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Kata-kata Undangan</h3>
            <textarea
              name="kataKata"
              value={formData.kataKata}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Masukkan kata-kata undangan..."
            />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Tema Warna */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Palette className="w-5 h-5 text-blue-500" />
              Tema Warna
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Warna Utama</label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    name="temaWarna"
                    value={formData.temaWarna}
                    onChange={handleInputChange}
                    className="w-16 h-10 border border-gray-300 rounded cursor-pointer"
                  />
                  <span className="text-sm text-gray-600">{formData.temaWarna}</span>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {['#5085B1', '#EC4899', '#10B981', '#F59E0B', '#8B5CF6', '#EF4444', '#6366F1', '#14B8A6'].map((color) => (
                  <button
                    key={color}
                    onClick={() => setFormData(prev => ({ ...prev, temaWarna: color }))}
                    className="w-full h-10 rounded border-2 transition-all"
                    style={{ 
                      backgroundColor: color,
                      borderColor: formData.temaWarna === color ? '#1F2937' : 'transparent'
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Tema Font */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Settings className="w-5 h-5 text-blue-500" />
              Tema Font
            </h3>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="temaFont"
                  value="modern"
                  checked={formData.temaFont === 'modern'}
                  onChange={handleInputChange}
                  className="text-blue-500 focus:ring-blue-500"
                />
                <div>
                  <div className="font-medium">Modern</div>
                  <div className="text-sm text-gray-500">Clean dan minimalis</div>
                </div>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="temaFont"
                  value="elegant"
                  checked={formData.temaFont === 'elegant'}
                  onChange={handleInputChange}
                  className="text-blue-500 focus:ring-blue-500"
                />
                <div>
                  <div className="font-medium">Elegant</div>
                  <div className="text-sm text-gray-500">Klasik dan mewah</div>
                </div>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="temaFont"
                  value="playful"
                  checked={formData.temaFont === 'playful'}
                  onChange={handleInputChange}
                  className="text-blue-500 focus:ring-blue-500"
                />
                <div>
                  <div className="font-medium">Playful</div>
                  <div className="text-sm text-gray-500">Ceria dan kreatif</div>
                </div>
              </label>
            </div>
          </div>

          {/* Galeri */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Galeri Foto</h3>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <div className="text-gray-400">
                <Users className="w-12 h-12 mx-auto mb-2" />
                <p className="text-sm">Klik untuk upload foto</p>
                <p className="text-xs">Maksimal 8 foto</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UndanganCustom;
