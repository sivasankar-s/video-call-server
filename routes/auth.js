import express from 'express';
import { alumniSignIn, alumniSignUp, getAlumni, getStudent, studentSignIn, studentSignUp } from '../controllers/auth.js';

const router = express.Router();

router.post("/registerAlumni", alumniSignUp);

router.post("/registerStudent", studentSignUp);

router.post("/loginAlumni", alumniSignIn);

router.post("/loginStudent", studentSignIn);

router.get("/getAlumni", getAlumni);/////////

router.get("/getStudent", getStudent);///////////


export default router;