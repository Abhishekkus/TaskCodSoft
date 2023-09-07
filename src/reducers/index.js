import { combineReducers } from 'redux';

import jobs from './jobs.js';
import auth from './Auth.js'

export const reducers = combineReducers({ jobs, auth });