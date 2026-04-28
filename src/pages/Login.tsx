import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Eye, EyeOff, ArrowRightIcon } from 'lucide-react';
import { authAPI, LoginRequest, RegisterRequest } from '../api/auth';

type Step = 'login' | 'register';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [loginForm, setLoginForm] = useState<LoginRequest>({
    email: '',
    password: '',
  });

  const [registerForm, setRegisterForm] = useState<RegisterRequest>({
    email: '',
    password: '',
    name: '',
    username: '',
  });

  // Auto hide error after 3 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await authAPI.login(loginForm);
      // Store auth token and user data
      localStorage.setItem('authToken', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      navigate('/dashboard');
    } catch (err) {
      setError('Email atau password salah');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await authAPI.register(registerForm);
      // Store auth token and user data
      localStorage.setItem('authToken', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      navigate('/dashboard');
    } catch (err) {
      setError('Registrasi gagal. Email atau username sudah digunakan.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 'login') {
      await handleLogin(e);
    } else {
      await handleRegister(e);
    }
  };

  const isFormValid = () => {
    if (step === 'login') {
      return loginForm.email && loginForm.password;
    } else {
      return registerForm.email && registerForm.password && registerForm.name && registerForm.username;
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Content Section */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-lg relative">
          {step === 'login' && (
            <div className="text-center mb-6">
              <h1 className="text-lg md:text-xl font-bold text-gray-900 mb-2">Masuk ke Akun Anda</h1>
              <p className="text-xs md:text-sm text-gray-600 mb-1">Selamat datang kembali</p>
              <p className="text-xs md:text-sm text-gray-500">Masukkan email dan password untuk melanjutkan</p>
            </div>
          )}
          {step === 'register' && (
            <div className="text-center mb-6">
              <h1 className="text-lg md:text-xl font-bold text-gray-900 mb-2">Buat Akun Baru</h1>
              <p className="text-xs md:text-sm text-gray-600 mb-1">Bergabung dengan kami</p>
              <p className="text-xs md:text-sm text-gray-500">Daftar untuk membuat undangan pernikahan digital</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {step === 'register' && (
              <>
                <div className="relative">
                  <label className="absolute -top-2.5 left-4 bg-white px-2 text-sm font-semibold text-[#5085B1] z-10">
                    Nama Lengkap
                  </label>
                  <div className="flex pt-2 border-2 border-[#5085B1] rounded-xl">
                    <User className="w-5 h-5 text-gray-400 mx-3 self-center" />
                    <input
                      type="text"
                      value={registerForm.name}
                      onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
                      className="flex-1 px-3 py-3 border-none outline-none text-gray-900 placeholder-gray-400 text-base"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                </div>

                <div className="relative">
                  <label className="absolute -top-2.5 left-4 bg-white px-2 text-sm font-semibold text-[#5085B1] z-10">
                    Username
                  </label>
                  <div className="flex pt-2 border-2 border-[#5085B1] rounded-xl">
                    <User className="w-5 h-5 text-gray-400 mx-3 self-center" />
                    <input
                      type="text"
                      value={registerForm.username}
                      onChange={(e) => setRegisterForm({ ...registerForm, username: e.target.value })}
                      className="flex-1 px-3 py-3 border-none outline-none text-gray-900 placeholder-gray-400 text-base"
                      placeholder="johndoe"
                      required
                      minLength={3}
                    />
                  </div>
                  {registerForm.username && registerForm.username.length < 3 && (
                    <p className="text-xs text-red-500 mt-1 ml-2">Username minimal 3 karakter</p>
                  )}
                </div>
              </>
            )}

            <div className="relative">
              <label className="absolute -top-2.5 left-4 bg-white px-2 text-sm font-semibold text-[#5085B1] z-10">
                Email
              </label>
              <div className="flex pt-2 border-2 border-[#5085B1] rounded-xl">
                <Mail className="w-5 h-5 text-gray-400 mx-3 self-center" />
                <input
                  type="email"
                  value={step === 'login' ? loginForm.email : registerForm.email}
                  onChange={(e) => {
                    if (step === 'login') {
                      setLoginForm({ ...loginForm, email: e.target.value });
                    } else {
                      setRegisterForm({ ...registerForm, email: e.target.value });
                    }
                  }}
                  className="flex-1 px-3 py-3 border-none outline-none text-gray-900 placeholder-gray-400 text-base"
                  placeholder="email@example.com"
                  required
                />
              </div>
            </div>

            <div className="relative">
              <label className="absolute -top-2.5 left-4 bg-white px-2 text-sm font-semibold text-[#5085B1] z-10">
                Password
              </label>
              <div className="flex pt-2 border-2 border-[#5085B1] rounded-xl">
                <Lock className="w-5 h-5 text-gray-400 mx-3 self-center" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={step === 'login' ? loginForm.password : registerForm.password}
                  onChange={(e) => {
                    if (step === 'login') {
                      setLoginForm({ ...loginForm, password: e.target.value });
                    } else {
                      setRegisterForm({ ...registerForm, password: e.target.value });
                    }
                  }}
                  className="flex-1 px-3 py-3 border-none outline-none text-gray-900 placeholder-gray-400 text-base"
                  placeholder="••••••••"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="px-3 text-gray-400 hover:text-[#5085B1] transition-colors duration-200"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {step === 'register' && registerForm.password && registerForm.password.length < 6 && (
                <p className="text-xs text-red-500 mt-1 ml-2">Password minimal 6 karakter</p>
              )}
            </div>

            {/* Submit Button Inside Form */}
            <button
              type="submit"
              disabled={loading || !isFormValid()}
              className="w-full py-3 bg-[#5085B1] hover:bg-[#427494] text-white rounded-xl font-medium transition-all duration-300 disabled:opacity-50 disabled:hover:bg-[#5085B1] flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin" />
              ) : (
                <>
                  {step === 'login' ? 'Masuk' : 'Daftar'}
                  <ArrowRightIcon className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          <button 
            type="button" 
            onClick={() => setStep(step === 'login' ? 'register' : 'login')}
            className="w-full text-center text-sm text-gray-500 hover:text-gray-700 font-medium transition-colors mt-4"
          >
            {step === 'login' ? 'Belum punya akun? Daftar' : 'Sudah punya akun? Masuk'}
          </button>
        </div>
      </div>

      {error && (
        <div className="fixed bottom-0 left-0 right-0 bg-black text-white p-4 text-sm font-medium border-t-2 border-gray-800 shadow-2xl z-50 animate-slide-down">
          <div className="max-w-2xl mx-auto text-center">
            {error}
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideDown {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-slide-down {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Login;
