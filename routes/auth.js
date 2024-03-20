import express from 'express';
import { alumniSignIn, alumniSignUp, getAlumni, studentSignIn, studentSignUp } from '../controllers/auth.js';

const router = express.Router();

router.post("/registerAlumni", alumniSignUp);

router.post("/registerStudent", studentSignUp);

router.post("/loginAlumni", alumniSignIn);

router.post("/loginStudent", studentSignIn);

router.post("/getAlumni", getAlumni);/////////

router.post("/getStudent", studentSignIn);///////////


export default router;