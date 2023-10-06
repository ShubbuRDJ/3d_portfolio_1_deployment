import { motion } from 'framer-motion';
import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { styles } from '../style';
import { EarthCanvas } from './canvas';
import { SectionWrapper } from '../hoc';
import { slideIn } from '../utils/motion';
import toaster from './Toaster';
import { useNavigate } from 'react-router-dom';


const Contact = () => {
  const formRef = useRef();
  const [formData, setformData] = useState({name:'',email:'',message:''});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await emailjs.send('service_vynbx88','template_hvnhnaq',{
        from_name:formData.name,
        to_name:'Shubham Singh',
        from_email:formData.email,
        to_email:'shubham.1826.singh@gmail.com',
        message:formData.message
      },'_VdYfdPmnLp-9yfB6');
      if(res.status === 200){
        setformData({name:'',email:'',message:''});
        toaster('success',"Thank you. I will get back to you as soon as possible.");
        setLoading(false);
        window.scrollTo({top:[0,0],behavior:'smooth'});
        navigate('/')
      }
      else{
        setformData({name:'',email:'',message:''});
        toaster('error','Something went wrong');
        setLoading(false);
      }

    } catch (error) {
      // console.log(error);
      setformData({name:'',email:'',message:''});
      toaster('error','Something went wrong');
      setLoading(false);
    }

  }
  return (
    <div className='xl:mt-12 xl:flex-row flex-col-reverse flex gap-10 overflow-hidden'>
      <motion.div variants={slideIn('left', 'tween', 0.2, 1)} className='flex-[0.75] bg-black-100 p-8 rounded-2xl'>
        <p className={styles.sectionSubText}>Get in touch</p>
        <h3 className={styles.sectionHeadText}>Contact.</h3>
        <form ref={formRef} onSubmit={handleSubmit} className='mt-12 flex flex-col gap-8'>
          <label className='flex flex-col'>
            <span className="text-white font-medium mb-4">Your Name</span>
            <input type="text" name='name' value={formData.name} onChange={handleChange} placeholder="What's your name?" className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium ' />
          </label>
          <label className='flex flex-col'>
            <span className="text-white font-medium mb-4">Your Email</span>
            <input type="text" name='email' value={formData.email} onChange={handleChange} placeholder="What's your email?" className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium ' />
          </label>
          <label className='flex flex-col'>
            <span className="text-white font-medium mb-4">Your Meassage</span>
            <textarea rows={7} name='message' value={formData.message} onChange={handleChange} placeholder="What do you want to say?" className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium ' />
          </label>
          <button type="submit" className='bg-tertiary py-3 px-8 outline-none w-fit text-white font-bold shadow-md shadow-primary rounded-xl ' >{loading ? 'Sending...' : 'Send'}</button>
        </form>
      </motion.div>

      <motion.div variants={slideIn('right', 'tween', 0.2, 1)} className='xl:flex-1 xl:h-auto md:h-[550px] h-[350px] ' >
        <EarthCanvas />
      </motion.div>

    </div>
  )
}

export default SectionWrapper(Contact, 'contact')