import express from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import axios from 'axios'


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
        
        // var config = {
        //     method: 'post',
        //     url: 'https://api.chatengine.io/users/',
        //     headers: {
        //         'PRIVATE-KEY': '{{93e0cb0d-623d-4d2c-bbfd-5b0f1f1e7d8f}}'
        //     },
        //     data : data
        // };
        
        axios.post('https://api.chatengine.io/users/', data, {
    headers: {
        'PRIVATE-KEY': '93e0cb0d-623d-4d2c-bbfd-5b0f1f1e7d8f',
        'Content-Type': 'application/json'
    }
}).then(function (response) {
            console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
            console.log(error);
        });

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
        
        // var config = {
        //     method: 'post',
        //     url: 'https://api.chatengine.io/users/',
        //     headers: {
        //         'PRIVATE-KEY': '{{93e0cb0d-623d-4d2c-bbfd-5b0f1f1e7d8f}}'
        //     },
        //     data : data
        // };
        
        axios.post('https://api.chatengine.io/users/', data, {
    headers: {
        'PRIVATE-KEY': '93e0cb0d-623d-4d2c-bbfd-5b0f1f1e7d8f',
        'Content-Type': 'application/json'
    }
}).then(function (response) {
            console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
            console.log(error);
        });

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

        ////////////////////////////
        // Fetch this user from Chat Engine in this project!
  try {
    const r = await axios.get("https://api.chatengine.io/users/me/", {
      headers: {
        "Project-ID": process.env.CHAT_ENGINE_PROJECT_ID,
        "User-Name": req.body.name,
        "User-Secret": req.body.password,
      },
    });
    return res.status(r.status).json(r.data);
  } catch (e) {
    return res.status(e.response.status).json(e.response.data);
  }

        ///////////////////////////

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

        ////////////////////////////
        // Fetch this user from Chat Engine in this project!
//   try {
//     const r = await axios.get("https://api.chatengine.io/users/me/", {
//       headers: {
//         "Project-ID": 
//         "7d345cf2-58a6-4a0f-a0b9-4bb69d3d8f09",
//         "User-Name": req.body.name,
//         "User-Secret": req.body.password,
//       },
//     });
//     return res.status(r.status).json(r.data);
//   } catch (e) {
//     return res.status(e.response.status).json(e.response.data);
//   }

        ///////////////////////////

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

