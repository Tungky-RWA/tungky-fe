import { useGSAP } from "@gsap/react";
// import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from 'gsap/all';
import AnimatedTitle from "../../components/Layout/AnimatedTitle";

gsap.registerPlugin(ScrollTrigger);

const About = () => {

  useGSAP(() => {
    const clipAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: "#clip",
        start: "center center",
        end: "+=800 center",
        scrub: 0.5,
        pin: true,
        pinSpacing: true
      }
    })

    clipAnimation.to('.mask-clip-path', {
      width: '100%',
      height: '100vh',
      borderRadius: 0,
    })
  })


  return (
    <div id='about' className='min-h-screen w-screen'>
      <div className='relative mb-8 mt-36 flex flex-col items-center gap-5'>
        <h2 className='font-general text-md uppercase md:text[10px]'>
          Wellcome to Tungky
        </h2>

        <AnimatedTitle title="Build and Verify Real-World Assets for Everyone" containerClass="mt-5 !text-black text-center" />

        <div className="about-subtext">
          <p>Trust Physical Products in a Digital World</p>
          <p>Bring Real-World Assets On-Chain — Effortlessly</p>
        </div>
      </div>

      <div className="h-dvh w-screen" id="clip">
        <div className="mask-clip-path about-image">
          <img 
          src="/img/eth1.webp"
          alt="Background"
          className="absolute left-0 top-0 h-full size-full object-cover"
          // fill
          />

        </div>

      </div>
    </div>
  )
}

export default About