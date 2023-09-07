//JobList.js
import React, {useState, useEffect} from "react";
import { useDispatch , useSelector} from "react-redux";
import {useNavigate, useLocation} from 'react-router-dom'
import { Button, Grid, Typography, Container, Input } from "@mui/material";


import JobCard from "../components/JobCard";
import {getJobs, fetchJobsBySearch} from "../actions/jobs"

const InputCSS = {
  border: "1px solid #08A045",
  padding: "5px",
  borderRadius: "5px",
  width: "400px",
  color:'#08A045'
}
const ButtonCSS = {
  border: "1px solid #08A045",
  padding: "9px",
  borderRadius: "5px",
  color:'#08A045'
}

export default function JobList() {
  
  const {jobs} = useSelector((state) => state.jobs);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const [searchWhat, setSearchWhat] = useState('');
  const Navigate = useNavigate();

  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();

  const handleSearch = async () => {
    if (searchWhat) {
        await dispatch(fetchJobsBySearch(searchWhat));
        Navigate(`/jobs/search?searchQuery=${searchWhat || 'none'}`);
       
    } else {
        Navigate('/joblist');
    }
}
// const {job} = useSelector((state) => state.job);

const handleGoBack = async()=>{
  Navigate('/joblist');
  // Reload the current window
window.location.reload();
}

  
  useEffect(()=>{
    dispatch(getJobs());
  },[dispatch])

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('profile')));
  }, []);

  return (
    <>
      {user?(
        <Container sx={{ py: 8 }} maxWidth="lg">
      <Grid container>
        <Grid item sm={4}>
          <Typography
            component="h4"
            variant="h4"
            align="center"
            color="text.primary"
            gutterBottom
          >
            Featured Jobs
          </Typography>
        </Grid>
        <Grid item sm={8}>
          <Input
            placeholder="Search…"
            style={InputCSS }
            value={searchWhat}
            onChange={(e)=>setSearchWhat(e.target.value)}
          />
          &nbsp;<Button type="submit" onClick={handleSearch} style={ButtonCSS}>Search</Button>&nbsp;
          {searchWhat? (
            <Button style={ButtonCSS} onClick={handleGoBack}>Go Back</Button>
          ):(<></>)}
          
        </Grid>
      </Grid>

      <br />
      {/* <Grid container spacing={4}>    
          <JobCard prop={job} setCurrentId={setCurrentId} currentId={currentId} delButton={false}/>
      </Grid> */}
      <Grid container spacing={4}>
        {jobs.map((job) => (
          <JobCard key={job._id} prop={job} setCurrentId={setCurrentId} currentId={currentId} delButton={false}/>
        ))}
      </Grid>
    </Container>
      ):(
        <Container>
        <Typography
            component="h6"
            variant="h6"
            align="center"
            color="text.primary"
            gutterBottom
          >
            signin please
          </Typography>
        </Container>
      )}
    </>
    
  );
}
