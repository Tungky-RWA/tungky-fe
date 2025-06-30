import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

const Card: React.FC<CardProps> = ({ children, className = '', hover = false }) => {
  const hoverClasses = hover ? 'hover:shadow-2xl hover:scale-105 transition-all duration-300' : '';
  
  return (
    <div className={`bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/20 ${hoverClasses} ${className}`}>
      {children}
    </div>
  );
};

export default Card;