// import React from 'react';

// import HomeLayout from "../Layout/HomeLayout";
// import { Link } from "react-router-dom";
// import Homeimage2 from "../../Assets/Images/homePageMainImage.png";

// function HomePage() {
//   return (
//     <HomeLayout>
//       <div className="pt-10 text-white flex flex-col md:flex-row items-center justify-center gap-10 px-6 md:px-16 h-auto md:h-[90vh]">
//         {/* Left Section */}
//         <div className="w-full md:w-1/2 space-y-6 text-center md:text-left">
//           <h1 className="text-4xl md:text-6xl font-bold leading-tight">
//             Discover the Best <span className="text-yellow-400">Online Courses</span>
//           </h1>
//           <p className="text-lg md:text-xl text-gray-300">
//             Learn from top instructors with a vast library of quality courses tailored to help you succeed.
//           </p>

//           <div className="flex flex-col md:flex-row gap-4 md:gap-6">
//             <Link to="/courses">
//               <button className="btn btn-warning px-6 py-3 text-lg rounded-lg shadow-md hover:shadow-lg">
//                 Explore Courses
//               </button>
//             </Link>

//             <Link to="/contact-us">
//               <button className="btn btn-secondary px-6 py-3 text-lg rounded-lg shadow-md hover:shadow-lg">
//                 Contact Us
//               </button>
//             </Link>
//           </div>
//         </div>

//         {/* Right Section (Image) */}
//         <div className="w-full md:w-1/2 flex items-center justify-center py-5">
//           <div className="bg-white p-3 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300">
//             <img src={Homeimage2} alt="Home" className="w-full max-w-xs md:max-w-md rounded-lg" />
//           </div>
//         </div>
//       </div>
//     </HomeLayout>
//   );
// }

// export default HomePage;




import React from 'react';
import HomeLayout from "../Layout/HomeLayout";
import { Link } from "react-router-dom";
import Homeimage2 from "../../Assets/Images/homePageMainImage.png";
import code from "../../Assets/Images/code.jpg";

function HomePage() {
  return (
    <HomeLayout>
      <div className="pt-10 text-white flex flex-col md:flex-row items-center justify-center gap-10 px-6 md:px-16 h-auto md:h-[90vh]">
        {/* Left Section */}
        <div className="w-full md:w-1/2 space-y-6 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Discover the Best <span className="text-yellow-400">Online Courses</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300">
            Learn from top instructors with a vast library of quality courses tailored to help you succeed.
          </p>

          <div className="flex flex-col md:flex-row gap-4 md:gap-6">
            <Link to="/courses">
              <button className="btn btn-warning px-6 py-3 text-lg rounded-lg shadow-md hover:shadow-lg">
                Explore Courses
              </button>
            </Link>

            <Link to="/contact-us">
              <button className="btn btn-secondary px-6 py-3 text-lg rounded-lg shadow-md hover:shadow-lg">
                Contact Us
              </button>
            </Link>
          </div>
        </div>

        {/* Right Section (Image) */}
        <div className="w-full md:w-1/2 flex items-center justify-center py-5">
          <div className="bg-white p-3 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300">
            <img src={Homeimage2} alt="Home" className="w-full max-w-xs md:max-w-md rounded-lg" />
          </div>
        </div>
      </div>

      {/* Dark Mode Styled Section */}
      <div className="bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-center mb-8 text-white">
          Master Coding with Our Core Offerings
        </h2>


{/*  use loop to avoid the repeating card  */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-7xl mx-auto">
          {[
            { icon: '🧭', title: 'Beginner-Friendly', desc: 'Step-by-step courses designed for absolute beginners to kickstart their coding journey.' },
            { icon: '📚', title: 'Advanced Concepts', desc: 'Deep dive into advanced topics and frameworks to level up your skills.' },
            { icon: '< />', title: 'Real-World Projects', desc: 'Learn by building real-world projects and gain hands-on experience.' },
            { icon: '$', title: 'Affordable Pricing', desc: 'Access premium courses at prices tailored for students and professionals.' },
            { icon: '📄', title: 'Comprehensive Resources', desc: 'Gain access to a variety of coding resources such as templates, documentation, and code snippets.' },
            { icon: '📰', title: 'Industry Insights', desc: 'Stay updated with the latest trends and insights from the tech industry to keep your skills relevant.' },
          ].map(({icon, title, desc}, index) => (
            <div
              key={index}
              className="bg-gray-800 p-6 rounded-xl shadow-md text-center hover:shadow-lg transition-all"
            >
              <div className="flex justify-center mb-4">
                <div className="bg-gray-700 rounded-full w-14 h-14 flex items-center justify-center text-2xl text-yellow-400">
                  {icon}
                </div>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-white">{title}</h3>
              <p className="text-gray-300 mt-2 text-sm sm:text-base">{desc}</p>
            </div>
          ))}
        </div>
      </div>

<section className='bg-zinc-200 dark:bg-zinc-50 relative rounded-3xl m-5 '>
        {/* <div className='absolute  inset-0 z-0'>
          
        </div> */}
        <div class="flex flex-col justify-center text-center py-12 md:py-20 px-4 sm:px-6 relative z-10">
          <h2 class="text-3xl sm:text-6xl font-extrabold mb-4 sm:mb-6 text-zinc-900 dark:text-zinc-100 tracking-wide">Start Your Coding Journey</h2>
          <p class="text-base sm:text-xl text-zinc-700 dark:text-zinc-300 mb-8 sm:mb-12 leading-relaxed max-w-3xl mx-auto">Learn coding step-by-step with India's most loved programming mentor.</p>
          <div class="flex justify-center">
            <Link to="/login">
            <button class="inline-flex items-center justify-center gap-2  cursor-pointer
            whitespace-nowrap focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring 
            disabled:pointer-events-none disabled:opacity-50 
            shadow h-9 px-8 py-6 text-lg font-semibold rounded-md 
            border border-transparent transition-all duration-300 bg-primary text-primary-foreground 
            hover:bg-primary/90 dark:bg-primary dark:text-primary-foreground dark:hover:bg-primary/90">Start Now</button>
            </Link>
            </div>

            </div>
      </section>
    </HomeLayout>
  );
}

export default HomePage;
