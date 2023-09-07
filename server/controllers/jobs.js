//server>controller>jobs.js
import express from 'express';
import mongoose from 'mongoose';

import jobsPosts from '../models/jobsPosts.js';

const router = express.Router();

export const fetchJobs = async (req, res) => { 
    try {
        const allJobPosts = await jobsPosts.find();
        // console.log(allJobPosts);
                
        res.status(200).json(allJobPosts);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


export const createJob = async (req, res) => {
    const job = req.body;

    const newJobPost = new jobsPosts({ ...job, createdAt: new Date().toISOString() })

    try {
        await newJobPost.save();

        res.status(201).json(newJobPost );
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const fetchJob = async (req, res) => { 
    const { id } = req.params;

    try {
        const post = await jobsPosts.findById(id);
        
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}



export const updateJob = async (req, res) => {
    const { id } = req.params; //userId
    const formId = req.body; //formId

    const form_id = Object.keys(formId)[0];
    // const formId = req.query.formId;

    console.log("---->",id);
    console.log("====>",Object.keys(formId)[0]);
    
    if (!mongoose.Types.ObjectId.isValid(form_id)) return res.status(404).send(`No Jobs with id: ${formId}`);

    const updatedJobPost = await jobsPosts.findByIdAndUpdate(form_id, {$push: { applicant_id: id }}, { new: true });

    res.json(updatedJobPost);
}


export const deleteJob = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await jobsPosts.findByIdAndRemove(id);

    res.json({ message: "Post deleted successfully." });
}

export const fetchJobsBySearch = async (req, res) => {
    const searchQuery = req.query.searchQuery; 
    try {
        const Job = await jobsPosts.find({ title: searchQuery });
        // console.log("Jobs -->", Jobs);

        res.status(200).json(Job);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}



export default router;