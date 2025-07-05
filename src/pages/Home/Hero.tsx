"use client";

import { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Initial hidden states
      gsap.set("#video-frame", { scale: 1.1, clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" });
      gsap.set([subtitleRef.current, buttonRef.current], { opacity: 0, y: 30 });
      gsap.set(titleRef.current, { opacity: 0, y: 50 });
      gsap.set("#brand-logo", { opacity: 0, scale: 0.8, rotation: -10 });

      // Entry animations
      tl.to("#video-frame", {
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        scale: 1,
        duration: 1.5,
      })
      .to(titleRef.current, { opacity: 1, y: 0, duration: 1 }, "-=1")
      .to([subtitleRef.current, buttonRef.current], { opacity: 1, y: 0, duration: 0.8, stagger: 0.2 }, "-=0.5")
      .to("#brand-logo", { opacity: 1, scale: 1, rotation: 0, duration: 1, ease: "back.out(1.7)" }, "-=0.5");

      // Scroll-triggered parallax for content
      gsap.to(".hero-content", {
        yPercent: -30,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
      
      // Scroll-triggered video zoom
      gsap.to("#video-bg", {
        scale: 1.2,
        ease: "none",
        scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
        }
      });

      // Floating animation for brand logo
      gsap.to("#brand-logo", {
        y: -15,
        rotation: 3,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    },
    { scope: heroRef }
  );
  
  const getVideoSrc = (index: number) => `/videos/hero-${index}.mp4`;

  return (
    <div ref={heroRef} className="relative h-screen w-full overflow-hidden bg-gray-900">
      {/* Video Background Container */}
      <div id="video-frame" className="absolute inset-0 z-0 h-full w-full">
        <video
          id="video-bg"
          autoPlay
          loop
          muted
          playsInline
          className="absolute left-0 top-0 h-full w-full object-cover"
        >
          {/* Ganti dengan sumber video Anda yang relevan */}
          <source src={getVideoSrc(2)} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Gradient Overlay for readability */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-gray-900/80 via-gray-900/40 to-gray-900/80" />
      
      {/* Bottom fade to black */}
      <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-gray-900 to-transparent z-20" />

      {/* Main Content */}
      <div className="hero-content relative z-20 flex h-full flex-col justify-center">
        <div className="container mx-auto px-6 text-center">
          <div className="mx-auto max-w-4xl">
            {/* Main Title */}
            <h1
              ref={titleRef}
              className="text-5xl sm:text-7xl lg:text-8xl font-black mb-4 leading-tight tracking-tighter
                         bg-gradient-to-r from-white via-gray-300 to-primary bg-clip-text text-transparent"
            >
              TUNGKY
            </h1>

            {/* Subtitle */}
            <p
              ref={subtitleRef}
              className="text-lg sm:text-xl max-w-2xl mx-auto mb-8 text-white/70 font-light"
            >
              Secure Real-World Products with{" "}
              <span className="font-medium text-accent">Blockchain Technology</span>.
              Authenticate with NFC/QR, fight counterfeits, and build unbreakable trust.
            </p>

            {/* CTA Button */}
            <Link to="/register">
              <button
                ref={buttonRef}
                className="group relative inline-flex items-center justify-center px-8 py-3 text-lg font-bold text-white 
                           bg-primary rounded-lg transition-all duration-300 hover:bg-opacity-90 
                           hover:shadow-lg hover:shadow-primary/30 focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <span>Register Now</span>
                <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Brand Logo "RWA" */}
      <div id="brand-logo" className="absolute bottom-8 right-8 z-30">
        <h2 className="text-4xl sm:text-5xl font-black 
                       bg-gradient-to-r from-primary via-accent to-white 
                       bg-clip-text text-transparent drop-shadow-lg"
        >
          RWA
        </h2>
      </div>
    </div>
  );
};

export default Hero;
