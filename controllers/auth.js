import express from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';


let senderStream;

import Alumni from '../models/Alumni.js';
import Student from '../models/Student.js';

export const signIn = async(req, res) => {
    try {
        
    } catch(err) {
        res.status(404).json({message: err.message});
    }
}

export const alumniSignUp = async (req, res) => {
    try{
        const user = await Alumni.create(req.body);

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

