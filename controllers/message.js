import express from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import axios from 'axios'

import Alumni from '../models/Alumni.js';
import Student from '../models/Student.js';

