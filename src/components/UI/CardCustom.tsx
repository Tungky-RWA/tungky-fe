
import React from 'react';
import { Card } from '@/components/UI/card';
import { cn } from '@/lib/utils';

interface CardCustomProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'glass' | 'gradient' | 'crypto' | 'neon';
}

const CardCustom: React.FC<CardCustomProps> = ({ 
  children, 
  className,
  variant = 'default',
  ...props
}) => {
  const variants = {
    default: 'bg-card border-border/50 hover:border-border/80',
    glass: 'crypto-glass backdrop-blur-xl',
    gradient: 'crypto-card backdrop-blur-xl',
    crypto: 'crypto-metric web3-glow',
    neon: 'neon-border crypto-glass'
  };

  return (
    <Card 
      className={cn(
        'transition-all duration-500 hover:scale-[1.02] animate-fade-in',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </Card>
  );
};

export default CardCustom;
