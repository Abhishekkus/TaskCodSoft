//actions>jobs.js
import { FETCH_ALL, CREATE, DELETE, FETCH_BY_SEARCH, UPDATE, FETCH_JOB } from '../constants/actionTypes.js';
import * as api from '../api/index.js';

export const getJobs = () => async (dispatch) => {
  try {
    const { data } = await api.fetchJobs();

    dispatch({ type: FETCH_ALL, payload: data });

  } catch (error) {
    console.log(error.message);
  }
};

export const fetchJob = (id) => async (dispatch) => {
  try {
    const { data } = await api.fetchJob(id);

    dispatch({ type: FETCH_JOB, payload: data });

  } catch (error) {
    console.log(error);
  }
};


export const createJob = (Job) => async (dispatch) => {
  try {
    const { data } = await api.createJob(Job);

    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateJob = (userId, formId) => async (dispatch) => {
  try {
    console.log("123456",userId)
    console.log("asdfghj-->", formId);
    const { data } = await api.updateJob(userId, formId);

    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const fetchJobsBySearch = (searchQuery) => async(dispatch) => {
    try {
        const {data} = await api.fetchJobsBySearch(searchQuery)
        dispatch({
            type : FETCH_BY_SEARCH,
            payload:data
        });
        // console.log("<---->",data);

    } catch (error) {
        console.log(error);
    }
}

export const deleteJob = (id) => async (dispatch) => {
  try {
    await api.deleteJob(id);

    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error.message);
  }
};