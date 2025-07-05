
import { useState, useEffect } from 'react';
import { Bitcoin } from 'lucide-react';


interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  speed: number;
  delay: number;
}

interface LoadingPageProps {
  message?: string;
}

const LoadingPage = ({ message }: LoadingPageProps) => {
  
  const [progress, setProgress] = useState(0);
  const [particles, setParticles] = useState<Particle[]>([]);  

  // Generate random particles
  useEffect(() => {
    const generateParticles = () => {
      const newParticles: Particle[] = [];
      const colors = ['#8B5CF6', '#06B6D4', '#10B981', '#EC4899'];
      
      for (let i = 0; i < 50; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 4 + 2,
          color: colors[Math.floor(Math.random() * colors.length)],
          speed: Math.random() * 2 + 1,
          delay: Math.random() * 15
        });
      }
      setParticles(newParticles);
    };

    generateParticles();
  }, []);

  // Simulate loading progress
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + Math.random() * 2;
      });
    }, 150);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center">
      {/* Animated Background Particles */}
      <div className="absolute inset-0">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full opacity-30 animate-particle-drift"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              backgroundColor: particle.color,
              boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${15 + particle.speed * 5}s`
            }}
          />
        ))}
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-cyan-900/20" />

      {/* Main Loading Content */}
      <div className="relative z-10 text-center space-y-8 px-4">
        {/* Logo/Title */}
        <div className="space-y-4">
          <div className="flex justify-center space-x-4 mb-6">
            <Bitcoin 
              size={48} 
              className="text-neon-purple animate-neon-pulse" 
            />
            <Bitcoin 
              size={48} 
              className="text-neon-blue animate-neon-pulse" 
              style={{ animationDelay: '0.5s' }}
            />
            <Bitcoin 
              size={48} 
              className="text-neon-green animate-neon-pulse" 
              style={{ animationDelay: '1s' }}
            />
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-neon-purple via-neon-blue to-neon-green bg-clip-text text-transparent animate-glow">
            Tungky
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 animate-float">
            {message ? message : "Entering the Dashboard..."}
          </p>
        </div>

        {/* Loading Text with Animation */}
        <div className="text-lg text-gray-400 space-y-2">
          <div className="flex justify-center space-x-1">
            <span className="animate-bounce">L</span>
            <span className="animate-bounce" style={{ animationDelay: '0.1s' }}>o</span>
            <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>a</span>
            <span className="animate-bounce" style={{ animationDelay: '0.3s' }}>d</span>
            <span className="animate-bounce" style={{ animationDelay: '0.4s' }}>i</span>
            <span className="animate-bounce" style={{ animationDelay: '0.5s' }}>n</span>
            <span className="animate-bounce" style={{ animationDelay: '0.6s' }}>g</span>
          </div>
          
          <div className="text-sm text-gray-500">
            Connecting to blockchain network...
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="flex justify-center space-x-8 mt-8">
          <div className="w-3 h-3 bg-neon-purple rounded-full animate-ping" />
          <div className="w-3 h-3 bg-neon-blue rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
          <div className="w-3 h-3 bg-neon-green rounded-full animate-ping" style={{ animationDelay: '1s' }} />
        </div>
      </div>

      {/* Corner Decorative Elements */}
      <div className="absolute top-4 left-4 w-16 h-16 border-l-2 border-t-2 border-neon-purple animate-pulse" />
      <div className="absolute top-4 right-4 w-16 h-16 border-r-2 border-t-2 border-neon-blue animate-pulse" />
      <div className="absolute bottom-4 left-4 w-16 h-16 border-l-2 border-b-2 border-neon-green animate-pulse" />
      <div className="absolute bottom-4 right-4 w-16 h-16 border-r-2 border-b-2 border-neon-pink animate-pulse" />
    </div>
  );
};

export default LoadingPage;
