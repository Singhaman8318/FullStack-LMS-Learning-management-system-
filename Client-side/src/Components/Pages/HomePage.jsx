
// import React from "react";
// import HomeLayout from "../Layout/HomeLayout";
// import { Link } from "react-router-dom";
// // import {Homeimage} from "../../Assets/Images/homePageMainImage.png";
// import Homeimage2 from "../../Assets/Images/homePageMainImage.png";

// function HomePage() {

   
//   return (
//     <HomeLayout>
//       <div className="pt-10 text-white flex flex-col md:flex-row items-center justify-center gap-10 px-4 md:mx-16 h-auto md:h-[90vh]">
//         {/* Left Section */}
//         <div className="w-full md:w-1/2 space-y-6 text-center md:text-left">
//           <h1 className="text-3xl md:text-5xl font-semibold">
//             Find out the best <span className="text-yellow-500 font-semibold">online courses</span>
//           </h1>
//           <p className="text-lg md:text-xl text-gray-200">
//             We have a large library of courses taught by highly skilled and qualified faculty.
//           </p>

//           <div className="flex flex-col md:flex-row gap-4 md:space-x-6">
//             <Link to="/courses">
//               <button className="bg-yellow-500 cursor-pointer rounded-md px-5 py-3 md:py-5 font-semibold hover:bg-amber-500 transition-all ease-in-out duration-300">
//                 Explore Courses
//               </button>
//             </Link>

//             <Link to="/contact-us">
//               <button className="bg-gray-600 cursor-pointer rounded-md px-5 py-3 md:py-5 font-semibold hover:bg-amber-500 transition-all ease-in-out duration-300">
//                 Contact Us
//               </button>
//             </Link>
//           </div>
//         </div>

//         {/* Right Section (Image) */}
//         <div className="w-full md:w-1/2 flex items-center justify-center py-5">
//           <img src={Homeimage2} alt="Home image" className="w-full max-w-sm md:max-w-md" />
//         </div>
//       </div>
//     </HomeLayout>
//   );
// }

// export default HomePage;



import React from "react";
import HomeLayout from "../Layout/HomeLayout";
import { Link } from "react-router-dom";
import Homeimage2 from "../../Assets/Images/homePageMainImage.png";

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
    </HomeLayout>
  );
}

export default HomePage;
