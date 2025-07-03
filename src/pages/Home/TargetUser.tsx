"use client"

import { Link } from 'react-router-dom';
import { Shield, Users, CheckCircle, ArrowRight } from 'lucide-react';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger);

function TargetUser() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useGSAP(() => {
    gsap.from(".target-user-card", {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
      opacity: 0,
      y: 50,
      duration: 0.8,
      stagger: 0.2,
      ease: "power3.out",
    });
  }, { scope: containerRef });
  
  return (
    // PERUBAHAN: Latar belakang diubah menjadi putih
    <section ref={containerRef} className="py-24 relative bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            {/* PERUBAHAN: Warna teks header diubah menjadi gelap */}
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Designed For
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A platform built for every role within the product authentication ecosystem.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Kartu 1: Brands */}
            <div className="target-user-card">
              {/* PERUBAHAN: Gaya kartu disesuaikan untuk latar belakang terang */}
              <div className="group flex flex-col h-full rounded-2xl p-8 text-center bg-white border border-gray-200 transition-all duration-300 hover:border-gray-300 hover:-translate-y-2 hover:shadow-xl">
                <div className="flex justify-center items-center h-20 w-20 rounded-full bg-gradient-to-br from-[#1D242B] to-[#0077C0] mx-auto mb-6 shadow-lg">
                  <Shield className="h-10 w-10 text-[#C7EEFF]" />
                </div>
                {/* PERUBAHAN: Warna teks kartu diubah menjadi gelap */}
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">Brands / MSMEs</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Businesses seeking to protect products from counterfeiting and provide authenticity assurance.
                </p>
                {/* Tombol dipertahankan sebagai aksen warna */}
                <Link to="/brand" className="inline-flex items-center justify-center px-6 py-2 mt-auto font-semibold text-[#0077C0] border-2 border-[#0077C0] rounded-full hover:bg-[#0077C0] hover:text-white transition-colors duration-300 group">
                  Get Started
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* Kartu 2: Consumers */}
            <div className="target-user-card">
              <div className="group flex flex-col h-full rounded-2xl p-8 text-center bg-white border border-gray-200 transition-all duration-300 hover:border-gray-300 hover:-translate-y-2 hover:shadow-xl">
                <div className="flex justify-center items-center h-20 w-20 rounded-full bg-gradient-to-br from-[#1D242B] to-[#0077C0] mx-auto mb-6 shadow-lg">
                  <Users className="h-10 w-10 text-[#C7EEFF]" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">Consumers & Collectors</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Individuals who want to verify product authenticity, and collectors who value genuine items.
                </p>
                <Link to="/buyer" className="inline-flex items-center justify-center px-6 py-2 mt-auto font-semibold text-[#0077C0] border-2 border-[#0077C0] rounded-full hover:bg-[#0077C0] hover:text-white transition-colors duration-300 group">
                  Verify Product
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* Kartu 3: Administrators */}
            <div className="target-user-card">
              <div className="group flex flex-col h-full rounded-2xl p-8 text-center bg-white border border-gray-200 transition-all duration-300 hover:border-gray-300 hover:-translate-y-2 hover:shadow-xl">
                <div className="flex justify-center items-center h-20 w-20 rounded-full bg-gradient-to-br from-[#1D242B] to-[#0077C0] mx-auto mb-6 shadow-lg">
                  <CheckCircle className="h-10 w-10 text-[#C7EEFF]" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">Administrators</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Platform managers responsible for overseeing operations, validating brands, and maintaining security.
                </p>
                <Link to="/admin" className="inline-flex items-center justify-center px-6 py-2 mt-auto font-semibold text-[#0077C0] border-2 border-[#0077C0] rounded-full hover:bg-[#0077C0] hover:text-white transition-colors duration-300 group">
                  Admin Panel
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>
  )
}

export default TargetUser;