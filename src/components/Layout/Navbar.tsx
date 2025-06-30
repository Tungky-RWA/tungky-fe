"use client";
import { useEffect, useRef, useState } from 'react'
import { useWindowScroll } from 'react-use';
import gsap from 'gsap';
import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';

const Navbar = () => {
  const navContainerRef = useRef<HTMLDivElement>(null);

  const [lastScrollY, setLastScrollY] = useState(0);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const { y: currentScrollY } = useWindowScroll();

  // const navItems = ['Nexus', 'Vault', 'Prologue', 'About', 'Contact'];

  const navItems = [
    { path: '/brand', label: 'Documentation', icon: Shield },
    { path: '/marketplace', label: 'Marketplace',  },
    { path: '/verify', label: 'Verify',  },
    // { path: '/brand/product', label: 'Product Service', },
    // { path: '/brand/nfc', label: 'NFC Service',  },
    // { path: '/brand/qr', label: 'QR Code Service',  },
    // { path: '/brand/help', label: 'Help Service',  },
  ];


  useEffect(() => {
    if(currentScrollY == 0 ){
      setIsNavVisible(true);
      navContainerRef.current?.classList.remove('floating-nav');
    } else if (currentScrollY > lastScrollY){
      setIsNavVisible(false);
      navContainerRef.current?.classList.add('floating-nav');
    } else if (currentScrollY < lastScrollY){
      setIsNavVisible(true);
      navContainerRef.current?.classList.add('floating-nav');
    }

    setLastScrollY(currentScrollY)
  }, [currentScrollY])

  useEffect(() => {
    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.05,
    })
  }, [isNavVisible])
  

  return (
    <div ref={navContainerRef} className={`fixed inset-x-0 top-4 z-50 h-10 border-none transition-all duration-400 sm:inset-x-6
      ${currentScrollY != 0 ? 'nav-color-animation' : ''} opacity-0 `}>
      <header className='absolute top-1/2 w-full -translate-y-1/2 '>
      <nav className='flex size-full items-center justify-between p-4'>
        <div className='flex items-center gap-7'>
          <Link to="/" className="flex items-center space-x-2">
            <img src='/img/logo.png' alt='logo' className='h-8' />
            <span className="text-xl bg-gradient-to-r bg-clip-text text-transparent font-bold from-[#8ed2ff] to-[#cfeeff] text-shadow-lg">Tungky</span>
          </Link>
          
          {/* <Button id="product-button" title="Product" 
          rightIcon={<TiLocationArrow />} 
          containerClass='bg-blue-50 md:flex hidden items-center justify-center gap-1 h-7 '
          /> */}
        </div>

        <div className='flex h-full items-center'>
          <div className='hidden md:block'>
            {navItems.map((item) => (
              <a className='nav-hover-btn' key={item.label} >
                {item.label}
              </a>
            ))}
          </div>
          <Link
            to="/brand"
            className=" hover:bg-blue-400 text-white px-4 py-2 rounded-lg transition-colors ml-10 nav-hover-btn"
          >
            Register
          </Link>
        </div>

      </nav>

      </header>

    </div>
  )
}

export default Navbar