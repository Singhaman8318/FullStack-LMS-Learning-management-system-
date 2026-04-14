

// import React from 'react';
// import HomeLayout from '../Layout/HomeLayout';
// import aboutMainImg from '../../Assets/Images/aboutMainImage.png';
// import { Carousel_img } from './Celebrity_Aseest';
// import Carousel from './Carousel';

// function AboutUs() {
//   return (
//     <HomeLayout>
//       <div className="pt-20 px-4 md:px-20 text-white">
//         {/* Hero Section */}
//         <div className="flex flex-col md:flex-row items-center justify-between gap-12">
//           {/* Text */}
//           <div className="md:w-1/2 space-y-6">
//             <h1 className="text-4xl md:text-5xl font-bold text-orange-400 leading-tight">
//               Affordable and Quality Education
//             </h1>
//             <p className="text-base md:text-lg text-gray-300">
//               Education is the foundation of a brighter future. We believe that every individual, regardless of background or financial status,
//               deserves access to high-quality learning opportunities. Our mission is to bridge the gap by making education affordable, accessible,
//               and effective—ensuring that knowledge empowers and transforms lives.
//             </p>
//           </div>

//           {/* Image */}
//           <div className="md:w-1/2 flex justify-center">
//             <img
//               src={aboutMainImg}
//               alt="About"
//               className="w-72 md:w-96 rounded-xl shadow-lg"
//               style={{ filter: 'drop-shadow(0px 10px 15px rgba(0,0,0,0.9))' }}
//             />
//           </div>
//         </div>

//         {/* Carousel Section */}
//         <div className="mt-20 w-full md:w-3/4 mx-auto">
//           <h2 className="text-center text-3xl font-semibold mb-8 text-accent">Meet Our Celebrities</h2>
//           <div className="carousel">
//             {Carousel_img.map((info) => (
//               <Carousel
//                 key={info.slideNumber}
//                 {...info}
//                 totalSlides={Carousel_img.length}
//               />
//             ))}
//           </div>
//         </div>
//       </div>
//     </HomeLayout>
//   );
// }

// export default AboutUs;

import React from 'react';
import HomeLayout from '../Layout/HomeLayout';
import aboutMainImg from '../../Assets/Images/aboutMainImage.png';
import { Carousel_img } from './Celebrity_Aseest';
import Carousel from './Carousel';
import { motion } from 'framer-motion';

function AboutUs() {
  return (
    <HomeLayout>
      <div className="min-h-[90vh] pt-12 md:pt-20 px-6 md:px-20 text-white flex flex-col items-center">
        
        {/* Hero Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-10 w-full max-w-7xl">
          
          {/* Text Section */}
          <motion.div
            className="md:w-1/2 space-y-6 text-center md:text-left"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h1 className="text-4xl md:text-6xl font-extrabold text-orange-500 leading-tight">
              Affordable and <span className="text-white">Quality Education</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-400 font-medium">
              Our mission is to bridge the gap by making education affordable, accessible,
              and effective. We ensure that knowledge empowers and transforms lives, 
              regardless of background.
            </p>
          </motion.div>

          {/* Image Section */}
          <motion.div
            className="md:w-1/2 flex justify-center items-center"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <img
              src={aboutMainImg}
              alt="About Education"
              className="w-full max-w-sm md:max-w-md drop-shadow-[0_20px_20px_rgba(0,0,0,0.8)] transition-all duration-500 hover:scale-105"
            />
          </motion.div>
        </div>

        {/* Carousel Section - Fixed Alignment */}
        <motion.div
          className="mt-24 w-full max-w-4xl"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-center text-3xl md:text-4xl font-bold mb-12 text-orange-500 italic">
            "Education is the most powerful weapon which you can use to change the world"
          </h2>
          
          {/* Carousel Wrapper */}
          <div className="carousel w-full overflow-hidden rounded-2xl bg-base-100/10 backdrop-blur-sm shadow-2xl relative">
            {Carousel_img && Carousel_img.map((info) => (
              <Carousel
                key={info.slideNumber}
                {...info}
                totalSlides={Carousel_img.length}
              />
            ))}
          </div>
        </motion.div>

        {/* Extra Space for Bottom */}
        <div className="h-20"></div>
      </div>
    </HomeLayout>
  );
}

export default AboutUs;