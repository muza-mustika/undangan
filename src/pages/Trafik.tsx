import React from 'react';
import { BarChart3, Eye, Users, TrendingUp, Calendar } from 'lucide-react';

const Trafik: React.FC = () => {
  const stats = [
    {
      title: "Total Pengunjung",
      value: "1,234",
      change: "+12%",
      icon: Eye,
      color: "text-blue-500",
      bgColor: "bg-blue-50"
    },
    {
      title: "Tamu Hari Ini",
      value: "45",
      change: "+8%",
      icon: Users,
      color: "text-green-500",
      bgColor: "bg-green-50"
    },
    {
      title: "Konfirmasi Hadir",
      value: "89",
      change: "+15%",
      icon: TrendingUp,
      color: "text-purple-500",
      bgColor: "bg-purple-50"
    },
    {
      title: "Undangan Aktif",
      value: "3",
      change: "0%",
      icon: Calendar,
      color: "text-orange-500",
      bgColor: "bg-orange-50"
    }
  ];

  const recentActivity = [
    { time: "10:30", action: "Budi Santoso membuka undangan pernikahan", type: "view" },
    { time: "10:15", action: "Ani Wijaya konfirmasi hadir", type: "confirm" },
    { time: "09:45", action: "Ahmad Rizki membuka undangan khitanan", type: "view" },
    { time: "09:30", action: "Siti Nurhaliza mendaftar sebagai tamu", type: "register" },
  ];

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Trafik & Analitik</h2>
        <p className="text-gray-600">Pantau performa undangan dan aktivitas pengunjung</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <span className={`text-sm font-medium ${
                  stat.change.startsWith('+') ? 'text-green-600' : 'text-gray-600'
                }`}>
                  {stat.change}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
              <p className="text-sm text-gray-600">{stat.title}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Grafik Pengunjung</h3>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <div className="text-center">
              <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-500">Grafik akan segera tersedia</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Aktivitas Terkini</h3>
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex gap-3">
                <div className="flex-shrink-0 w-2 h-2 bg-gray-300 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{activity.action}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Performa Undangan</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nama Undangan
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Dilihat
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tamu
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Konfirmasi
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rate
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  Undangan Pernikahan
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">234</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">45</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">38</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">84.4%</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  Undangan Khitanan
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">156</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">28</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">22</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">78.6%</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  Undangan Ulang Tahun
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">89</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">15</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">12</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">80.0%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Trafik;
