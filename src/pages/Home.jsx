import React, {useState, useEffect} from "react";
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';


import { useDispatch , useSelector} from "react-redux";
import JobCard from "../components/JobCard";
import {getJobs} from "../actions/jobs"
import { Link } from "react-router-dom";



export default function Home() {
  const {jobs} = useSelector((state) => state.jobs);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

  const salSortedArray = jobs.sort((obj1, obj2) => obj2.sal - obj1.sal);
  console.log(salSortedArray);

  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();
  
  useEffect(()=>{
    dispatch(getJobs());
  },[dispatch])

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('profile')));
  }, []);
  return (


      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: ' #B7E4C7',
            pt: 8,
            pb: 0,
          }}
        >
          <Container maxWidth="lg">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              We provide you Job which you like
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
            Empowering Your Career Journey: Discover, Apply, and Succeed with Our Job-Finding Platform. Your Future Awaits, Start Today!
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button variant="contained" sx={{bgcolor:'#08A045'}}><Link to='/about' exact style={{textDecoration:'none', color:'white'}}>Click to know About Us</Link></Button>
              <Button variant="outlined" sx={{border:'1px solid #08A045', color:'#08A045'}}>
              <a
                  href=''
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "none" ,color:'#08A045'}}
                >
                  About the Developer
                </a>
            </Button>
            </Stack>
          </Container>
        </Box>
        {user ? (
          <Container sx={{ py: 8 }} maxWidth="lg">
          {/* End hero unit */}
          <Typography
              component="h4"
              variant="h4"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Highest Salary Jobs
            </Typography>
            <br /><br />
          <Grid container spacing={4}>
 
          {salSortedArray.map((job,index) => {
            if(index<4){
              return (
          <JobCard key={job._id} prop={job} setCurrentId={setCurrentId} currentId={currentId} delButton={false}/>)
            }
          })}
          </Grid>
        </Container>
        ):(
          <Container>
          <br /><br /><br />
          <Typography
              component="h6"
              variant="h6"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Please Sign In to explore Jobs
            </Typography>
          </Container>
        )}
        
      </main>
  );
}