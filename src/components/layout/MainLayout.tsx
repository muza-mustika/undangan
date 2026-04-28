import { Outlet, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { 
  UserIcon, 
  FileText, 
  Users, 
  BarChart3, 
  Plus, 
  RefreshCw, 
  MessageCircle,
  LogOut,
  Settings,
  Trash2,
  ChevronUp,
  ChevronDown
} from 'lucide-react'
import { useState, useEffect, useMemo } from 'react'

export function MainLayout() {
  const location = useLocation()
  const navigate = useNavigate()
  
  // Check if preview mode
  const isPreview = new URLSearchParams(location.search).get('preview') === 'true' || new URLSearchParams(location.search).get('preview') === '1'
  
  // User state
  const [user, setUser] = useState<any>(null)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showMobileUndanganList, setShowMobileUndanganList] = useState(false)
  const [mobileListHeight, setMobileListHeight] = useState(0) // Will be calculated based on list content
  const [isResizing, setIsResizing] = useState(false)
  const [resizeStartY, setResizeStartY] = useState(0)
  const [resizeStartHeight, setResizeStartHeight] = useState(0)
  
  // Mock data for drives - replace with actual data logic
  const [drives, setDrives] = useState<any[]>([])
  const [currentDrive, setCurrentDrive] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  // Load user data and invitations
  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
    }

    // Fetch invitations from database
    fetchInvitations()
  }, [])

  // Close mobile undangan list when navigating to main menu routes
  useEffect(() => {
    const mainMenuRoutes = ['/dashboard', '/buat-undangan', '/daftar-tamu', '/trafik']
    if (mainMenuRoutes.includes(location.pathname)) {
      setShowMobileUndanganList(false)
    }
  }, [location.pathname])

  // Handle resize
  const handleResizeStart = (e: React.TouchEvent | React.MouseEvent) => {
    setIsResizing(true)
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY
    setResizeStartY(clientY)
    setResizeStartHeight(mobileListHeight)
    e.preventDefault()
  }

  const handleResizeMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isResizing) return

    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY
    const deltaY = resizeStartY - clientY // Positive when dragging up
    const navHeight = 60 // Approximate nav height
    const bottomMargin = 24 // Bottom margin

    // Calculate minimum height based on actual list content
    const itemHeight = 70 // Each item height
    const handleHeight = 16 // Resize handle height
    const padding = 24 // Padding
    const minHeight = Math.max(90, drives.length * itemHeight + handleHeight + padding)

    // Maximum height - allow cursor to follow freely
    const maxHeight = window.innerHeight - navHeight - bottomMargin

    // Calculate new height based on delta
    const newHeight = resizeStartHeight + deltaY
    const clampedHeight = Math.max(minHeight, Math.min(maxHeight, newHeight))

    setMobileListHeight(clampedHeight)
  }

  const handleResizeEnd = () => {
    setIsResizing(false)
  }

  useEffect(() => {
    if (isResizing) {
      const handleMouseMove = (e: MouseEvent) => handleResizeMove(e as any)
      const handleTouchMove = (e: TouchEvent) => handleResizeMove(e as any)

      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleResizeEnd)
      window.addEventListener('touchmove', handleTouchMove, { passive: false })
      window.addEventListener('touchend', handleResizeEnd)

      // Prevent body scroll during resize
      document.body.style.overflow = 'hidden'

      return () => {
        window.removeEventListener('mousemove', handleMouseMove)
        window.removeEventListener('mouseup', handleResizeEnd)
        window.removeEventListener('touchmove', handleTouchMove)
        window.removeEventListener('touchend', handleResizeEnd)
        document.body.style.overflow = ''
      }
    }
  }, [isResizing])

  // Prevent body scroll when list is open
  useEffect(() => {
    if (showMobileUndanganList) {
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = ''
      }
    }
  }, [showMobileUndanganList])

  // Calculate initial height based on list content when list opens
  useEffect(() => {
    if (showMobileUndanganList && mobileListHeight === 0) {
      const itemHeight = 70 // Each item height
      const handleHeight = 16 // Resize handle height
      const padding = 24 // Padding
      const calculatedHeight = Math.max(90, drives.length * itemHeight + handleHeight + padding)
      setMobileListHeight(calculatedHeight)
    }
  }, [showMobileUndanganList, drives.length, mobileListHeight])

  const fetchInvitations = async () => {
    try {
      const token = localStorage.getItem('authToken')
      const response = await fetch('/api/invitations', {
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        }
      })

      if (response.ok) {
        const invitations = await response.json()
        const newDrives = invitations.map((inv: any) => ({
          id: inv.id,
          name: inv.title || 'Undangan',
          files: inv.guest_count || 0,
          size: inv.view_count || 0
        }))
        // Sort by newest first (assuming newer invitations have higher IDs or created_at)
        const sortedDrives = newDrives.sort((a: any, b: any) => b.id - a.id)
        setDrives(sortedDrives)
      } else {
        // API belum tersedia atau error, set empty array
        setDrives([])
      }
    } catch (error) {
      console.error('Error fetching invitations:', error)
      setDrives([])
    } finally {
      setLoading(false)
    }
  }
  
  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('user')
    navigate('/login')
  }

  function selectDrive(id: string) {
    setCurrentDrive(id)
    navigate(`/undangan/pernikahan/${id}`)
  }

  function handleCreateUndangan() {
    navigate('/buat-undangan')
  }

  function handleRefresh() {
    // Refresh invitations list
    fetchInvitations()
  }

  async function handleDeleteInvitation(id: string) {
    if (!confirm('Apakah Anda yakin ingin menghapus undangan ini?')) {
      return
    }

    try {
      const token = localStorage.getItem('authToken')
      const response = await fetch(`/api/invitations/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        }
      })

      if (response.ok) {
        // Refresh invitations list
        fetchInvitations()
        // If current drive is deleted, clear it
        if (currentDrive === id) {
          setCurrentDrive(null)
        }
      } else {
        alert('Gagal menghapus undangan')
      }
    } catch (error) {
      console.error('Error deleting invitation:', error)
      alert('Gagal menghapus undangan')
    }
  }

  // Memoize drive list
  const driveListItems = useMemo(() => {
    if (loading) {
      // Shimmer loading animation
      return Array(3).fill(0).map((_, i) => (
        <div
          key={`shimmer-${i}`}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-50 border border-gray-200"
        >
          <div className="w-8 h-8 rounded-lg bg-gray-200 animate-pulse" />
          <div className="flex-1 min-w-0">
            <div className="h-4 bg-gray-200 rounded animate-pulse mb-2" />
            <div className="h-3 bg-gray-200 rounded animate-pulse w-2/3" />
          </div>
        </div>
      ))
    }

    if (drives.length === 0) {
      return (
        <div className="text-center py-4">
          <p className="text-gray-400 text-xs">Belum ada undangan</p>
          <button onClick={handleCreateUndangan} className="text-[#5085B1] text-xs hover:underline mt-1">
            Buat undangan baru
          </button>
        </div>
      )
    }

    return drives.map(drive => (
      <div
        key={drive.id}
        className={`relative group`}
      >
        <button
          onClick={() => selectDrive(drive.id)}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
            currentDrive === drive.id
              ? 'bg-[#5085B1] text-white shadow-lg shadow-[#5085B1]/20'
              : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
          }`}
        >
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-all duration-200 ${
            currentDrive === drive.id ? 'bg-white/20' : 'bg-gray-100'
          }`}>
            <FileText className={`w-4 h-4 ${currentDrive === drive.id ? 'text-white' : 'text-gray-500'}`} />
          </div>
          <div className="flex-1 min-w-0">
            <p className={`text-sm font-medium truncate ${currentDrive === drive.id ? 'text-white' : 'text-gray-900'}`}>
              {drive.name}
            </p>
            <p className={`text-xs ${currentDrive === drive.id ? 'text-white/70' : 'text-gray-500'}`}>
              {drive.files} tamu • {drive.size} views
            </p>
          </div>
        </button>
        {/* Action buttons */}
        <div className={`absolute right-2 top-1/2 -translate-y-1/2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity ${
          currentDrive === drive.id ? 'opacity-100' : ''
        }`}>
          <button
            onClick={(e) => {
              e.stopPropagation()
              handleDeleteInvitation(drive.id)
            }}
            className={`p-1.5 rounded-lg transition-all duration-200 ${
              currentDrive === drive.id
                ? 'bg-white/20 text-white hover:bg-red-400/30'
                : 'bg-gray-100 text-gray-600 hover:bg-red-100 hover:text-red-600'
            }`}
            title="Hapus undangan"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    ))
  }, [drives, currentDrive, handleCreateUndangan, loading])

  // Dynamic header title based on route
  const getHeaderTitle = () => {
    if (location.pathname === '/profile') return 'Profil'
    if (location.pathname === '/dashboard') return 'Dashboard'
    if (location.pathname === '/buat-undangan') return 'Buat Undangan'
    if (location.pathname === '/daftar-tamu') return 'Daftar Tamu'
    if (location.pathname === '/trafik') return 'Trafik'
    if (location.pathname.startsWith('/undangan')) return 'Undangan'
    return ''
  }

  const headerTitle = getHeaderTitle()

  return (
    <div className="min-h-screen bg-white flex">
      {/* Sidebar */}
      {!isPreview && (
        <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-100 h-screen sticky top-0">
        <div className="flex flex-col h-full">
          {/* Logo/Brand */}
          <div className="px-4 py-6 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#5085B1] rounded-lg flex items-center justify-center">
                <FileText className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold text-gray-900">Mustika Undangan</span>
            </div>
          </div>

          {/* Navigasi Utama */}
          <div className="px-4 py-4 border-b border-gray-100">
            <nav className="space-y-1">
              <NavLink 
                to="/dashboard" 
                className={({ isActive }) => 
                  `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    isActive 
                      ? 'bg-[#5085B1] text-white shadow-lg shadow-[#5085B1]/20' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`
                }
              >
                <BarChart3 className="w-5 h-5" />
                <span className="text-sm font-medium">Dashboard</span>
              </NavLink>
              <NavLink 
                to="/buat-undangan" 
                className={({ isActive }) => 
                  `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    isActive 
                      ? 'bg-[#5085B1] text-white shadow-lg shadow-[#5085B1]/20' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`
                }
              >
                <FileText className="w-5 h-5" />
                <span className="text-sm font-medium">Buat Undangan</span>
              </NavLink>
              <NavLink 
                to="/daftar-tamu" 
                className={({ isActive }) => 
                  `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    isActive 
                      ? 'bg-[#5085B1] text-white shadow-lg shadow-[#5085B1]/20' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`
                }
              >
                <Users className="w-5 h-5" />
                <span className="text-sm font-medium">Daftar Tamu</span>
              </NavLink>
              <NavLink 
                to="/trafik" 
                className={({ isActive }) => 
                  `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    isActive 
                      ? 'bg-[#5085B1] text-white shadow-lg shadow-[#5085B1]/20' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`
                }
              >
                <BarChart3 className="w-5 h-5" />
                <span className="text-sm font-medium">Trafik</span>
              </NavLink>
            </nav>
          </div>

          {/* Undangan List Section */}
          <div className="flex-1 flex flex-col" style={{ height: 'calc(100vh - 280px)' }}>
            {/* Header Undangan List */}
            <div className="px-4 py-2 border-b border-gray-100 flex-shrink-0">
              <div className="flex items-center justify-between px-3">
                <span className="text-gray-500 text-[11px] uppercase tracking-wider font-bold">My Undangan</span>
                <div className="flex items-center gap-1">
                  <button onClick={handleRefresh} title="Refresh undangan" className="w-7 h-7 rounded-full flex items-center justify-center text-gray-400 hover:text-[#5085B1] hover:bg-gray-50 transition-all duration-200">
                    <RefreshCw className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={handleCreateUndangan} title="Buat undangan baru" className="w-7 h-7 rounded-full flex items-center justify-center text-gray-400 hover:text-[#5085B1] hover:bg-gray-50 transition-all duration-200">
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
            {/* Undangan List */}
            <div className="flex-1 overflow-y-auto px-4 py-4">
              <nav className="space-y-2">
                {driveListItems}
              </nav>
            </div>
          </div>

          {/* User Info Section */}
          {user && (
            <div className="px-4 py-4 border-t border-gray-100">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                <div className="w-10 h-10 bg-[#5085B1] rounded-full flex items-center justify-center">
                  <UserIcon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
                  <p className="text-xs text-gray-500">@{user.username}</p>
                </div>
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <Settings className="w-4 h-4" />
                </button>
              </div>
              
              {showUserMenu && (
                <div className="mt-2 bg-white rounded-lg shadow-lg border border-gray-200 py-1">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="w-4 h-4" />
                    Keluar
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </aside>
      )}

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen overflow-hidden pb-20 md:pb-0">
        <Outlet />
      </main>

      {/* Mobile Bottom Navigation */}
      {!isPreview && (
        <nav className="md:hidden fixed bottom-3 left-3 right-3 bg-white rounded-full shadow-lg shadow-gray-200/50 px-1 py-1.5 z-50">
          <div className="flex items-center justify-around">
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `flex flex-col items-center gap-0.5 px-2 py-1 rounded-full transition-all duration-200 min-w-[3.8rem] ${
                  isActive
                    ? 'text-[#5085B1] bg-[#5085B1]/10'
                    : 'text-gray-400 hover:text-gray-600'
                }`
              }
            >
              <BarChart3 className="w-5 h-5" />
              <span className="text-[10px] font-medium">Dashboard</span>
            </NavLink>
            <NavLink
              to="/buat-undangan"
              className={({ isActive }) =>
                `flex flex-col items-center gap-0.5 px-2 py-1 rounded-full transition-all duration-200 min-w-[3.8rem] ${
                  isActive
                    ? 'text-[#5085B1] bg-[#5085B1]/10'
                    : 'text-gray-400 hover:text-gray-600'
                }`
              }
            >
              <FileText className="w-5 h-5" />
              <span className="text-[10px] font-medium">Buat</span>
            </NavLink>
            <NavLink
              to="/daftar-tamu"
              className={({ isActive }) =>
                `flex flex-col items-center gap-0.5 px-2 py-1 rounded-full transition-all duration-200 min-w-[3.8rem] ${
                  isActive
                    ? 'text-[#5085B1] bg-[#5085B1]/10'
                    : 'text-gray-400 hover:text-gray-600'
                }`
              }
            >
              <Users className="w-5 h-5" />
              <span className="text-[10px] font-medium">Tamu</span>
            </NavLink>
            <NavLink
              to="/trafik"
              className={({ isActive }) =>
                `flex flex-col items-center gap-0.5 px-2 py-1 rounded-full transition-all duration-200 min-w-[3.8rem] ${
                  isActive
                    ? 'text-[#5085B1] bg-[#5085B1]/10'
                    : 'text-gray-400 hover:text-gray-600'
                }`
              }
            >
              <BarChart3 className="w-5 h-5" />
              <span className="text-[10px] font-medium">Trafik</span>
            </NavLink>
            <button
              onClick={() => setShowMobileUndanganList(!showMobileUndanganList)}
              className="flex flex-col items-center gap-0.5 px-2 py-1 rounded-full transition-all duration-200 text-gray-400 hover:text-gray-600 min-w-[3.8rem]"
            >
              <div className={`transition-transform duration-300 ${showMobileUndanganList ? 'rotate-180' : ''}`}>
                <ChevronUp className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-medium">Undangan</span>
            </button>
          </div>
        </nav>
      )}

      {/* Mobile Undangan List Popup */}
      <div
        className={`md:hidden fixed bottom-20 left-3 right-3 bg-white rounded-2xl shadow-lg overflow-hidden z-40 transition-all duration-300 ease-in-out ${
          showMobileUndanganList
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-full pointer-events-none'
        }`}
        style={{ height: showMobileUndanganList ? `${mobileListHeight}px` : '0px' }}
      >
        {/* Resize Handle */}
        <div
          className="w-full h-4 flex items-center justify-center cursor-row-resize active:cursor-grabbing bg-gray-50 rounded-t-2xl shrink-0"
          onMouseDown={handleResizeStart}
          onTouchStart={handleResizeStart}
        >
          <div className="w-12 h-1 bg-gray-300 rounded-full" />
        </div>
        {/* List */}
        <div className="overflow-y-auto px-4 py-3 flex-1" style={{ height: 'calc(100% - 16px)', scrollSnapType: 'none' }}>
          <nav className="space-y-2">
            {driveListItems}
          </nav>
        </div>
      </div>
    </div>
  )
}

export default MainLayout
