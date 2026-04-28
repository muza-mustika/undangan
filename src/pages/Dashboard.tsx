import React, { useState, useEffect } from 'react';
import { FileText, Users, Eye, CheckCircle } from 'lucide-react';

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState({
    totalUndangan: 0,
    totalTamu: 0,
    totalDilihat: 0,
    konfirmasiHadir: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      
      // Fetch invitations count
      const invitationsResponse = await fetch('/api/invitations', {
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        }
      });
      
      if (invitationsResponse.ok) {
        const invitations = await invitationsResponse.json();
        // Calculate stats from real data
        const totalUndangan = invitations.length || 0;
        const totalTamu = invitations.reduce((sum: number, inv: any) => sum + (inv.guest_count || 0), 0);
        const totalDilihat = invitations.reduce((sum: number, inv: any) => sum + (inv.view_count || 0), 0);
        const konfirmasiHadir = invitations.reduce((sum: number, inv: any) => sum + (inv.rsvp_count || 0), 0);
        
        setStats({
          totalUndangan,
          totalTamu,
          totalDilihat,
          konfirmasiHadir
        });
      } else {
        // API belum tersedia atau error, set zero stats
        setStats({
          totalUndangan: 0,
          totalTamu: 0,
          totalDilihat: 0,
          konfirmasiHadir: 0
        });
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setStats({
        totalUndangan: 0,
        totalTamu: 0,
        totalDilihat: 0,
        konfirmasiHadir: 0
      });
    } finally {
      setLoading(false);
    }
  };

  const statsData = [
    {
      title: "Total Undangan",
      value: loading ? "..." : stats.totalUndangan.toString(),
      icon: FileText,
      color: "text-blue-500",
      bgColor: "bg-blue-50"
    },
    {
      title: "Total Tamu",
      value: loading ? "..." : stats.totalTamu.toString(), 
      icon: Users,
      color: "text-green-500",
      bgColor: "bg-green-50"
    },
    {
      title: "Total Dilihat",
      value: loading ? "..." : stats.totalDilihat.toString(),
      icon: Eye,
      color: "text-purple-500", 
      bgColor: "bg-purple-50"
    },
    {
      title: "Konfirmasi Hadir",
      value: loading ? "..." : stats.konfirmasiHadir.toString(),
      icon: CheckCircle,
      color: "text-orange-500",
      bgColor: "bg-orange-50"
    }
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Dashboard
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    {stat.title}
                  </p>
                  <p className={`text-3xl font-bold ${stat.color}`}>
                    {stat.value}
                  </p>
                </div>
                <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Aktivitas Terkini</h3>
          <div className="space-y-3">
            {loading ? (
              <p className="text-sm text-gray-500">Memuat data...</p>
            ) : stats.totalUndangan === 0 ? (
              <p className="text-sm text-gray-500">Belum ada aktivitas</p>
            ) : (
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <FileText className="w-4 h-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Undangan baru dibuat</p>
                  <p className="text-xs text-gray-500">Baru saja</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Statistik Cepat</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Tingkat Konfirmasi</span>
              <span className="text-sm font-semibold text-gray-900">
                {loading ? "..." : stats.totalTamu > 0 ? `${Math.round((stats.konfirmasiHadir / stats.totalTamu) * 100)}%` : "0%"}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: loading ? '0%' : stats.totalTamu > 0 ? `${(stats.konfirmasiHadir / stats.totalTamu) * 100}%` : '0%' }}></div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Rata-rata Tamu/Undangan</span>
              <span className="text-sm font-semibold text-gray-900">
                {loading ? "..." : stats.totalUndangan > 0 ? (stats.totalTamu / stats.totalUndangan).toFixed(1) : "0"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
