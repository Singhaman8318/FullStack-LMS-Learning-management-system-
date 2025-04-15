import { Router } from "express";
import { 
  getAllCourses, 
  getLecturesByCourseID, 
  createCourse, 
  addLectureByCourseId, 
  updateCourse, 
  removeCourse, 
  removeLectureById 
} from '../Controllers/course.controller.js';

import { authorisedRole, isLoggedIn, subscribe_user } from "../Middleware/jwtAuth.midlleware.js";
import upload from '../Middleware/multer.midlleware.js';

const router = Router();

// Routes for courses
router.route('/')
  .get(getAllCourses)
  .post(
    isLoggedIn,
    authorisedRole('ADMIN'),
    upload.single('thumbnail'), 
    createCourse
  );

// Routes for specific course (by ID)
router.route('/:id')
  .get(isLoggedIn, subscribe_user, getLecturesByCourseID)
  .put(updateCourse)
  .delete(isLoggedIn, authorisedRole('ADMIN'), removeCourse)
  .post(isLoggedIn, authorisedRole('ADMIN'), upload.single('lecture'), addLectureByCourseId);

// Route for removing a lecture by ID
router.route('/lecture/:courseId/:lectureId')
  .delete(isLoggedIn, authorisedRole('ADMIN'), removeLectureById);

export default router;
