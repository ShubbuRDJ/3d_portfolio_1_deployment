import React from 'react'
import { SectionWrapper } from '../hoc';
import { technologies } from '../constants';
import { BallCanvas } from './canvas';

const Tech = () => {
  return (
    <div className='flex flex-wrap flex-row justify-center gap-10'>
      {technologies.map((tech)=>(
        <div className="w-28 h-28" key={tech.name}>
          <BallCanvas icon={tech.icon} title={tech.name}/>
        </div>
      ))}
    </div>
  )
}

export default SectionWrapper(Tech,'tech')