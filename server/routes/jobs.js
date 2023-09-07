// server>routes>jobs.js
import express from 'express';

import { fetchJobs, createJob, updateJob, fetchJobsBySearch, fetchJob, deleteJob } from '../controllers/jobs.js';

const router = express.Router();
import auth from "../middleware/auth.js";

router.get('/', fetchJobs);
router.post('/', auth, createJob);
router.get('/search', fetchJobsBySearch);
router.patch('/:id', auth, updateJob);
router.get('/:id', fetchJob); 
router.delete('/:id',auth, deleteJob); 
// router.delete('/:id', deletePost); // Delete a job

export default router;
