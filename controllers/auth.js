import express from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import axios from 'axios'


let senderStream;

import Alumni from '../models/Alumni.js';
import Student from '../models/Student.js';
import Message from '../models/Message.js';
import Events from '../models/Events.js';

export const signIn = async(req, res) => {
    try {
        
    } catch(err) {
        res.status(404).json({message: err.message});
    }
}

export const alumniSignUp = async (req, res) => {
    try{
        const user = await Alumni.create(req.body);

        console.log(req.body)

        // var data = `{
        //     "username": ${req.body.name},
        //     "secret": ${req.body.password},
        //     "email": ${req.body.email},
        //     "custom_json": {"phone": ${req.body.phone}, "yearOfPassing": ${req.body.yearOfPassing}, "dept":${req.body.dept}, "company": ${req.body.company}, "role": ${req.body.role},  "type":${req.body.type}}
        // }`;

        let data = {
            username: req.body.name,
            secret: req.body.password,
            email: req.body.email,
            custom_json: {phone: req.body.phone, yearOfPassing: req.body.yearOfPassing, dept: req.body.dept, company: req.body.company, role: req.body.role, type: req.body.type}
        };


        console.log('in controller')
        console.log(user);

        res.status(200).json(user)
    } catch(err) {
        res.status(404).json({message: err.message});
    }
}

export const studentSignUp = async (req, res) => {
    try{
        const user = await Student.create(req.body);
        console.log(req.body)

        let data = {
            username: req.body.name,
            secret: req.body.password,
            email: req.body.email,
            custom_json: {regNo: req.body.regNo, phone: req.body.phone, yearOfPassing: req.body.yearOfPassing, dept: req.body.dept, type: req.body.type}
        };
        


        console.log('in controller')
        console.log(user);

        res.status(200).json(user)
    } catch(err) {
        res.status(404).json({message: err.message});
    }
}

export const alumniSignIn = async (req, res) => {
    // try{
        const user = await Alumni.findOne({email: req.body.email});

        console.log('in controller')
        console.log(user);



        if(!user) return res.status(404).json({message: 'User Not Found'});

        const passCorrect = (req.body.password == user.password)

        if(!passCorrect) return res.status(404).json({message: 'Invalid Credentials'});

        const token = jwt.sign({email: user.email, id: user._id}, 'test', {expiresIn: "1h"})

        res.status(200).json({result: user, token})

        // if(user){
        //     return res.status(200).json(user)
        // } else {
        //     console.log('not found user in console')
        //     return res.status(404).json({message: 'User Not Found'})
        // }

    // } 
    // catch(err) {
    //     res.status(404).json({message: 'in error msg'});
    // }
}

export const studentSignIn = async (req, res) => {
    try{
        const user = await Student.findOne({email: req.body.email});

        console.log('in controller')
        console.log(user);

        

        if(!user) return res.status(404).json({message: 'User Not Found'});

        const passCorrect = (req.body.password == user.password)

        if(!passCorrect) return res.status(404).json({message: 'Invalid Credentials'});


        const token = jwt.sign({email: user.email, id: user._id}, 'test', {expiresIn: "1h"})

        res.status(200).json({result: user, token})

        // if(user){
        //     res.status(200).json(user)
        // } else {
        //     console.log('not found user in console')
        //     res.status(404).json({message: 'User Not Found'})
        // }

    } catch(err) {
        res.status(404).json({message: 'in error msg'});
    }
}


export const getAlumni = async (req, res) => {
    try{
        const alumni = await Alumni.find();

        console.log('in controller')
        // console.log(alumni);

        if(!alumni) return res.status(404).json({message: 'Alumnis Not Found'});
    
        console.log()

        res.status(200).json({result: alumni})
  

    } catch(err) {
        res.status(404).json({message: 'in error msg'});
    }
}

export const getStudent = async (req, res) => {
    try{
        const student = await Student.find();

        console.log('in controller')
        console.log(student);

        if(!student) return res.status(404).json({message: 'Students Not Found'});
    
        console.log()

        res.status(200).json({result: student})
  

    } catch(err) {
        res.status(404).json({message: 'in error msg'});
    }
}

export const postMessage = async (req, res) => {
    try{
        // const message = await Student.find();

        // console.log('in controller')
        // console.log(student);

        // if(!student) return res.status(404).json({message: 'Students Not Found'});
    
        // console.log()

        // res.status(200).json({result: student})

        const { username, avatar, text, group } = req.body;
  const message = new Message({ username, avatar, text, group });
  await message.save();
  res.send(message);
  

    } catch(err) {
        res.status(404).json({message: 'in error msg'});
    }
}

export const getMessages = async (req, res) => {
    try{
      

        const messages = await Message.find().sort({ timestamp: 1 });
        // res.send({})

        res.status(200).json({result: messages})
  

    } catch(err) {
        res.status(404).json({message: 'in error msg'});
    }
}

export const createEvent = async (req, res) => {
    try{
        const event = await Events.create(req.body);
        console.log(req.body)

        
        console.log('in controller')
        console.log(event);

        res.status(200).json(event)
    } catch(err) {
        res.status(404).json({message: err.message});
    }
}


export const getEvents = async (req, res) => {
    try{
      

        const events = await Events.find();
        // res.send({})

        res.status(200).json({result: events})
  

    } catch(err) {
        res.status(404).json({message: 'in error msg'});
    }
}

