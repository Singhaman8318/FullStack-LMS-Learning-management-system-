



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
