"use client"

import AnimatedTitle from "@/components/Layout/AnimatedTitle"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/all"
import { Sparkles, Layers } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const About = () => {
  useGSAP(() => {
    const imageContainer : any = document.querySelector("#image-reveal-container");
    if (!imageContainer) return;

    // --- Kalkulasi untuk Skala Fullscreen ---
    // Hitung berapa kali lipat elemen harus diperbesar agar memenuhi layar
    const scaleValue = Math.max(
      window.innerWidth / imageContainer.offsetWidth,
      window.innerHeight / imageContainer.offsetHeight
    ) * 1.05; // Diberi sedikit margin (5%) agar pasti menutupi semua sisi

    // Definisikan state clip-path "tirai"
    const closedCurtain = "polygon(50% 0%, 50% 0%, 50% 100%, 50% 100%)";
    const openCurtain = "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)";

    gsap.set(imageContainer, { clipPath: closedCurtain });

    const masterTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#animation-pin-trigger", // Gunakan trigger baru dari wrapper
        start: "center center",
        end: "+=3000",
        scrub: 0.8,
        pin: true,
      },
    });

    // --- SEQUENS ANIMASI BARU YANG DISEMPURNAKAN ---
    masterTimeline
      // Fase 1: Buka "Tirai"
      .to(imageContainer, {
        clipPath: openCurtain,
        ease: "power2.inOut",
        duration: 2,
      })
      // Fase 2: Munculkan Overlay (setelah tirai terbuka)
      .to("#image-overlay", {
        opacity: 0.7, // Set ke 0.7 agar tidak terlalu gelap
        ease: "power2.in",
        duration: 1,
      }, "-=0.5") // Mulai sedikit sebelum fase 1 selesai
      // Fase 3: Animasi Membesar (Scale Up) & Hilangkan Overlay
      .to(imageContainer, {
        scale: scaleValue, // Gunakan nilai skala yang sudah dihitung
        ease: "expo.inOut",
        duration: 3,
      }, ">") // Mulai setelah fase sebelumnya selesai
      .to("#image-overlay", {
        opacity: 0, // Animasikan opacity overlay kembali ke 0
        ease: "power3.inOut",
        duration: 2.5,
      }, "<") // Mulai bersamaan dengan animasi scale up
      // Fase 4: Munculkan Teks
      .to("#text-over-image", {
        opacity: 1,
        y: 0,
        ease: "power3.out",
        stagger: 0.15,
        duration: 2,
      }, ">-2"); // Mulai saat gambar hampir selesai membesar

  }, []);

  return (
    <section id="about" className="relative min-h-screen w-full bg-[#101418] pt-36 pb-0 overflow-hidden">
      <BackgroundGrid />
      {/* <div className="relative z-10"> */}
        <HeroSection />
        {/* <AnimatedRevealSection /> */}
      {/* </div> */}
    </section>
  );
};


// --- Perubahan Penting ada di Komponen AnimatedRevealSection ---

const AnimatedRevealSection = () => (
  // Buat sebuah wrapper untuk menjadi 'trigger' dan 'pin' target.
  // Ini penting agar 'scale' tidak mengganggu layout halaman.
  <div id="animation-pin-trigger" className="h-screen w-full flex justify-center items-center">
    {/* Kontainer ini yang akan kita animasikan 'clipPath' dan 'scale'-nya */}
    <div
      id="image-reveal-container"
      className="relative w-[90vw] max-w-5xl h-[500px] rounded-3xl overflow-hidden"
    >
      <img
        src="/img/monad3.jpg"
        alt="Real-world assets on blockchain"
        className="absolute left-0 top-0 h-full w-full object-cover"
      />
      {/* Overlay sekarang berada di dalam kontainer yang di-scale */}
      <div id="image-overlay" className="absolute inset-0 bg-black opacity-0" />
      <OverlayContent />
    </div>
  </div>
);


// Komponen lainnya tetap sama
const BackgroundGrid = () => (
  <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:36px_36px]" />
);
const HeroSection = () => (
  <div className="mb-32 flex flex-col items-center gap-5 px-6">
    <div className="inline-flex items-center gap-2.5 rounded-full border border-[#0077C0]/30 bg-[#0077C0]/10 px-4 py-2 shadow-sm">
      <Sparkles className="h-5 w-5 text-[#38B6FF]" />
      <h2 className="font-sans text-md font-medium tracking-wide uppercase text-[#C7EEFF]">Welcome to Tungky</h2>
    </div>
    <AnimatedTitle
      title="Build and Verify Real-World Assets for Everyone"
      containerClass="mt-4 !text-slate-50 text-center max-w-10xl "
      textClass="text-2xl md:text-4xl lg:text-5xl xl:text-6xl "
    />
    <div className="text-center text-lg text-white max-w-2xl mx-auto space-y-3 mt-6">
      <p>Trust Physical Products in a Digital World.</p>
      <p>Bring Real-World Assets On-Chain — Effortlessly.</p>
    </div>
  </div>
);
const OverlayContent = () => (
  <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-8">
    {/* <div id="text-over-image" className="flex flex-col items-center gap-4 opacity-0 transform translate-y-8">
      <div className="p-3 bg-white/10 rounded-full">
        <Layers className="w-8 h-8 text-white" />
      </div>
      <h3 className="text-3xl md:text-5xl font-bold text-center">Seamless Integration</h3>
      <p className="text-lg md:text-xl text-slate-300 max-w-xl text-center">
        Our platform provides the tools to tokenize, track, and transact physical assets with the unparalleled security of the blockchain.
      </p>
    </div> */}
  </div>
);

export default About;