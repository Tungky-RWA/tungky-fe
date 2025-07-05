"use client"

import { useEffect, useRef, useState } from "react"
import { useWindowScroll } from "react-use"
import gsap from "gsap"
import { Link } from "react-router-dom"
import { Shield, Menu, X } from "lucide-react"
import { useSignerStatus } from "@account-kit/react"
// import { useSignerStatus } from "@account-kit/react"

// Asumsi warna primer dan aksen dari contoh Anda
const colors = {
  primary: '#007BFF', // Contoh warna biru primer
  accent: '#34D399',  // Contoh warna hijau/cyan aksen
}

const Navbar = () => {
  const navContainerRef = useRef<HTMLDivElement>(null)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isNavVisible, setIsNavVisible] = useState(true)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { y: currentScrollY } = useWindowScroll()




  const akunButton : any = ()=>{

    const signerStatus = useSignerStatus();

    // alert(signerStatus.isConnected)

    if(!signerStatus.isConnected){

      return(
        <div className="flex flex-row gap-3">
            <Link
            to="/register"
            onClick={() => setIsMenuOpen(false)}
            className="w-full text-center bg-primary/20 text-primary border border-primary/30 hover:bg-primary/30 px-5 py-3 rounded-lg transition-all duration-300 text-lg"
          >
            Register
          </Link>
          <Link
            to="/login"
            onClick={() => setIsMenuOpen(false)}
            className="w-full text-center bg-primary text-white px-5 py-3 rounded-lg transition-all duration-300 hover:bg-opacity-80 text-lg"
          >
            Login
          </Link>

        </div>


      )

    }

     if(signerStatus.isConnected){

         return(
          <div>
           
            <Link
              to="/brand"
              onClick={() => setIsMenuOpen(false)}
              className="w-full text-center bg-primary text-white px-5 py-3 rounded-lg transition-all duration-300 hover:bg-opacity-80 text-lg"
            >
              Dashboard
            </Link>

          </div>


      )

     }

  }

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
      if (!isMenuOpen) {
        setIsNavVisible(false)
      }
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
    currentScrollY > 10
      ? "bg-gray-900/80 backdrop-blur-md border-b border-white/10"
      : "border-b border-transparent"

  return (
    <div
      ref={navContainerRef}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 sm:top-4 sm:inset-x-4 sm:rounded-xl`}
    >
      <header className={`relative w-full transition-colors duration-300 ${navBackgroundClass} sm:rounded-xl`}>
        <nav className="flex h-16 max-w-7xl mx-auto items-center justify-between p-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 z-30 relative" onClick={() => setIsMenuOpen(false)}>
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 via-pink-500 to-cyan-500 rounded-xl flex items-center justify-center animate-glow">
              <span className="text-white font-bold">T</span>
            </div>
             <h2 className="font-bold text-lg blockchain-gradient text-white hidden sm:block">Tungky</h2>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                className="flex items-center gap-2 px-4 py-2 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-colors duration-200"
              >
                {item.icon && <item.icon size={16} />}
                <span>{item.label}</span>
              </Link>
            ))}
            {akunButton()}
          </div>
          

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden z-30 relative">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              className="text-white/90 hover:text-white transition-colors p-2 -m-2"
            >
              {isMenuOpen ? 
              <X size={28} />
              : 
              <Menu size={28} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && <div className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-10" onClick={() => setIsMenuOpen(false)} />}

      {/* Mobile Menu (Collapsible) */}
      <div
        className={`md:hidden fixed top-0 left-0 w-full bg-gray-900 border-b border-white/10 transition-transform duration-300 ease-in-out z-20 ${
          isMenuOpen ? "translate-y-0" : "-translate-y-full"
        } pt-20 pb-8 px-4 sm:rounded-b-xl shadow-lg min-h-screen sm:min-h-fit`}
      >

        <div className="flex flex-col items-center gap-4 mt-8">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              onClick={() => setIsMenuOpen(false)}
              className="w-full text-center flex items-center justify-center gap-3 px-4 py-3 text-lg text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors duration-200"
            >
              {item.icon && <item.icon size={20} />}
              <span>{item.label}</span>
            </Link>
          ))}
           <div className="w-full border-t border-white/10 my-4"></div>
            {akunButton()}
        </div>
      </div>
    </div>
  )
}

export default Navbar