import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, EyeOff, Eye } from 'lucide-react';
import Cookies from 'js-cookie';
import LoginInfoBox from '../../component/etc/logindetail';

const LoginView = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // This is where you would add your actual login logic
    // For example, API call to authenticate user
    try {
      // Simulating API call with timeout
      setTimeout(() => {
        // For demonstration - in real app, replace with actual API call
        if (email === 'admin@email.com' && password === 'password') {
          // Set cookies upon successful login
          Cookies.set('token', 'sample-token-value');
          Cookies.set('role', '1');
          Cookies.set('department', 'admin');
          navigate('/');
        } else {
          setError('อีเมลหรือรหัสผ่านไม่ถูกต้อง');
        }
        setLoading(false);
      }, 1000);
    } catch (err) {
      setError('เกิดข้อผิดพลาดในการเข้าสู่ระบบ');
      setLoading(false);
    }
  };

  return (
    <div className="relative flex h-screen w-full overflow-hidden bg-black">
      {/* Animated Tech Background */}
      <TechBackground />
      
      {/* Login Form */}
      <div className="relative z-10 m-auto w-full max-w-md p-8 rounded-xl bg-gray-800 bg-opacity-80 shadow-2xl backdrop-blur-sm">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">เข้าสู่ระบบ</h1>
          <p className="text-gray-300 mt-2">กรุณาเข้าสู่ระบบเพื่อใช้งาน</p>
        </div>

        {error && (
          <div className="bg-red-500 bg-opacity-10 border border-red-500 text-white px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 block">อีเมล</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <Mail className="w-5 h-5" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-700 text-white pl-10 pr-4 py-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="your.email@example.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 block">รหัสผ่าน</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-gray-700 text-white pl-10 pr-12 py-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="••••••••"
                  required
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-800 text-white font-medium rounded-lg py-3 transition-colors focus:outline-none"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    กำลังดำเนินการ...
                  </div>
                ) : (
                  'เข้าสู่ระบบ'
                )}
              </button>
            </div>
          </div>
        </form>

        <div className="text-center mt-6 mb-4">
          <a href="#" className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
            ลืมรหัสผ่าน?
          </a>
        </div>
        <LoginInfoBox />
      </div>
    </div>
  );
};

// Animated Tech Background Component
const TechBackground = () => {
  const [particles, setParticles] = useState([]);
  
  useEffect(() => {
    // Create particles
    const createParticles = () => {
      const newParticles = [];
      const particleCount = 50;
      
      for (let i = 0; i < particleCount; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 4 + 1,
          speedX: (Math.random() - 0.5) * 0.2,
          speedY: (Math.random() - 0.5) * 0.2,
          opacity: Math.random() * 0.5 + 0.3
        });
      }
      
      setParticles(newParticles);
    };
    
    // Initial creation
    createParticles();
    
    // Set up animation interval
    const animationInterval = setInterval(() => {
      setParticles(prevParticles => 
        prevParticles.map(particle => {
          // Update position
          let x = particle.x + particle.speedX;
          let y = particle.y + particle.speedY;
          
          // Wrap around edges
          if (x > 100) x = 0;
          if (x < 0) x = 100;
          if (y > 100) y = 0;
          if (y < 0) y = 100;
          
          return {
            ...particle,
            x,
            y
          };
        })
      );
    }, 50);
    
    // Clean up
    return () => clearInterval(animationInterval);
  }, []);
  
  return (
    <div className="absolute inset-0 overflow-hidden bg-gradient-to-br from-blue-900 to-black">
      {/* Grid lines */}
      <div className="absolute inset-0 opacity-20">
        <div className="grid-bg"></div>
      </div>
      
      {/* Moving particles */}
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-blue-400"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
            boxShadow: `0 0 ${particle.size * 2}px rgba(59, 130, 246, 0.8)`,
            transition: 'all 0.5s linear'
          }}
        />
      ))}
      
      {/* Connecting lines (CSS effect) */}
      <div className="absolute inset-0">
        <svg width="100%" height="100%" className="opacity-20">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(96, 165, 250, 0.3)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      
      {/* Circuit board-like patterns */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="circuit-pattern"></div>
      </div>
      
      {/* Digital glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-blue-900 opacity-20"></div>
      
      {/* Add a CSS style tag for additional animations */}
      <style jsx>{`
        .grid-bg {
          position: absolute;
          width: 200%;
          height: 200%;
          background-image: 
            linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px);
          background-size: 40px 40px;
          left: -50%;
          top: -50%;
          animation: gridMove 80s linear infinite;
        }
        
        .circuit-pattern {
          position: absolute;
          width: 100%;
          height: 100%;
          background-image: radial-gradient(circle, rgba(59, 130, 246, 0.5) 1px, transparent 1px);
          background-size: 60px 60px;
          animation: pulse 4s ease-in-out infinite;
        }
        
        @keyframes gridMove {
          0% {
            transform: rotate(0) translate(0, 0);
          }
          100% {
            transform: rotate(5deg) translate(-200px, -100px);
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 0.1;
          }
          50% {
            opacity: 0.3;
          }
        }
      `}</style>
    </div>
  );
};

export default LoginView;