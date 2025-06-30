"use client";
import React, { useEffect, useRef } from 'react'
import gsap from 'gsap';

const AnimatedTitle = ({title, containerClass}: any) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const titleAnimation = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "100 bottom",
          end: "top bottom",
          toggleActions: "play none none reverse",
        }
      })

      titleAnimation.to('.animated-word', {
        opacity: 1,
        transform: 'translate3d(0px, 0px, 0px) rotateY(0deg) rotateX(0deg)',
        ease: 'power2.inOut',
        stagger: 0.02,
      })
    }, containerRef)

    return () => ctx.revert();
  }, [])

  return (
    <div className={`animated-title ${containerClass}`} ref={containerRef}>
      {/* {title.split("<br/>").map((line: string, index: number) => ( */}
        <div  className='flex-center max-w-full flex-wrap gap-2 px-10 md:gap-3'>
          {title.split(" ").map((word: string, index: number) => (
            <span key={index} className='animated-word' dangerouslySetInnerHTML={{__html: word}} /> 
          ))}
        </div>
      {/* ))} */}
      {/* {<span className='animated-word' dangerouslySetInnerHTML={{__html: title}} /> } */}
    </div>
  )
}

export default AnimatedTitle