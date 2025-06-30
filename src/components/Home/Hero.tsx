'use client';

import { useRef, useState } from "react";
import Button from "../UI/ButtonCustom";
import { TiLocationArrow } from "react-icons/ti";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger)

const Hero = () => {

  const [currentIndex, setCurrentIndex] = useState(2);
  const totalVideos = 2;

  useGSAP(() => {
    gsap.set('#video-frame', { 
      clipPath: 'polygon(0 0, 66% 9%, 84% 86%, 0 100%)',
      // borderRadius: '0 0 40% 10%',
    });

    gsap.from('#video-frame', {
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      borderRadius: '0 0 0 0',
      ease: 'power1.inOut',
      scrollTrigger: {
        trigger: '#video-frame',
        start: 'center center',
        end: 'bottom center',
        scrub: true
      }
    })
  }, {dependencies: [totalVideos], revertOnUpdate: true});


  const getVideoSrc = (index: number) => `videos/hero${index}.mp4`;


  return (
    <div className="relative h-dvh w-screen overflow-x-hidden">
      <div id="video-frame" className="relative z-10 h-dvh w-screen overflow-hidden bg-blue-75">
        <div>
          <video  
          autoPlay 
          loop muted 
          className="absolute left-0 top-0 size-full object-fill object-center"  > 
          <source src={getVideoSrc(currentIndex === totalVideos - 1 ? 1 : currentIndex)} type="video/mp4" />
          </video>
        </div>

        <h1 className="hero-heading absolute bottom-5 right-5 z-40 bg-gradient-to-r bg-clip-text text-transparent font-extrabold from-[#BBFBFF] via-[#8DD8FF] to-[#8DD8FF] text-shadow-lg " > RWA </h1>

        <div className="absolute left-0 top-0 z-40 size-full">
          <div className="mt-24 px-5 sm:px-10">
            <h1 className=" hero-heading bg-gradient-to-r bg-clip-text text-transparent font-extrabold from-[#BBFBFF] via-[#8DD8FF] to-[#8DD8FF] text-shadow-lg">Tungky </h1>
            
            <p className="mb-5 max-w-100 font-robert-regular text-blue-100 md:text-2xl lg:text-4xl lg:max-w-160 md:max-w-160 text-shadow-lg ">
              Secure Real-World Products with Blockchain <br /> Authenticate with NFC/QR. Fight fakes. Build trust.
            </p>

            <Button id="watch-triler" title="Watch Trailer" leftIcon={<TiLocationArrow />} 
            containerClass="bg-[#BBFBFF] flex-center gap-1" >
              Register Now!!!
            </Button>
          </div>

        </div>
 
      </div>

      <h1 className="special-font hero-heading absolute bottom-5 right-5 text-black  " > RWA </h1>
    </div>
  )
}

export default Hero