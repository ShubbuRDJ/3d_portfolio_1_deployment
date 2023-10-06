import { styles } from '../style';
import { motion } from 'framer-motion';
import { ComputersCanvas } from './canvas';
import { useEffect, useState } from 'react';
import computerPng from '../assets/computerPNg.png';

const Hero = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    // add a listener for changes to the screen size 
    const mediaQuery = window.matchMedia('(max-width:670px)');
    // set the initialValue of the 'isMobile' state variable
    setIsMobile(mediaQuery.matches);
    // define a callback function to handle changes to the mediaQuery 
    const handleMediaQueryChange= (event)=>{
      setIsMobile(event.matches);
    }
    // add listener 
    mediaQuery.addEventListener('change',handleMediaQueryChange);
    // remove listeners 
    return ()=>{
      mediaQuery.removeEventListener('change',handleMediaQueryChange);
    }
  }, []);
  return (
      <section className="relative w-full h-screen mx-auto ">
        <div className={`${styles.paddingX} absolute inset-0 top-[120px] max-w-7xl mx-auto flex flex-row items-start gap-5 `}>
          <div className='flex flex-col justify-center items-center mt-5'>
            <div className='w-5 h-5 rounded-full bg-[#915eff]' />
            <div className='w-1 sm:h-80 h-40 violet-gradient' />
          </div>
          <div>
            <h1 className={`${styles.heroHeadText} text-white`}>Hi, I'm <span className='text-[#915eff]'>Shubham</span></h1>
            <p className={`${styles.heroSubText} mt-2 text-white-100`}>
              I develop React.js based full stack <br className='sm:block hidden' /> websites using MERN technologies.
            </p>
          </div>
        </div>
        {isMobile?<div className='p-10 relative w-full h-full top-[420px]'>
        <img src={computerPng} alt="Computer" className='w-full object-contain' />
        </div>:<ComputersCanvas />}
        
        <div className="absolute bottom-14 xs:bottom-0 w-full flex justify-center items-center">
          <a href="#about">
            <div className="w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2">
              <motion.div 
              animate={{y:[0,24,0]}}
              transition={{
                duration:1.5,
                repeat:Infinity,
                repeatType:'loop'
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