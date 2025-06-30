"use client";

import { useState, useRef } from "react";
import { TiLocationArrow } from "react-icons/ti";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Button from "../UI/ButtonCustom";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(2);
  const totalVideos = 2; // Assuming you have videos named hero1.mp4 and hero2.mp4
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null); // Ref for the main title container
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      // Initial setup: Hide elements and set video frame's initial clipPath
      gsap.set("#video-frame", {
        clipPath: "polygon(0 0, 66% 9%, 84% 86%, 0 100%)",
        scale: 1.1,
      });

      // Hide subtitle and button initially
      gsap.set([subtitleRef.current, buttonRef.current], {
        opacity: 0,
        y: 50,
      });

      // Hide brand logo initially
      gsap.set("#brand-logo", {
        opacity: 0,
        scale: 0.8,
        rotation: -10,
      });

      // **Initial setup for "Tungky" text typing effect:**
      // Start fully hidden from the right using clipPath
      gsap.set("#tungky-text", {
        clipPath: "inset(0% 100% 0% 0%)",
      });

      // Entry animations timeline
      tl.to("#video-frame", {
        scale: 1,
        duration: 2,
        ease: "power2.out",
      })
        .to(
          "#brand-logo",
          {
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 1,
            ease: "back.out(1.7)",
          },
          "-=1.5", // Start 1.5 seconds before video-frame animation ends
        )
        // **Animate "Tungky" text to reveal it (typing effect)**
        .to(
          "#tungky-text",
          {
            clipPath: "inset(0% 0% 0% 0%)", // Reveal the text completely
            duration: 1.5, // Duration of the typing effect
            ease: "power2.out",
          },
          "-=1", // Start 1 second before brand-logo animation ends
        )
        // Animate subtitle and button after "Tungky" is mostly revealed
        .to(
          [subtitleRef.current, buttonRef.current],
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.2, // Stagger their appearance
            ease: "power2.out",
          },
          "-=0.5", // Start 0.5 seconds after "Tungky" reveal begins
        );

      // Scroll-triggered animations for video frame
      gsap.to("#video-frame", {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", // Morph to full rectangle
        scale: 1.05,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: "#video-frame",
          start: "top center",
          end: "bottom center",
          scrub: 1, // Smoothly animate on scroll
        },
      });

      // Parallax effect for main content
      gsap.to(".hero-content", {
        y: -100, // Move content up
        opacity: 0.8, // Fade out slightly
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top", // When the top of the hero section hits the top of the viewport
          end: "bottom top", // When the bottom of the hero section hits the top of the viewport
          scrub: 1, // Smoothly animate on scroll
        },
      });

      // Floating animation for brand logo
      gsap.to("#brand-logo", {
        y: -20, // Move up and down
        rotation: 5, // Rotate slightly
        duration: 3,
        repeat: -1, // Loop indefinitely
        yoyo: true, // Go back and forth
        ease: "power2.inOut",
      });
    },
    { dependencies: [totalVideos], revertOnUpdate: true }, // Re-run animation if totalVideos changes
  );

  // Helper function to get video source based on index
  const getVideoSrc = (index: number) => `videos/hero${index}.mp4`;

  // Handler for the "Register Now!!!" button click
  const handleWatchTrailer = () => {
    gsap.to(buttonRef.current, {
      scale: 0.95, // Shrink slightly
      duration: 0.1,
      yoyo: true, // Go back to original size
      repeat: 1, // Do it once
      ease: "power2.inOut",
    });
    // You can add navigation or other actions here
  };

  return (
    <div ref={heroRef} className="relative h-screen w-full overflow-hidden">
      {/* Gradient Overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 z-10 bg-gradient-to-br from-[#5409DA]/80 via-transparent to-[#4E71FF]/30"
      />

      {/* Animated Background Elements (Decorative) */}
      <div className="absolute inset-0 z-10 bg-[#4E71FF]">
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-[#8DD8FF] to-[#BBFBFF] rounded-full opacity-20 animate-pulse" />
        <div className="absolute bottom-32 right-32 w-24 h-24 bg-gradient-to-r from-[#4E71FF] to-[#5409DA] rounded-full opacity-30 animate-bounce" />
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-[#BBFBFF] rounded-full opacity-25 animate-ping" />
      </div>

      {/* Video Frame Container */}
      <div id="video-frame" className="relative z-10 h-full w-full overflow-hidden">
        <div className="absolute inset-0">
          <video
            autoPlay
            loop
            muted
            className="absolute left-0 top-0 size-full object-fill object-center bg-black/50"
            // The video source depends on `currentIndex`. Adjust as needed if you only have one video.
          >
            <source
              src={getVideoSrc(currentIndex === totalVideos - 1 ? 1 : currentIndex)}
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Main Content (Text and Button) */}
        <div className="hero-content absolute inset-0 z-40 flex flex-col justify-center bg-gradient-to-br from-[#5409DA]/90 via-transparent to-[#4E71FF]/50">
          <div className="container mx-auto px-6 sm:px-8 lg:px-12">
            <div className="max-w-4xl">
              {/* Main Title "Tungky" */}
              <h1
                ref={titleRef}
                className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-black mb-6 leading-none"
              >
                <span
                  id="tungky-text" // ID to target with GSAP for the typing effect
                  className="block text-[#BBFBFF]  h-120 font-bold"
                >
                  Tungky
                </span>
              </h1>

              {/* Subtitle */}
              <p
                ref={subtitleRef}
                className="text-lg sm:text-xl lg:text-2xl xl:text-3xl max-w-3xl mb-8 text-white/90 font-medium leading-relaxed drop-shadow-lg"
              >
                Secure Real-World Products with{" "}
                <span className="text-[#4E71FF] font-bold">Blockchain</span>
                <br />
                Authenticate with NFC/QR. Fight fakes. Build trust.
              </p>

              {/* CTA Button */}
              <Button
                ref={buttonRef}
                onClick={handleWatchTrailer}
                className="group relative overflow-hidden bg-gradient-to-r from-[#4E71FF] to-[#5409DA] hover:from-[#5409DA] hover:to-[#4E71FF] text-[#5409DA] font-bold text-lg px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-2xl border-2 border-white/20"
              >
                <span className="relative z-10 flex items-center gap-3 font-bold text-[#BBFBFF]">
                  <TiLocationArrow className="text-xl group-hover:rotate-45 transition-transform duration-300" />
                  Register Now!!!
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Brand Logo "RWA" */}
      <div id="brand-logo" className="absolute bottom-8 right-8 z-50">
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black bg-gradient-to-r from-[#5409DA] via-[#4E71FF] to-[#8DD8FF] bg-clip-text text-transparent drop-shadow-xl">
          RWA
        </h2>
      </div>

      {/* Decorative Gradient Overlays */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/30 to-transparent z-20" />
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/20 to-transparent z-20" />
    </div>
  );
};

export default Hero;