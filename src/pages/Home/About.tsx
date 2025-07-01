"use client"

import AnimatedTitle from "@/components/Layout/AnimatedTitle";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from 'gsap/all';
import { Sparkles } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const About = () => {

  useGSAP(() => {
    // Animasi GSAP untuk 'mengungkap' gambar saat di-scroll
    const clipAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: "#about-animation-trigger", // Menggunakan trigger yang lebih deskriptif
        start: "center center",
        end: "+=1000 center", // Durasi scroll lebih panjang untuk efek lebih smooth
        scrub: 0.5,
        pin: true,
        pinSpacing: true
      }
    });

    // Animasikan container gambar dari kecil & bulat menjadi layar penuh
    clipAnimation.to('#image-reveal-container', {
      width: '100vw',
      height: '100vh',
      borderRadius: 0,
      ease: 'power2.inOut' // Menambahkan easing untuk feel yang lebih baik
    });
  });

  return (
    <div id='about' className='min-h-screen w-full bg-[#1D242B] pt-36 pb-0'>
      {/* Bagian Teks Intro */}
      <div className='relative mb-24 flex flex-col items-center gap-5 px-4'>
        <div className="inline-flex items-center gap-2 bg-[#0077C0]/20 rounded-full px-4 py-2">
          <Sparkles className="w-5 h-5 text-[#C7EEFF]" />
          <h2 className='font-general text-md uppercase text-[#C7EEFF]'>
            Welcome to Tungky
          </h2>
        </div>

        <AnimatedTitle 
          title="Build and Verify Real-World Assets for Everyone" 
          // Mengubah warna teks menjadi terang agar terlihat di background gelap
          containerClass="mt-5 !text-[#FAFAFA] text-center" 
        />

        <div className="text-center text-lg text-[#C7EEFF]/80 max-w-2xl mx-auto space-y-2 mt-4">
          <p>Trust Physical Products in a Digital World.</p>
          <p>Bring Real-World Assets On-Chain — Effortlessly.</p>
        </div>
      </div>

      {/* Bagian Animasi ScrollTrigger */}
      <div 
        id="about-animation-trigger" 
        className="h-screen w-full flex justify-center items-center"
      >
        {/* Container ini yang akan dianimasikan oleh GSAP */}
        <div 
          id="image-reveal-container" 
          // State awal: lebih kecil, bulat, dan memiliki overflow hidden
          className="relative w-[50vw] h-[50vh] rounded-3xl overflow-hidden bg-white min-w-full"
        >
          <img 
            src="/img/monad3.jpg"
            alt="Real-world assets on blockchain"
            className="absolute left-0 top-0 h-full w-full object-contain"
          />
          {/* Overlay gelap untuk memastikan kontras yang baik */}
          <div className="absolute inset-0 bg-white/50" />
        </div>
      </div>
    </div>
  )
}

export default About;