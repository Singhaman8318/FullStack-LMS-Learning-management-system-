
// import React from "react";
// import { useNavigate } from "react-router-dom";

// function CourseCard({ data }) {
//   const navigate = useNavigate();

//   return (
//     <div
//     /// send the data in pther compnet in navigate 
//       onClick={() => navigate("/course/description/" ,{state:{...data}})}
//       className="card w-80 bg-base-100 shadow-lg cursor-pointer hover:shadow-xl transition-all duration-200"
//     >
//       {/* Course Image */}
//       <figure className="relative">
//         <img
//           className="w-full h-48 object-cover rounded-t-xl transition-transform duration-200 hover:scale-105"
//           src={data?.thumbnail?.secure_url}
//           alt="Course Thumbnail"
//         />
//         <div className="absolute bottom-2 right-2 badge badge-accent text-sm font-semibold">
//           {data?.category}
//         </div>
//       </figure>

//       {/* Course Details */}
//       <div className="card-body p-4 text-gray-800">
//         <h2 className="card-title text-lg text-blue-600 line-clamp-2">
//           {data?.title}
//         </h2>
//         <p className="text-sm text-gray-500 line-clamp-2">{data?.description}</p>

//         <div className="flex justify-between text-sm font-semibold mt-2">
//           <span className="text-cyan-600">📚 {data?.numberoflectures} Lectures</span>
//           <span className="text-purple-600">👨‍🏫 {data?.createdBy}</span>
//         </div>

//         <div className="card-actions mt-4">
//           <button className="btn btn-sm btn-info w-full">Explore Course</button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default CourseCard;


import React from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function CourseCard({ data }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={
        () => navigate("/course/description/", { state: { ...data } ,} )
      
    }
      className="w-80 bg-gray-900 text-gray-100 shadow-lg rounded-lg cursor-pointer hover:shadow-2xl transition-all duration-300 p-4"
    >
      {/* Course Image (Inside the Card with Box Shadow) */}
      <div className="relative rounded-lg overflow-hidden shadow-md">
        <img
          src={data?.thumbnail?.secure_url}
          alt="Course Thumbnail"
          className="w-full h-44 object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute bottom-2 right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-lg shadow-md">
          {data?.category}
        </div>
      </div>

      {/* Course Details */}
      <div className="p-4 space-y-2">
        <h2 className="text-lg font-semibold text-white line-clamp-2">
          {data?.title}
        </h2>
        <p className="text-sm text-gray-400 line-clamp-2">{data?.description}</p>

        <div className="flex justify-between text-xs font-semibold mt-3">
          <span className="text-orange-400"> {data?.numberoflectures} Lectures</span>
          <span className="text-cyan-200">Instructor: {data?.createdBy}</span>
        </div>

        <button className="btn btn-sm bg-orange-500 text-white w-full mt-3 shadow-md hover:bg-orange-600 transition-all">
          Explore Course
        </button>
      </div>
    </div>
  );
}

export default CourseCard;
