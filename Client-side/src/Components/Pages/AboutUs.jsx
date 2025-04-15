// import React from 'react'
// import HomeLayout from '../Layout/HomeLayout'
// import aboutMainImg from '../../Assets/Images/aboutMainImage.png'
// import {Carousel_img} from './Celebrity_Aseest'
// import Carousel from './Carousel'
// function AboutUs() {
//   return (
//     <HomeLayout>
//      <div className="pl-20 pt-20 flex flex-col text-white">
//   <div className="flex items-center gap-5 mx-10">
//     <section className="w-1/2 space-y-10">
//       <h1 className="text-5xl text-yellow-500 font-semibold">
//         Affordable and Quality Education
//       </h1>
//       <p className="text-xl text-gray-300 text-center mx-auto max-w-3xl">
//    Education is the foundation of a brighter future. At our core, we believe 
//    that every individual, regardless of background or financial status, 
//    deserves access to high-quality learning opportunities. Our mission is to 
//     bridge the gap by making education affordable, accessible, and effective, 
//   ensuring that knowledge empowers and transforms lives.
// </p>

//     </section>

//     <div className="w-1/2">
//       <img
//         className="drop-shadow-2xl"
//         id="test1"
//         style={{
//           filter: "drop-shadow(0px 10px 10px rgb(0,0,0))",
//         }}
//         src={aboutMainImg}
//         alt="about the platform"
//       />
//     </div>
//   </div>

//   {/* Images Carousel */}
//   <div className="carousel w-1/2 my-16 m-auto  ">
//                 {
//                  Carousel_img.map((info)=>(
//                   <Carousel
//                      {...info}
//                      key={info.slideNumber}
//                      totalSlides ={Carousel_img.length}
//                   />
//                  ))
//                 }    
//  </div>
// </div>
//     </HomeLayout>
//   )
// }

// export default AboutUs


import React from 'react';
import HomeLayout from '../Layout/HomeLayout';
import aboutMainImg from '../../Assets/Images/aboutMainImage.png';
import { Carousel_img } from './Celebrity_Aseest';
import Carousel from './Carousel';

function AboutUs() {
  return (
    <HomeLayout>
      <div className="pt-20 px-4 md:px-20 text-white">
        {/* Hero Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Text */}
          <div className="md:w-1/2 space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-orange-400 leading-tight">
              Affordable and Quality Education
            </h1>
            <p className="text-base md:text-lg text-gray-300">
              Education is the foundation of a brighter future. We believe that every individual, regardless of background or financial status,
              deserves access to high-quality learning opportunities. Our mission is to bridge the gap by making education affordable, accessible,
              and effective—ensuring that knowledge empowers and transforms lives.
            </p>
          </div>

          {/* Image */}
          <div className="md:w-1/2 flex justify-center">
            <img
              src={aboutMainImg}
              alt="About"
              className="w-72 md:w-96 rounded-xl shadow-lg"
              style={{ filter: 'drop-shadow(0px 10px 15px rgba(0,0,0,0.9))' }}
            />
          </div>
        </div>

        {/* Carousel Section */}
        <div className="mt-20 w-full md:w-3/4 mx-auto">
          <h2 className="text-center text-3xl font-semibold mb-8 text-accent">Meet Our Celebrities</h2>
          <div className="carousel">
            {Carousel_img.map((info) => (
              <Carousel
                key={info.slideNumber}
                {...info}
                totalSlides={Carousel_img.length}
              />
            ))}
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}

export default AboutUs;
