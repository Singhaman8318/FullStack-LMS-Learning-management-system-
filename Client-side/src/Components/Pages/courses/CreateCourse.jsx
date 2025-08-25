

 import toast from "react-hot-toast";
import { useState } from "react";
import React from 'react'
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import HomeLayout from "../../Layout/HomeLayout";
import { AiOutlineAim, AiOutlineArrowLeft } from 'react-icons/ai';
import { createNewCourse } from "../../../Redux/Slices/courseSlice";
import { Link } from "react-router-dom";
function CreateCourse() {
   const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userInput, setUserInput] = useState({
      title: "",
      category: "",
      createdBy: "",
      description: "",
      thumbnail: null,
      previewImage: ""
  });

  function handleImageUpload(e) {
      e.preventDefault();
      const uploadedImage = e.target.files[0];
      if(uploadedImage) {
          const fileReader = new FileReader();
          fileReader.readAsDataURL(uploadedImage);
          fileReader.addEventListener("load", function () {
              setUserInput({
                  ...userInput,
                  previewImage: this.result,
                  thumbnail: uploadedImage
              })
          })
      }
  }

  function handleUserInput(e) {
      const {name, value} = e.target;
      setUserInput({
          ...userInput,
          [name]: value
      })
  }

  async function onFormSubmit(e) {
      e.preventDefault();

      if(!userInput.title || !userInput.description || !userInput.category  || !userInput.createdBy) {
          toast.error("All fields are mandatory");
          return;
      }

      const response = await dispatch(createNewCourse(userInput));
      if(response?.payload?.success) {
          setUserInput({
              title: "",
              category: "",
              createdBy: "",
              description: "",
              thumbnail: null,
              previewImage: ""
          });
          navigate("/courses");
      }
  }


return (
    <HomeLayout>
      <div className="flex items-center justify-center min-h-screen p-6">
        <form
          onSubmit={onFormSubmit}
          className="relative flex flex-col items-center bg-base-200 p-6 rounded-xl shadow-lg w-full max-w-3xl"
        >
          {/* Back Button (Always Visible) */}
          <Link to="/" className="absolute top-4 left-4 text-xl text-primary flex items-center gap-2">
            <AiOutlineArrowLeft className="text-2xl" />
            <span className="text-lg font-semibold">Back</span>
          </Link>

          {/* Title */}
          <h1 className="text-2xl font-bold text-center mb-6">Create New Course</h1>

          {/* Thumbnail Upload (Centered & Bigger) */}
          <div className="w-full flex flex-col items-center">
            <label htmlFor="image_uploads" className="cursor-pointer">
              {userInput.previewImage ? (
                <img
                  className="w-72 h-40 object-cover border-2 rounded-4xl border-gray-300 shadow-md"
                  src={userInput.previewImage}
                />
              ) : (
                <div className="w-72 h-40 flex items-center rounded-4xl justify-center border-2 border-gray-300 bg-base-100 shadow-md">
                  <h1 className="font-bold text-sm text-gray-500 text-center">Upload Thumbnail</h1>
                </div>
              )}
            </label>
            <input
              className="hidden"
              type="file"
              id="image_uploads"
              accept=".jpg, .jpeg, .png"
              name="thumbnail"
              onChange={handleImageUpload}
            />
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mt-6">
            <div className="form-control">
              <label className="label text-lg font-semibold">Course Title</label>
              <input
                type="text"
                name="title"
                required
                placeholder="Enter course title"
                className="input input-bordered w-full"
                value={userInput.title}
                onChange={handleUserInput}
              />
            </div>

            <div className="form-control">
              <label className="label text-lg font-semibold">Created By</label>
              <input
                type="text"
                name="createdBy"
                required
                placeholder="Enter creator name"
                className="input input-bordered w-full"
                value={userInput.createdBy}
                onChange={handleUserInput}
              />
            </div>

            <div className="form-control">
              <label className="label text-lg font-semibold">Category</label>
              <input
                type="text"
                name="category"
                required
                placeholder="Enter course category"
                className="input input-bordered w-full"
                value={userInput.category}
                onChange={handleUserInput}
              />
            </div>

            <div className="form-control">
              <label className="label text-lg font-semibold">Description</label>
              <textarea
                name="description"
                required
                placeholder="Enter course description"
                className="textarea textarea-bordered w-full"
                value={userInput.description}
                onChange={handleUserInput}
              />
            </div>
          </div>

          <button className="btn btn-primary w-full mt-6" type="submit">
            Create Course
          </button>
        </form>
      </div>
    </HomeLayout>
  );
}


export default  CreateCourse

