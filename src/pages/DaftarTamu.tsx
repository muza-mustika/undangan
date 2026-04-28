import React, { useState, useEffect } from 'react';
import { Users, Search, Plus, Edit, Trash2, Mail, Phone, Eye, MessageCircle } from 'lucide-react';
import { databaseAPI, Guest } from '../api/database';

const DaftarTamu: React.FC = () => {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [newGuest, setNewGuest] = useState({
    name: '',
    email: '',
    phone: '',
    invitation_id: null as number | null,
    status: 'pending' as string,
    invitation_url: '' as string,
    custom_message: '' as string
  });

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  useEffect(() => {
    if (user) {
      loadGuests();
    }
  }, [user]);

  const loadGuests = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      const guestsData = await databaseAPI.getGuests(user.id);
      setGuests(guestsData);
    } catch (error) {
      console.error('Error loading guests:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddGuest = async () => {
    if (!user) return;
    
    try {
      const createdGuest = await databaseAPI.createGuest({
        ...newGuest,
        user_id: user.id,
      });
      setGuests([...guests, createdGuest]);
      setShowAddModal(false);
      setNewGuest({
        name: '',
        email: '',
        phone: '',
        invitation_id: null,
        status: 'pending',
        invitation_url: '',
        custom_message: ''
      });
    } catch (error) {
      console.error('Error adding guest:', error);
    }
  };

  const handleDeleteGuest = async (guestId: number) => {
    if (!user) return;
    
    try {
      await databaseAPI.deleteGuest(guestId);
      setGuests(guests.filter(g => g.id !== guestId));
    } catch (error) {
      console.error('Error deleting guest:', error);
    }
  };

  const handlePreview = (guest: Guest) => {
    if (guest.invitation_url) {
      window.open(guest.invitation_url, '_blank');
    }
  };

  const handleSendWhatsApp = (guest: Guest) => {
    const message = `Hai ${guest.name},\n\nKami mengundang Anda untuk hadir di acara kami.\n\nBerikut link undangan digital Anda:\n${guest.invitation_url || 'Link undangan akan dikirimkan segera'}\n\nMohon konfirmasi kehadiran Anda melalui link tersebut.\n\nTerima kasih.`;
    
    const whatsappUrl = `https://wa.me/${guest.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const filteredGuests = guests.filter(guest => {
    const matchesSearch = guest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         guest.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         guest.phone?.includes(searchTerm);
    const matchesStatus = !statusFilter || guest.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  
  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Daftar Tamu</h2>
          <p className="text-gray-600">Kelola daftar tamu untuk semua undangan Anda</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-[#5085B1] text-white py-2 px-4 rounded-lg hover:bg-[#4070a1] transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Tambah Tamu
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Cari tamu..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5085B1]"
              />
            </div>
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5085B1]">
              <option value="">Semua Status</option>
              <option value="confirmed">Konfirmasi Hadir</option>
              <option value="pending">Menunggu Konfirmasi</option>
              <option value="declined">Tidak Hadir</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nama
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Kontak
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Undangan
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {guests.map((guest) => (
                <tr key={guest.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                        <Users className="w-4 h-4 text-gray-600" />
                      </div>
                      <div className="text-sm font-medium text-gray-900">{guest.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 space-y-1">
                      <div className="flex items-center gap-2">
                        <Mail className="w-3 h-3 text-gray-400" />
                        {guest.email}
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-3 h-3 text-gray-400" />
                        {guest.phone}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    Undangan #{guest.invitation_id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      guest.status === 'confirmed' 
                        ? 'bg-green-100 text-green-800'
                        : guest.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {guest.status === 'confirmed' ? 'Konfirmasi Hadir' : 
                       guest.status === 'pending' ? 'Menunggu Konfirmasi' : 'Tidak Hadir'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => handlePreview(guest)}
                        className="text-green-600 hover:text-green-900"
                        title="Preview Undangan"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleSendWhatsApp(guest)}
                        className="text-green-600 hover:text-green-900"
                        title="Kirim WhatsApp"
                      >
                        <MessageCircle className="w-4 h-4" />
                      </button>
                      <button className="text-blue-600 hover:text-blue-900">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Guest Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Tambah Tamu Baru</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama *</label>
                <input
                  type="text"
                  value={newGuest.name}
                  onChange={(e) => setNewGuest({ ...newGuest, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5085B1]"
                  placeholder="Nama tamu"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={newGuest.email}
                  onChange={(e) => setNewGuest({ ...newGuest, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5085B1]"
                  placeholder="email@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">No. Telepon</label>
                <input
                  type="tel"
                  value={newGuest.phone}
                  onChange={(e) => setNewGuest({ ...newGuest, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5085B1]"
                  placeholder="08123456789"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Batal
              </button>
              <button
                onClick={handleAddGuest}
                disabled={!newGuest.name}
                className="flex-1 py-2 px-4 bg-[#5085B1] text-white rounded-lg hover:bg-[#4070a1] transition-colors disabled:opacity-50 disabled:hover:bg-[#5085B1]"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DaftarTamu;
