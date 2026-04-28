import React, { useState } from 'react';
import { Gift, Calendar, MapPin, Users, Clock, Save, Eye, Settings, Cake } from 'lucide-react';

const UndanganUlangTahun: React.FC = () => {
  const [formData, setFormData] = useState({
    namaAnak: '',
    usia: '',
    tanggalAcara: '',
    waktuAcara: '',
    tempatAcara: '',
    alamatMaps: '',
    galeriFoto: [] as string[],
    kataKata: '',
    kontakOrtu: '',
    tema: 'fun'
  });

  const [previewMode, setPreviewMode] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    // TODO: Implement save logic
    console.log('Saving ulang tahun invitation:', formData);
  };

  const handlePreview = () => {
    setPreviewMode(!previewMode);
  };

  if (previewMode) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50">
        {/* Preview Template */}
        <div className="container mx-auto px-4 py-8">
          <div className="bg-white rounded-2xl shadow-xl max-w-4xl mx-auto overflow-hidden">
            {/* Header Preview */}
            <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white p-8 text-center">
              <div className="mb-4">
                <Cake className="w-16 h-16 mx-auto text-white animate-bounce" />
              </div>
              <h1 className="text-4xl font-bold mb-2">
                Happy Birthday!
              </h1>
              <p className="text-xl opacity-90">
                {formData.namaAnak || 'Nama Anak'}
              </p>
              <p className="text-lg opacity-80">
                {formData.usia || 'Usia'} Tahun
              </p>
            </div>

            {/* Content Preview */}
            <div className="p-8">
              <div className="text-center mb-8">
                <div className="mb-6">
                  <img 
                    src="/api/placeholder/150/150" 
                    alt="Foto Anak" 
                    className="w-32 h-32 rounded-full mx-auto border-4 border-yellow-200"
                  />
                </div>
                <p className="text-gray-700 mb-4 text-lg">
                  Ayo rayakan hari spesialku!
                </p>
                <p className="text-gray-600 mb-6">
                  Kami mengundang teman-teman untuk bergabung dalam pesta ulang tahunku
                  yang akan sangat menyenangkan!
                </p>
                <p className="text-3xl font-bold text-orange-500 mb-2">
                  {formData.namaAnak || 'Nama Anak'}
                </p>
                <p className="text-gray-600">
                  Berusia {formData.usia || 'Usia'} tahun
                </p>
              </div>

              <div className="text-center p-6 bg-yellow-50 rounded-lg mb-8">
                <Calendar className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-800 mb-2">Detail Pesta</h3>
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
                  Jangan sampai ketinggalan ya!
                  Ada banyak games, kue, dan hadiah menanti!
                </p>
                <p className="text-lg font-semibold text-orange-600">
                  See you there! 🎉
                </p>
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
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Undangan Ulang Tahun</h2>
          <p className="text-gray-600">Buat undangan ulang tahun yang ceria dan menyenangkan</p>
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
          {/* Data Anak */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Cake className="w-5 h-5 text-yellow-500" />
              Data Anak
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nama Anak</label>
                <input
                  type="text"
                  name="namaAnak"
                  value={formData.namaAnak}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  placeholder="Masukkan nama anak"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Usia</label>
                <input
                  type="text"
                  name="usia"
                  value={formData.usia}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  placeholder="Contoh: 7 tahun"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Kontak Ortu</label>
                <input
                  type="text"
                  name="kontakOrtu"
                  value={formData.kontakOrtu}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  placeholder="Nomor WhatsApp"
                />
              </div>
            </div>
          </div>

          {/* Detail Acara */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-orange-500" />
              Detail Pesta
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tanggal Acara</label>
                <input
                  type="date"
                  name="tanggalAcara"
                  value={formData.tanggalAcara}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Waktu Acara</label>
                <input
                  type="time"
                  name="waktuAcara"
                  value={formData.waktuAcara}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Tempat Acara</label>
                <input
                  type="text"
                  name="tempatAcara"
                  value={formData.tempatAcara}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Link Google Maps"
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
              onChange={handleTextAreaChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Masukkan kata-kata undangan yang ceria..."
            />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Tema */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Settings className="w-5 h-5 text-blue-500" />
              Tema
            </h3>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="tema"
                  value="fun"
                  checked={formData.tema === 'fun'}
                  onChange={handleInputChange}
                  className="text-yellow-500 focus:ring-yellow-500"
                />
                <div>
                  <div className="font-medium">Fun & Colorful</div>
                  <div className="text-sm text-gray-500">Ceria dan penuh warna</div>
                </div>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="tema"
                  value="princess"
                  checked={formData.tema === 'princess'}
                  onChange={handleInputChange}
                  className="text-yellow-500 focus:ring-yellow-500"
                />
                <div>
                  <div className="font-medium">Princess</div>
                  <div className="text-sm text-gray-500">Pink dan elegan</div>
                </div>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="tema"
                  value="superhero"
                  checked={formData.tema === 'superhero'}
                  onChange={handleInputChange}
                  className="text-yellow-500 focus:ring-yellow-500"
                />
                <div>
                  <div className="font-medium">Superhero</div>
                  <div className="text-sm text-gray-500">Petualangan seru</div>
                </div>
              </label>
            </div>
          </div>

          {/* Galeri */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Galeri Foto</h3>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <div className="text-gray-400">
                <Gift className="w-12 h-12 mx-auto mb-2" />
                <p className="text-sm">Klik untuk upload foto anak</p>
                <p className="text-xs">Maksimal 5 foto</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UndanganUlangTahun;
