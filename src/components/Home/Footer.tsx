import { FaDiscord, FaGithub, FaTwitch, FaTwitter } from 'react-icons/fa'

const links = [
  { href: "https://discord.com", icon: <FaDiscord color='white' size={20} /> },
  { href: "https://twitter.com", icon: <FaTwitter color='white' size={20} /> },
  { href: "https://github.com", icon: <FaGithub color='white' size={20} /> },
  { href: "https://twitch.com", icon: <FaTwitch color='white' size={20} /> },
]

const Footer = () => {
  return (
    <footer className='w-screen bg-violet-300 py-4 h-20 text-black flex items-center text-white'>
      <div className='container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:flex-row '>
        <p className='text-center xl:text-lg  sm:text-sm md:text-left'>
         &copy; Terkoiz 2025. All rights reserved
        </p>
        <div className='flex justify-center gap-4 md:justify-start'>
          {links.map((link, index) => (
            <a key={index} href={link.href} target='_blank' className='text-black transition-colors duration-500 
            ease-in-out hover:text-white'>
              {link.icon}
            </a>
          ))}
        </div>
        <a href='#prifacy-policy' className='text-center  xl:text-lg sm:text-sm hover:underline md:text-right'>
          Privacy Policy

        </a>
      </div>

    </footer>
  )
}

export default Footer