import React, { useState } from 'react';
import { Heart, Calendar, MapPin, Users, Clock, Save, Eye, Settings } from 'lucide-react';

const UndanganPernikahan: React.FC = () => {
  const [formData, setFormData] = useState({
    namaPria: '',
    namaWanita: '',
    namaOrtuPria: '',
    namaOrtuWanita: '',
    tanggalAkad: '',
    waktuAkad: '',
    tempatAkad: '',
    tanggalResepsi: '',
    waktuResepsi: '',
    tempatResepsi: '',
    alamatMaps: '',
    galeriFoto: [] as string[],
    kataKata: '',
    kontakPria: '',
    kontakWanita: '',
    tema: 'elegant'
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
    console.log('Saving wedding invitation:', formData);
  };

  const handlePreview = () => {
    setPreviewMode(!previewMode);
  };

  if (previewMode) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
        {/* Preview Template */}
        <div className="container mx-auto px-4 py-8">
          <div className="bg-white rounded-2xl shadow-xl max-w-4xl mx-auto overflow-hidden">
            {/* Header Preview */}
            <div className="bg-gradient-to-r from-pink-400 to-purple-400 text-white p-8 text-center">
              <div className="mb-4">
                <Heart className="w-16 h-16 mx-auto text-white animate-pulse" />
              </div>
              <h1 className="text-4xl font-bold mb-2">
                {formData.namaPria || 'Nama Pria'} & {formData.namaWanita || 'Nama Wanita'}
              </h1>
              <p className="text-lg opacity-90">Kami akan menikah</p>
            </div>

            {/* Content Preview */}
            <div className="p-8">
              <div className="text-center mb-8">
                <p className="text-gray-600 mb-4">
                  "Maha suci Allah yang telah menciptakan makhluk-Nya berpasang-pasangan"
                </p>
                <p className="text-2xl font-semibold text-gray-800 mb-2">
                  {formData.namaPria || 'Nama Pria'}
                </p>
                <p className="text-gray-600 mb-4">
                  Putra dari {formData.namaOrtuPria || 'Bapak & Ibu'}
                </p>
                <div className="text-3xl text-pink-400 my-4">&</div>
                <p className="text-2xl font-semibold text-gray-800 mb-2">
                  {formData.namaWanita || 'Nama Wanita'}
                </p>
                <p className="text-gray-600">
                  Putri dari {formData.namaOrtuWanita || 'Bapak & Ibu'}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="text-center p-6 bg-pink-50 rounded-lg">
                  <Calendar className="w-8 h-8 text-pink-500 mx-auto mb-2" />
                  <h3 className="font-semibold text-gray-800 mb-2">Akad Nikah</h3>
                  <p className="text-gray-700">{formData.tanggalAkad || 'Hari, Tanggal Bulan Tahun'}</p>
                  <p className="text-gray-700">{formData.waktuAkad || '00:00 WIB'}</p>
                  <p className="text-gray-600 mt-2">
                    <MapPin className="w-4 h-4 inline mr-1" />
                    {formData.tempatAkad || 'Tempat Akad'}
                  </p>
                </div>

                <div className="text-center p-6 bg-purple-50 rounded-lg">
                  <Calendar className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                  <h3 className="font-semibold text-gray-800 mb-2">Resepsi</h3>
                  <p className="text-gray-700">{formData.tanggalResepsi || 'Hari, Tanggal Bulan Tahun'}</p>
                  <p className="text-gray-700">{formData.waktuResepsi || '00:00 WIB'}</p>
                  <p className="text-gray-600 mt-2">
                    <MapPin className="w-4 h-4 inline mr-1" />
                    {formData.tempatResepsi || 'Tempat Resepsi'}
                  </p>
                </div>
              </div>

              <div className="text-center">
                <p className="text-gray-600 mb-4">
                  Merupakan suatu kehormatan dan kebahagiaan bagi kami
                  apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu
                </p>
                <div className="text-2xl font-bold text-pink-500 mb-4">
                  {formData.namaPria || 'Nama Pria'} & {formData.namaWanita || 'Nama Wanita'}
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
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Undangan Pernikahan</h2>
          <p className="text-gray-600">Buat undangan pernikahan yang elegan dan romantis</p>
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
          {/* Data Mempelai */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Heart className="w-5 h-5 text-pink-500" />
              Data Mempelai
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nama Pria</label>
                <input
                  type="text"
                  name="namaPria"
                  value={formData.namaPria}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="Masukkan nama pria"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nama Wanita</label>
                <input
                  type="text"
                  name="namaWanita"
                  value={formData.namaWanita}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="Masukkan nama wanita"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nama Ortu Pria</label>
                <input
                  type="text"
                  name="namaOrtuPria"
                  value={formData.namaOrtuPria}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="Bapak & Ibu"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nama Ortu Wanita</label>
                <input
                  type="text"
                  name="namaOrtuWanita"
                  value={formData.namaOrtuWanita}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="Bapak & Ibu"
                />
              </div>
            </div>
          </div>

          {/* Detail Acara */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-purple-500" />
              Detail Acara
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-medium text-gray-800">Akad Nikah</h4>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tanggal</label>
                  <input
                    type="date"
                    name="tanggalAkad"
                    value={formData.tanggalAkad}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Waktu</label>
                  <input
                    type="time"
                    name="waktuAkad"
                    value={formData.waktuAkad}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tempat</label>
                  <input
                    type="text"
                    name="tempatAkad"
                    value={formData.tempatAkad}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Masukkan tempat akad"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium text-gray-800">Resepsi</h4>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tanggal</label>
                  <input
                    type="date"
                    name="tanggalResepsi"
                    value={formData.tanggalResepsi}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Waktu</label>
                  <input
                    type="time"
                    name="waktuResepsi"
                    value={formData.waktuResepsi}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tempat</label>
                  <input
                    type="text"
                    name="tempatResepsi"
                    value={formData.tempatResepsi}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Masukkan tempat resepsi"
                  />
                </div>
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
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="Masukkan kata-kata undangan..."
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
                  value="elegant"
                  checked={formData.tema === 'elegant'}
                  onChange={handleInputChange}
                  className="text-pink-500 focus:ring-pink-500"
                />
                <div>
                  <div className="font-medium">Elegant</div>
                  <div className="text-sm text-gray-500">Klasik dan romantis</div>
                </div>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="tema"
                  value="modern"
                  checked={formData.tema === 'modern'}
                  onChange={handleInputChange}
                  className="text-pink-500 focus:ring-pink-500"
                />
                <div>
                  <div className="font-medium">Modern</div>
                  <div className="text-sm text-gray-500">Minimalis dan clean</div>
                </div>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="tema"
                  value="traditional"
                  checked={formData.tema === 'traditional'}
                  onChange={handleInputChange}
                  className="text-pink-500 focus:ring-pink-500"
                />
                <div>
                  <div className="font-medium">Traditional</div>
                  <div className="text-sm text-gray-500">Adat dan budaya</div>
                </div>
              </label>
            </div>
          </div>

          {/* Kontak */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Kontak</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Kontak Pria</label>
                <input
                  type="text"
                  name="kontakPria"
                  value={formData.kontakPria}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="Nomor WhatsApp"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Kontak Wanita</label>
                <input
                  type="text"
                  name="kontakWanita"
                  value={formData.kontakWanita}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="Nomor WhatsApp"
                />
              </div>
            </div>
          </div>

          {/* Galeri */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Galeri Foto</h3>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <div className="text-gray-400">
                <Users className="w-12 h-12 mx-auto mb-2" />
                <p className="text-sm">Klik untuk upload foto pre-wedding</p>
                <p className="text-xs">Maksimal 6 foto</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UndanganPernikahan;
