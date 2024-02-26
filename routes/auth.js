import express from 'express';
import { alumniSignIn, alumniSignUp, studentSignIn, studentSignUp } from '../controllers/auth.js';

const router = express.Router();

router.post("/registerAlumni", alumniSignUp);

router.post("/registerStudent", studentSignUp);

router.post("/loginAlumni", alumniSignIn);

router.post("/loginStudent", studentSignIn);


export default router;