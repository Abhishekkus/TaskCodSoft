//reducers>jobs.js
import { FETCH_ALL, CREATE, UPDATE, FETCH_BY_SEARCH, FETCH_JOB} from '../constants/actionTypes.js';

export default (state= {jobs: [], job:[] }, action) => {

  switch (action.type) {

    case FETCH_ALL:
      return {...state, jobs: action.payload};

    case FETCH_JOB:
      return {...state, job:action.payload};

    case CREATE:
      return {...state, jobs: [...state.jobs, action.payload]};

    // case DELETE:
    //   return posts.filter((post) => post._id !== action.payload);
    // return jobs;

    case UPDATE:
      return {...state, jobs: state.jobs.map((job)=> job._id === action.payload._id ? action.payload : job)};

    case FETCH_BY_SEARCH:
      return {...state, jobs :action.payload};

    default:
      return state;
  }
};
