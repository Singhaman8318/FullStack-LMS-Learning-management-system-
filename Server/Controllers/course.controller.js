  import mongoose from 'mongoose'
  import Course from '../Models/course.model.js'
import User from '../Models/user.model.js'
import AppError from '../Util/error.util.js'
 import cloudinary from 'cloudinary'
import fs from 'fs/promises'

        const getAllCourses=async(req,res,next)=>{
          // const courses= await Course.find({}).select("-lectures");

               try {
                const courses= await Course.find({}).select("-lectures");

                // console.log("courses", courses);
                
                  res.status(200).json({
                    success: true, 
                    message:" All Courses are Listed ",
                    courses
                  })
               } catch (error) {
                     return  next(new AppError('failed to fetch the  courses ' , 400 ))
               }
            }

                    const  getLecturesByCourseID=async(req,res,next)=>{
                            try {
                                console.log("req in getlecutrebyid", req.params);
                                
                                const {id}= req.params ; 

                                // console.log("course id >" , id);
                                
                                const course=await Course.findById(id);

                                // console.log("course is >", course);
                                
                            if (!course) {
                                return next(new AppError("Failed to fetch the course !!"))
                            }   
                                
                            // if course is find the return the 
                                res.status(200).json({
                                    success:true,
                                    message:"Successfully fetch the courses",
                                    // course: course.lectures
                                    course
                                })
                                
                            } catch (error) {
                                return next ( new AppError(error.message))
                            }
                    }


         const createCourse=async (req,res , next)=>{
                const {title, description, category, createdBy}=req.body; 
                //  console.log(" request body is ",req.body );
                 
                  try {
                    if ( !title || ! description || !category || !createdBy){
                        return next(new AppError("All filed must be requiered " , 400 ))
                    }
        //  if all fields are filled  create the instance 
  
          const course=await Course.create(
              {
                  title,
                  description,
                  category,
                  createdBy
              } )
                    if (!course) {
                       return next( new AppError("Failed to create the courses "))
                    }
  
                    //  if course is created now upload the thumbnail 
                     if (req.file) {
                       const result= await cloudinary.v2.uploader.upload(req.file.path ,{
                          folder:"lms"
                       }); 

                      //  console.log("Result in file > " , result);
                       
  
                         if (result) {
                           course.thumbnail.public_id=result.public_id;
                           course.thumbnail.secure_url= result.secure_url;
                         }
  
                          // if file is uploaded on clodinary then delete from the local machine automatically 
                          // fs.rm(`/uploads${req.file.filename}`)
                     };
                      // if all things is done  then save it in to the databse 
  
                      await course.save();
                     
                        return res.status(200).json({
                            success:true,
                            message:"Course is created successfully " ,
                            course
                        })  
                  } catch (error) {
                     console.log(error.message);
                     
                      return next( new AppError( error.message , 500 ))
                  }

         }  


       
        
         const updateCourse=async(req,res,next)=>{
              try {
                const {id}=req.params;

                const course= await Course.findByIdAndUpdate(
                  id, {
                    $set: req.body
                  },{
                    runValidators: true
                  }
                );
                  if (!course) {
                    return next(new AppError("Course does not found " , 500))
                  }

                  res.status(200).json({
                    success:true,
                    message:"Course is upadted successfully ",
                    course
                  })
              } 
              catch (error) {
                return next( new AppError(error.message, 500))
              }
         }

         const removeCourse=async(req,res,next)=>{
               try {
                const id =req.params.id; 

                const course= await Course.findById(id) ; 
                if (!course) {
                   return  next( new AppError("Course is not found 0", 500))
                }

                await Course.findByIdAndDelete(id)
                  res.status(200).json({
                    success:true,
                    message:"Course is delted successfully "
                  })
               } catch (error) {
                  return next(new AppError(error.message,500))
               }
         }
            
         const addLectureByCourseId=async(req,res,next)=>{
             
              const {id}=req.params;
              const {title, description}=req.body;
              let lectureData={};
                // if (!title || !description) {
                //     return next(new AppError("all fields must be require ", 403))
                // }
              // find the course by id 

              // console.log("id in add lecture ",id);
              

              const course=await Course.findById(id);

              // console.log("corse in add lecure ", course);
              
                 if (!course) {
                    return next(new AppError("failed to fetch the course " , 500))
                 }

                 // run if user upload a video 

                  // console.log("req file to upload", req.file);
                  
                 if (req.file) {
                      try {
                        const result=await cloudinary.v2.uploader.upload(req.file.path,{
                          folder:"lms",
                          chunk_size:50000000, // 50 mb
                          resource_type:'video'
                        });

                        // if uploaded successfully 
                        if (result) {
                          lectureData.public_id=result.public_id;
                          lectureData.secure_url=result.secure_url;
                        }

                        // After successful upload remove the file from local storage
                        fs.rm(`uploads/${req.file.filename}`);
                      } catch (error) {
                        console.log(error.message);
                        
                         return next(new AppError( error.message,400))
                      }
                 }


                 course.lectures.push({
                  title,
                  description,
                  lecture:lectureData
                 });
                 course.numberOfLectures=course.lectures.length;

                 // save the course object 
                 await course.save();

                 // now set the status 
                 res.status(200).json({
                  success:true,
                  message:"Lecture added successfully !...",
                  // course
                 })
           

             // 
            
         }
    


         
         const removeLectureById=async(req,res,next)=>{
              try {
                const {courseId , lectureId}=req.query;

             console.log("Remove lecture  courseID",courseId );
             console.log("Remove lecture  lecture id " , lectureId);
             
             
                 if (!courseId) {
                  return next( new AppError("failed to  fetch the course ", 500))
                 }

                 if (!lectureId) {
                  return next( new AppError("failed to fetch the lecture id " , 500))
                 }

                 const course= await Course.findById(courseId);

                 if (!courseId) {
                   return next(new AppError("failed to fetch the course try again " , 500))
                 }
                    // fin the lecture index in courde >> lecture
                 const lectureIndex=course.lectures.findIndex((index)=> index._id.toString() === lectureId.toString());
                
                 //  if lecture index is find remove the lecture from the cloudinary 
                 await cloudinary.v2.uploader.destroy(course.lectures[lectureIndex].lecture.public_id ,{
                      resource_type:"video"
                 });


                 // now remove from the arry
                 course.lectures.splice(lectureIndex,1);

                 // now count the length of the lecture 

                 course.numberOfLectures=course.lectures.length;
                res.status(200).json({
                  success:true,
                  message:"Lecture removed successfully"
                })
              } catch (error) {
                console.log("Error in deleting the lecture ", error.message);
                
                return next(new AppError(error.message , 500))
              }
          }
export  {
    getAllCourses,
    getLecturesByCourseID, 
    createCourse,
    updateCourse,
    removeCourse,
    addLectureByCourseId,
    removeLectureById
}