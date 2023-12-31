import { motion } from 'framer-motion';
import React from 'react';
import  Tilt  from 'react-parallax-tilt';

import { styles } from '../style';
import { services } from '../constants';
import { fadeIn, textVariant } from '../utils/motion';
import { SectionWrapper } from '../hoc';

const ServiceCard = ({ index, title, icon }) => {
  return (

    <Tilt className='xs:w-[250px] w-full'>
      <motion.div variants={fadeIn('right', 'spring', 0.5 * index, 0.75)} className='w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card'>
        <div options={{ max: 45, scale: 1, speed: 450 }} className='min-h-[280px] flex rounded-[20px] bg-tertiary py-5 px-12 justify-evenly items-center flex-col'>
          <img src={icon} alt={title} className='w-16 h-16 object-contain' />
          <h3 className='text-white font-bold text-[20px] text-center'>{title}</h3>
        </div>
      </motion.div>
    </Tilt>
  )
}

const About = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>Overview.</h2>
      </motion.div>
      <motion.p className='mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]' variants={fadeIn('', '', 0.1, 1)}>
      I'm an emerging Software Development Engineer (SDE) with a solid foundation in JavaScript and a growing proficiency in key frameworks like React.js, Node.js, Express.js and Three.js for 3d designs. My journey into the world of software development is fueled by a deep passion for creating efficient, user-friendly solutions to real-world challenges.
      </motion.p>
      <div className="flex flex-wrap mt-20 gap-10">
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  )
}

export default SectionWrapper(About, 'about')