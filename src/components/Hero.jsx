import { styles } from '../style';
import './hero.css';
import { motion } from 'framer-motion';
import { ComputersCanvas, ReactLogoCanvas } from './canvas';
import { useEffect, useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const Hero = () => {
  const heroMainRef = useRef();
  const heroDescRef = useRef();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // add a listener for changes to the screen size 
    const mediaQuery = window.matchMedia('(max-width:670px)');
    // set the initialValue of the 'isMobile' state variable
    setIsMobile(mediaQuery.matches);
    // define a callback function to handle changes to the mediaQuery 
    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    }
    // add listener 
    mediaQuery.addEventListener('change', handleMediaQueryChange);
    // remove listeners 
    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
    }
  }, []);

  useGSAP(() => {

    gsap.from(heroMainRef.current, {
      opacity: 0,
      duration: 1,
      delay: 2,
    })
    gsap.from('.herogsap-text-animation', {
      opacity: 0,
      y: 80,
      duration: 0.6,
      delay: 2.5,
      stagger: 0.15,
    })
    gsap.from('.herogsap-text-animation2', {
      opacity: 0,
      y: 80,
      duration: 0.6,
      delay: 2.5,
      stagger: -0.15,
    })
    gsap.from(heroDescRef?.current, {
      opacity: 0,
      y: 80,
      duration: 0.6,
      delay: 3.1,
    })
  })


  return (
    <section className="relative w-full h-screen mx-auto ">
      <div ref={heroMainRef} className={`${styles.paddingX} absolute inset-0 top-[120px] max-w-7xl mx-auto flex flex-row items-start gap-5 `}>
        <div className='flex flex-col justify-center items-center mt-5'>
          <div className='w-5 h-5 rounded-full bg-[#915eff]' />
          <div className='w-1 sm:h-80 h-40 violet-gradient' />
        </div>
        <div>
          <h1 style={{ overflow:'hidden' }} className={`${styles.heroHeadText} text-white`}>
            <span className='herogsap-text-animation'>H</span>
            <span className='herogsap-text-animation'>i</span>
            <span className='herogsap-text-animation'>,</span>
            <span className='herogsap-text-animation'>&nbsp;</span>
            <span className='herogsap-text-animation'>I</span>
            <span className='herogsap-text-animation'>'</span>
            <span className='herogsap-text-animation'>m</span>
            <span className='herogsap-text-animation'>&nbsp;</span>
            <span className='text-[#915eff]'>
              <span className='herogsap-text-animation2'>S</span>
              <span className='herogsap-text-animation2'>h</span>
              <span className='herogsap-text-animation2'>u</span>
              <span className='herogsap-text-animation2'>b</span>
              <span className='herogsap-text-animation2'>h</span>
              <span className='herogsap-text-animation2'>a</span>
              <span className='herogsap-text-animation2'>m</span>
            </span>
          </h1>
          <p ref={heroDescRef} className={`${styles.heroSubText} mt-2 text-white-100`}>
            a Full Stack Developer specializing in MERN <br className='sm:block hidden' /> (MongoDB/MySQL, Express.js, React.js, Node.js) technologies.
          </p>
        </div>
      </div>

      {isMobile ? <ReactLogoCanvas /> : <ComputersCanvas />}

      <div className="absolute bottom-14 xs:bottom-3 w-full flex justify-center items-center">
        <a href="#about">
          <div className="w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2">
            <motion.div
              animate={{ y: [0, 24, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: 'loop'
              }}
              className='w-3 h-3 rounded-full bg-secondary mb-1'
            />
          </div>
        </a>
      </div>
    </section>
  )
}

export default Hero