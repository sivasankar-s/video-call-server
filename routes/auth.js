import express from 'express';
import { alumniSignIn, alumniSignUp, broadcast, consumer, studentSignIn, studentSignUp } from '../controllers/auth.js';

const router = express.Router();

router.post("/registerAlumni", alumniSignUp);

router.post("/registerStudent", studentSignUp);

router.post("/loginAlumni", alumniSignIn);

router.post("/loginStudent", studentSignIn);

router.post("/consumer", consumer);

router.post("/broadcast", broadcast);

export default router;