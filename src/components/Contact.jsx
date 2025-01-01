import { motion } from 'framer-motion';
import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { styles } from '../style';
import { EarthCanvas } from './canvas';
import { SectionWrapper } from '../hoc';
import { slideIn } from '../utils/motion';
import toaster from './Toaster';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';


const initialValues = {
  name: '',
  email: '',
  message: '',
}


const Contact = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const contactSchema = Yup.object({
    email: Yup.string()
      .required("Please enter the Email ID to move ahead")
      .email("Please enter a valid Email ID."),
    name: Yup.string()
      .required("Please enter the Name to move ahead")
      .min(3, "Name too short should contain at least 3 characters.")
      .max(30, "Name too long should contain at most 30 characters.")
    ,
    message: Yup.string()
      .required("Please enter the Message to move ahead")
      .min(2, "Message too short should contain at least 2 characters.")
    ,
  })

  const { values, handleChange, handleBlur, handleSubmit, errors, touched } = useFormik({
    initialValues,
    validationSchema: contactSchema,
    onSubmit: (values) => {
      handleSend(values);
    }
  });

  const handleSend = async (values) => {
    if (!loading) {
      setLoading(true);
      try {
        const res = await emailjs.send('service_vynbx88', 'template_hvnhnaq', {
          from_name: values.name,
          to_name: 'Shubham Singh',
          from_email: values.email,
          to_email: 'shubham.1826.singh@gmail.com',
          message: values.message
        }, '_VdYfdPmnLp-9yfB6');
        if (res.status === 200) {
          toaster('success', "Thank you. I will get back to you as soon as possible.");
          setLoading(false);
          window.scrollTo({ top: [0, 0], behavior: 'smooth' });
          navigate('/')
        }
        else {
          toaster('error', 'Something went wrong');
          setLoading(false);
        }

      } catch (error) {
        toaster('error', 'Something went wrong');
        setLoading(false);
      }
    }
  }
  return (
    <div className='xl:mt-12 xl:flex-row flex-col-reverse flex gap-10 overflow-hidden'>
      <motion.div variants={slideIn('left', 'tween', 0.2, 1)} className='flex-[0.75] bg-black-100 p-8 rounded-2xl'>
        <p className={styles.sectionSubText}>Get in touch</p>
        <h3 className={styles.sectionHeadText}>Contact.</h3>
        <form onSubmit={handleSubmit} className='mt-12 flex flex-col gap-8'>
          <label className='flex flex-col'>
            <span className="text-white font-medium mb-4">Your Name</span>
            <input
              type="text"
              name='name'
              value={values?.name}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="What's your name?"
              className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium ' />
            {errors.name && touched.name ? (
              <p className="form-error">{errors.name}</p>
            ) : null}
          </label>
          <label className='flex flex-col'>
            <span className="text-white font-medium mb-4">Your Email</span>
            <input
              type="text"
              name='email'
              value={values?.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="What's your email?"
              className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium ' />
            {errors.email && touched.email ? (
              <p className="form-error">{errors.email}</p>
            ) : null}
          </label>
          <label className='flex flex-col'>
            <span className="text-white font-medium mb-4">Your Meassage</span>
            <textarea
              rows={7}
              name='message'
              value={values?.message}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="What do you want to say?"
              className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium ' />
            {errors.message && touched.message ? (
              <p className="form-error">{errors.message}</p>
            ) : null}
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