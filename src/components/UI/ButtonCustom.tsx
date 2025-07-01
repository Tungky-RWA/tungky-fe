
import React from 'react';
import { Button } from '@/components/UI/button';
import { cn } from '@/lib/utils';

interface ButtonCustomProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost' | 'crypto' | 'neon';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

const ButtonCustom: React.FC<ButtonCustomProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className,
  onClick,
  disabled,
  type = 'button'
}) => {
  const variants = {
    primary: 'blockchain-button text-white font-medium shadow-lg hover:shadow-primary/30 web3-glow',
    secondary: 'bg-secondary/80 backdrop-blur-sm hover:bg-secondary text-secondary-foreground border border-border/50 hover:border-border/80',
    accent: 'bg-gradient-to-r from-accent to-cyan-400 hover:from-accent/90 hover:to-cyan-400/90 text-accent-foreground shadow-lg hover:shadow-accent/30 web3-glow',
    outline: 'neon-border bg-transparent hover:bg-primary/10 text-primary font-medium',
    ghost: 'hover:bg-muted/30 text-muted-foreground hover:text-foreground backdrop-blur-sm',
    crypto: 'bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 hover:from-purple-600 hover:via-pink-600 hover:to-cyan-600 text-white shadow-lg hover:shadow-purple-500/30 web3-glow',
    neon: 'bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white shadow-lg hover:shadow-cyan-400/30 web3-glow'
  };

  const sizes = {
    sm: 'h-8 px-3 text-xs',
    md: 'h-10 px-4 text-sm',
    lg: 'h-12 px-6 text-base'
  };

  return (
    <Button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'transition-all duration-300 font-medium relative overflow-hidden',
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </Button>
  );
};

export default ButtonCustom;
