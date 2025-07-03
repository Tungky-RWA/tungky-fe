import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Hero from './Home/Hero';
import Navbar from '../components/Layout/Navbar';
import Header from '../components/Layout/Header';
import About from './Home/About';
import Footer from './Home/Footer';
import NFTLending from './Home/NFTLending';
import ValueProposition from '@/pages/Home/Value';
import HowItWorks from './Home/Step';
import TargetUser from '@/pages/Home/TargetUser';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const HomePage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const middleLayerRef = useRef<HTMLDivElement>(null);
  const foregroundRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const howItWorksRef = useRef<HTMLDivElement>(null);
  const targetAudienceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set('.fade-in-element', { opacity: 0, y: 50 });
      gsap.set('.slide-in-left', { opacity: 0, x: -100 });
      gsap.set('.slide-in-right', { opacity: 0, x: 100 });
      gsap.set('.scale-in', { opacity: 0, scale: 0.8 });
      gsap.set('.rotate-in', { opacity: 0, rotation: -10 });

      // Hero section parallax layers
      if (backgroundRef.current && middleLayerRef.current && foregroundRef.current) {
        // Background layer - slowest
        gsap.to(backgroundRef.current, {
          yPercent: -50,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });

        // Middle layer - medium speed
        gsap.to(middleLayerRef.current, {
          yPercent: -30,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });

        // Foreground layer - fastest
        gsap.to(foregroundRef.current, {
          yPercent: -20,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
      }

      // Hero content animation
      if (heroContentRef.current) {
        const heroTl = gsap.timeline();
        heroTl
          .from('.hero-title', {
            duration: 1.2,
            y: 100,
            opacity: 0,
            ease: "power3.out",
            stagger: 0.2
          })
          .from('.hero-subtitle', {
            duration: 1,
            y: 50,
            opacity: 0,
            ease: "power2.out"
          }, "-=0.5")
          .from('.hero-buttons', {
            duration: 0.8,
            y: 30,
            opacity: 0,
            ease: "back.out(1.7)"
          }, "-=0.3");
      }

      // Features section animations
      if (featuresRef.current) {
        gsap.from('.feature-card', {
          duration: 0.8,
          y: 80,
          opacity: 0,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: featuresRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        });

        // Feature icons rotation on scroll
        gsap.to('.feature-icon', {
          rotation: 360,
          duration: 2,
          ease: "none",
          scrollTrigger: {
            trigger: featuresRef.current,
            start: "top 80%",
            end: "bottom 20%",
            scrub: 1
          }
        });
      }

      // How it works section
      if (howItWorksRef.current) {
        const steps = gsap.utils.toArray('.step-item');
        steps.forEach((step: any, index) => {
          gsap.from(step, {
            duration: 0.8,
            y: 60,
            opacity: 0,
            ease: "power2.out",
            scrollTrigger: {
              trigger: step,
              start: "top 85%",
              toggleActions: "play none none reverse"
            },
            delay: index * 0.2
          });
        });

        // Step numbers animation
        gsap.from('.step-number', {
          duration: 1,
          scale: 0,
          rotation: 180,
          ease: "back.out(1.7)",
          stagger: 0.2,
          scrollTrigger: {
            trigger: howItWorksRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse"
          }
        });
      }

      // Target audience section
      if (targetAudienceRef.current) {
        gsap.from('.audience-card', {
          duration: 1,
          y: 100,
          opacity: 0,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: targetAudienceRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse"
          }
        });
      }

      // Floating elements animation
      gsap.to('.floating-element', {
        y: -20,
        duration: 3,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.5
      });

      // Interactive hover animations for buttons
      const buttons = gsap.utils.toArray('.interactive-button');
      buttons.forEach((button: any) => {
        const tl = gsap.timeline({ paused: true });
        tl.to(button, {
          scale: 1.05,
          duration: 0.3,
          ease: "power2.out"
        })
        .to(button.querySelector('.button-icon'), {
          x: 5,
          duration: 0.3,
          ease: "power2.out"
        }, 0);

        button.addEventListener('mouseenter', () => tl.play());
        button.addEventListener('mouseleave', () => tl.reverse());
      });

      // Card hover animations
      const cards = gsap.utils.toArray('.hover-card');
      cards.forEach((card: any) => {
        const tl = gsap.timeline({ paused: true });
        tl.to(card, {
          y: -10,
          scale: 1.02,
          duration: 0.4,
          ease: "power2.out"
        })
        .to(card.querySelector('.card-icon'), {
          rotation: 10,
          scale: 1.1,
          duration: 0.4,
          ease: "power2.out"
        }, 0);

        card.addEventListener('mouseenter', () => tl.play());
        card.addEventListener('mouseleave', () => tl.reverse());
      });

      // Scroll progress indicator
      gsap.to('.scroll-progress', {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true
        }
      });

      // Text reveal animations
      const textElements = gsap.utils.toArray('.text-reveal');
      textElements.forEach((text: any) => {
        gsap.from(text, {
          duration: 1,
          y: 100,
          opacity: 0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: text,
            start: "top 90%",
            toggleActions: "play none none reverse"
          }
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-screen w-full overflow-x-hidden">
      {/* Scroll Progress Indicator */}
      <div className="fixed top-0 left-0 w-full h-1 z-50">
        <div className="scroll-progress h-full bg-gradient-to-r from-primary to-accent origin-left scale-x-0"></div>
      </div>

      {/* <Header showNavigation /> */}
      <Navbar />
      
      {/* Hero Section with Parallax */}
      <section ref={heroRef} className="relative overflow-hidden w-full bg-[#BBFBFF]">
        {/* Background Layer */}
        

        {/* Foreground Content */}
        {/* <div ref={foregroundRef} className="relative z-10 w-full">
          <div ref={heroContentRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
            <div className="text-center">
              <h1 className="hero-title text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                <span className="block">Mewujudkan masa depan keuangan:</span>
                <span className="text-primary block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Anti-pemalsuan dengan RWA di Blockchain!
                </span>
              </h1>
              <p className="hero-subtitle text-xl text-white/80 mb-8 max-w-4xl mx-auto leading-relaxed">
                Sebuah ekosistem terpercaya yang memberdayakan brand untuk mengamankan dan memverifikasi 
                produk fisik mereka melalui teknologi blockchain dan NFC/QR, serta memberikan pengalaman 
                otentikasi yang tak tertandingi bagi konsumen.
              </p>
              <div className="hero-buttons flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link to="/brand" className="interactive-button">
                  <Button variant="primary" size="lg" className="group">
                    <Shield className="button-icon w-5 h-5 mr-2 transition-transform" />
                    Daftar sebagai Brand
                  </Button>
                </Link>
                <Link to="/buyer" className="interactive-button">
                  <Button variant="accent" size="lg" className="group">
                    <CheckCircle className="button-icon w-5 h-5 mr-2 transition-transform" />
                    Verifikasi Produk
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div> */}
        < Hero/>
        < NFTLending/>
        < About/>
      </section>

      {/* Value Propositions */}
      {/* <section ref={featuresRef} className="py-20 relative "> */}
        {/* < ValueProposition  /> */}
      {/* </section> */}

      < HowItWorks />

      {/* How It Works */}
      {/* <section ref={howItWorksRef} className="py-20 bg-white/5 relative bg-gradient-to-r from-primary to-accent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-reveal text-3xl lg:text-4xl font-bold text-white mb-4">
              Cara Kerja Platform
            </h2>
            <p className="text-reveal text-xl text-white/60 max-w-2xl mx-auto">
              Proses sederhana untuk autentikasi produk yang aman dan terpercaya
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            <div className="step-item text-center">
              <div className="step-number bg-primary/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Brand Mints NFT</h3>
              <p className="text-white/70">Brand mendaftarkan produk dan minting NFT di blockchain</p>
            </div>

            <div className="step-item text-center">
              <div className="step-number bg-accent/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-accent">2</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Attach NFC/QR</h3>
              <p className="text-white/70">NFC tag atau QR code ditempelkan pada produk fisik</p>
            </div>

            <div className="step-item text-center">
              <div className="step-number bg-primary/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Buyer Scans</h3>
              <p className="text-white/70">Konsumen scan NFC/QR untuk verifikasi produk</p>
            </div>

            <div className="step-item text-center">
              <div className="step-number bg-accent/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-accent">4</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Web Verification</h3>
              <p className="text-white/70">Hasil verifikasi ditampilkan di web interface</p>
            </div>
          </div>
        </div>
      </section> */}
      <TargetUser />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;