// import { useState } from "react";
// import React from "react";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import HomeLayout from "../../Layout/HomeLayout";
// import { AiOutlineArrowLeft } from "react-icons/ai";
// import { Link } from "react-router-dom";
// import { toast } from "react-hot-toast";
// import createNewCourse from "../../../Redux/Slices/courseSlice";

// function CreateCourse() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [userInput, setUserInput] = useState({
//     title: "",
//     category: "",
//     createdBy: "",
//     description: "",
//     thumbnail: null,
//     previewImage: "",
//   });

//   // Handle Image Upload
//   function handleImageUpload(e) {
//     const uploadedImage = e.target.files[0];
//     if (uploadedImage) {
//       const fileReader = new FileReader();
//       fileReader.readAsDataURL(uploadedImage);
//       fileReader.onload = () => {
//         setUserInput((prev) => ({
//           ...prev,
//           previewImage: fileReader.result,
//           thumbnail: uploadedImage,
//         }));
//       };
//     }
//   }

//   // Handle User Input
//   function handleUserInput(e) {
//     const { name, value } = e.target;
//     setUserInput((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   }

//   // Handle Form Submission
//   async function onFormSubmit(e) {
//     e.preventDefault();

//     if (!userInput.title || !userInput.description || !userInput.category || !userInput.thumbnail || !userInput.createdBy) {
//       toast.error("All fields are mandatory");
//       return;
//     }

//     const response = await dispatch(createNewCourse(userInput));
//     if (response?.payload?.success) {
//       setUserInput({
//         title: "",
//         category: "",
//         createdBy: "",
//         description: "",
//         thumbnail: null,
//         previewImage: "",
//       });
//       toast.success("Course Created Successfully!");
//       navigate("/courses");
//     }
//   }

//   return (
//     <HomeLayout>
//       <div className="flex items-center justify-center min-h-screen bg-gray-900">
//         <div className="relative w-full max-w-xl bg-gray-800 p-8 rounded-lg shadow-lg">
//           <Link
//             to="/"
//             className="absolute top-4 left-4 text-gray-400 hover:text-white transition duration-300"
//           >
//             <AiOutlineArrowLeft size={24} />
//           </Link>

//           <h1 className="text-2xl font-bold text-white text-center mb-6">
//             Create New Course
//           </h1>

//           <form onSubmit={onFormSubmit} className="space-y-5">
//             {/* Image Upload */}
//             <div className="flex flex-col items-center">
//               <label
//                 htmlFor="image_uploads"
//                 className="cursor-pointer flex flex-col items-center w-full border border-gray-600 p-6 rounded-md hover:bg-gray-700 transition duration-300"
//               >
//                 {userInput.previewImage ? (
//                   <img
//                     className="w-full h-40 object-cover rounded-md"
//                     src={userInput.previewImage}
//                     alt="Course Thumbnail"
//                   />
//                 ) : (
//                   <div className="text-center text-gray-400">
//                     Upload Course Thumbnail
//                   </div>
//                 )}
//               </label>
//               <input
//                 className="hidden"
//                 type="file"
//                 id="image_uploads"
//                 accept=".jpg, .jpeg, .png"
//                 onChange={handleImageUpload}
//               />
//             </div>

//             {/* Input Fields */}
//             <div>
//               <label className="text-white block">Course Title</label>
//               <input
//                 type="text"
//                 name="title"
//                 placeholder="Enter course title"
//                 className="w-full bg-gray-700 text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 value={userInput.title}
//                 onChange={handleUserInput}
//                 required
//               />
//             </div>

//             <div>
//               <label className="text-white block">Created By</label>
//               <input
//                 type="text"
//                 name="createdBy"
//                 placeholder="Enter creator name"
//                 className="w-full bg-gray-700 text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 value={userInput.createdBy}
//                 onChange={handleUserInput}
//                 required
//               />
//             </div>

//             <div>
//               <label className="text-white block">Category</label>
//               <input
//                 type="text"
//                 name="category"
//                 placeholder="Enter course category"
//                 className="w-full bg-gray-700 text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 value={userInput.category}
//                 onChange={handleUserInput}
//                 required
//               />
//             </div>

//             <div>
//               <label className="text-white block">Description</label>
//               <textarea
//                 name="description"
//                 placeholder="Enter course description"
//                 className="w-full bg-gray-700 text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 value={userInput.description}
//                 onChange={handleUserInput}
//                 required
//               />
//             </div>

//             {/* Submit Button */}
//             <button
//               className="w-full bg-blue-500 cursor-pointer text-white font-semibold py-3 rounded-md hover:bg-blue-600 transition duration-300"
//               type="submit"
//             >
//               Create Course
//             </button>
//           </form>
//         </div>
//       </div>
//     </HomeLayout>
//   );
// }

// export default CreateCourse;
