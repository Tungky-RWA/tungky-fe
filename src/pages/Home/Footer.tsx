import { FaDiscord, FaGithub, FaTwitch, FaTwitter } from 'react-icons/fa'

// PERUBAHAN: Menghapus prop 'color' dari ikon. Warnanya akan diatur oleh CSS (Tailwind).
const links = [
  { href: "https://discord.com", icon: <FaDiscord size={20} /> },
  { href: "https://twitter.com", icon: <FaTwitter size={20} /> },
  { href: "https://github.com", icon: <FaGithub size={20} /> },
  { href: "https://twitch.com", icon: <FaTwitch size={20} /> },
]

const Footer = () => {
  return (
    // PERUBAHAN: Latar belakang gelap, padding fleksibel, dan border atas
    <footer className='w-full bg-[#1D242B] py-8 border-t border-[#C7EEFF]/10'>
      <div className='container mx-auto flex flex-col items-center justify-between gap-6 px-4 md:flex-row'>
        {/* PERUBAHAN: Warna teks disesuaikan untuk tema gelap */}
        <p className='text-sm text-center text-[#C7EEFF]/60 md:text-left'>
         &copy; Tungky {new Date().getFullYear()}. All rights reserved
        </p>
        <div className='flex justify-center gap-2'>
          {links.map((link, index) => (
            // PERUBAHAN: Efek hover lebih baik dengan perubahan warna dan skala
            <a 
              key={index} 
              href={link.href} 
              target='_blank' 
              rel="noopener noreferrer"
              className='p-2 text-[#C7EEFF]/70 transition-all duration-300 rounded-full hover:text-white hover:bg-white/10 hover:scale-110'
              aria-label={`Follow us on ${link.href.split('.com')[0].split('//')[1]}`}
            >
              {link.icon}
            </a>
          ))}
        </div>
        {/* PERUBAHAN: Efek hover lebih jelas */}
        <a href='#privacy-policy' className='text-sm text-center text-[#C7EEFF]/60 hover:text-white hover:underline md:text-right'>
          Privacy Policy
        </a>
      </div>
    </footer>
  )
}

export default Footer;