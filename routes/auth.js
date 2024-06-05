import express from 'express';
import { alumniSignIn, alumniSignUp, getAlumni, getStudent, studentSignIn, studentSignUp, getMessages, postMessage, createEvent, getEvents } from '../controllers/auth.js';

const router = express.Router();

router.post("/registerAlumni", alumniSignUp);

router.post("/registerStudent", studentSignUp);

router.post("/loginAlumni", alumniSignIn);

router.post("/loginStudent", studentSignIn);

router.get("/getAlumni", getAlumni);/////////

router.get("/getStudent", getStudent);///////////

router.post("/postMessage", postMessage);

router.get("/getMessages", getMessages);

router.post("/createEvent", createEvent);

router.get("/getEvents", getEvents);


export default router;