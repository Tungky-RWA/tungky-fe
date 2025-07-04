"use client"

import { useEffect, useRef, useState } from "react"
import { useWindowScroll } from "react-use"
import gsap from "gsap"
import { Link } from "react-router-dom"
import { Shield, Menu, X } from "lucide-react"

const Navbar = () => {
  const navContainerRef = useRef<HTMLDivElement>(null)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isNavVisible, setIsNavVisible] = useState(true)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { y: currentScrollY } = useWindowScroll()

  const navItems = [
    { path: "/brand", label: "Documentation", icon: Shield },
    { path: "/marketplace", label: "Marketplace" },
    { path: "/buyer", label: "Verify" },
  ]

  // Logic to show/hide navbar on scroll
  useEffect(() => {
    if (currentScrollY === 0) {
      setIsNavVisible(true)
    } else if (currentScrollY > lastScrollY) {
      // Jangan hide navbar jika mobile menu sedang terbuka
      if (!isMenuOpen) {
        setIsNavVisible(false)
      }
      // Tutup mobile menu ketika scroll down
      setIsMenuOpen(false)
    } else if (currentScrollY < lastScrollY) {
      setIsNavVisible(true)
    }
    setLastScrollY(currentScrollY)
  }, [currentScrollY, lastScrollY, isMenuOpen])


   

  // GSAP animation for navbar visibility
  useEffect(() => {
    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : "-120%",
      opacity: isNavVisible ? 1 : 0,
      duration: 0.3,
      ease: "power2.inOut",
    })
  }, [isNavVisible])

  // Close mobile menu if window is resized to be larger
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isMenuOpen])

  const navBackgroundClass =
    currentScrollY > 10 ? "bg-[#1D242B]/70 backdrop-blur-md border-b border-gray-700/50" : "border-b border-transparent"

  return (
    <div
      ref={navContainerRef}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 sm:top-4 sm:inset-x-4 sm:rounded-xl`}
    >
      <header className={`relative w-full transition-colors duration-300 ${navBackgroundClass} sm:rounded-xl`}>
        <nav className="flex h-16 max-w-7xl mx-auto items-center justify-between p-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 z-30 relative" onClick={() => setIsMenuOpen(false)}>
            <img src="/img/logo.png" alt="logo" className="h-8 w-auto" />
            <span className="text-xl font-bold text-[#FAFAFA]">Tungky</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                className="flex items-center gap-2 px-4 py-2 text-[#C7EEFF] hover:text-white hover:bg-white/10 rounded-lg transition-colors duration-200"
              >
                {item.icon && <item.icon size={16} />}
                <span>{item.label}</span>
              </Link>
            ))}
            <Link
              to="/register"
              className="bg-[#0077C0] text-white px-5 py-2 rounded-lg transition-all duration-300 hover:bg-opacity-80 hover:shadow-lg hover:shadow-[#0077C0]/30 ml-4"
            >
              Register
            </Link>
            
             <Link
              to="/login"
              className="bg-[#0077C0] text-white px-5 py-2 rounded-lg transition-all duration-300 hover:bg-opacity-80 hover:shadow-lg hover:shadow-[#0077C0]/30 ml-4"
            >
              Login
            </Link>
          </div>
          

          {/* Mobile Menu Button - dengan z-index tinggi */}
          <div className="flex items-center md:hidden z-30 relative">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              className="text-[#FAFAFA] hover:text-[#C7EEFF] transition-colors p-2 -m-2"
            >
              {isMenuOpen ? 
              // <X size={28} /> 
              <></>
              : 
              <Menu size={28} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && <div className="md:hidden fixed inset-0 bg-black/50 z-10" onClick={() => setIsMenuOpen(false)} />}

      {/* Mobile Menu (Collapsible) */}
      <div
        className={`md:hidden fixed top-[-20px] left-0 w-full bg-[#1D242B] transition-transform duration-300 ease-in-out z-20 ${
          isMenuOpen ? "translate-y-0 mt-[8px]" : "-translate-y-full"
        } pt-20 pb-8 px-4 sm:rounded-b-xl shadow-lg min-h-screen sm:min-h-fit`}
      >
        {/* Close button di dalam mobile menu untuk backup */}
        <button
          onClick={() => setIsMenuOpen(false)}
          className="absolute top-4 right-4 text-[#FAFAFA] hover:text-[#C7EEFF] transition-colors p-2 z-30"
          aria-label="Close menu"
        >
          <X size={24} />
        </button>

        <div className="flex flex-col items-center gap-4 mt-8">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              onClick={() => setIsMenuOpen(false)}
              className="w-full text-center flex items-center justify-center gap-3 px-4 py-3 text-lg text-[#C7EEFF] hover:text-white hover:bg-white/10 rounded-lg transition-colors duration-200"
            >
              {item.icon && <item.icon size={20} />}
              <span>{item.label}</span>
            </Link>
          ))}
          <Link
            to="/brand"
            onClick={() => setIsMenuOpen(false)}
            className="w-full text-center mt-4 bg-[#0077C0] text-white px-5 py-3 rounded-lg transition-all duration-300 hover:bg-opacity-80 text-lg"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Navbar
