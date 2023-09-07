import React, { useState,useEffect } from "react";
import {
  Grid,
  Container,
  Card,
  CardContent,
  CardActions,
  Button,
  Accordion,
  TextField,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
} from "@mui/material";
import { useDispatch,useSelector } from "react-redux";
import { createJob } from "../actions/jobs";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";


import JobCard from "../components/JobCard";
import {getJobs} from "../actions/jobs"
const cards2 = [1, 2, 3, 4, 5, 6, 7, 8];

const Dashboard = () => {

  const dispatch = useDispatch();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

  const [formData, setFormData] = useState({
    title: '',
    companyName: '',
    emailOfEmployeer: user?.result.email, //localStorage
    _idOfEmployeer: user?.result._id, //localStorage
    duration:'',
    sal:'',
    joiningDate:'',
    location:'',
    about:'',
    googleFormLink:''
  })

  const handleEditForm = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  const handleJobUploadForm = (event) => {
    // event.preventDefault();
    dispatch(createJob(formData)).then(alert("Job Upload"))
  };


  const {jobs} = useSelector((state) => state.jobs);

  const filteredJob = jobs.filter((job)=> job.emailOfEmployeer === user?.result.email)


  const [currentId, setCurrentId] = useState(null);
  
  useEffect(()=>{
    dispatch(getJobs());
  },[dispatch])


  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('profile')));
  }, []);

  return (
    <>
      {user ? (
        <div
      style={{
        margin: "20px",
        marginTop: "40px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Accordion style={{ width: "75%" }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Edit Profile</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {/* edit profile starting */}

          <Box
            component="form"
            noValidate
            onSubmit={handleEditForm}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor:'#08A045' }}
            >
              Save Edit
            </Button>
          </Box>





          {/* edit profile ending */}
        </AccordionDetails>
      </Accordion>
      <Accordion style={{ width: "75%" }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Upload Job Vacancy (If you are an Employer)</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {/* <JobUploadForm /> */}

          <Box
            sx={{
              marginTop: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              component="form"
              noValidate
              onSubmit={handleJobUploadForm}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    name="Job Title"
                    required
                    fullWidth
                    id="jobtitle"
                    label="Job Title"
                    autoFocus
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="companyName"
                    label="companyName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData,companyName : e.target.value })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="googleFormLink"
                    label="google Form Link"
                    name="googleFormLink"
                    value={formData.googleFormLink}
                    onChange={(e) => setFormData({ ...formData, googleFormLink: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    name="duration"
                    label="duration"
                    id="duration"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    name="salary"
                    label="salary"
                    id="salary"
                    value={formData.sal}
                    onChange={(e) => setFormData({ ...formData, sal: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    name="joiningDate"
                    label="joiningDate"
                    id="joiningDate"
                    value={formData.joiningDate}
                    onChange={(e) => setFormData({ ...formData,joiningDate : e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    name="location"
                    label="location"
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="aboutthejob"
                    label="About thr Job"
                    name="aboutthejob"
                    multiline
                    rows={4}
                    value={formData.about}
                    onChange={(e) => setFormData({ ...formData,about : e.target.value })}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 , bgcolor:'#08A045'}}
              >
                Upload
              </Button>
            </Box>
          </Box>

          {/* <JobUploadForm /> */}
        </AccordionDetails>
      </Accordion>

      <br />
      <br />
      <Container>
      {filteredJob.length > 0 && (
    <>
      <Typography
        component="h4"
        variant="h4"
        align="center"
        color="text.primary"
        gutterBottom
      >
        My Job Vacancy Posts
      </Typography>

      <Grid container spacing={4}>
        {filteredJob.map((job) => (
          <JobCard
            key={job._id}
            prop={job}
            setCurrentId={setCurrentId}
            currentId={currentId}
            delButton={true}
          />
        ))}
      </Grid>
    </>
  )}
      </Container>

      


      <Container>
      {jobs.some((card) => card.applicant_id.includes(user?.result._id)) && (
    <>
      <Typography
        component="h4"
        variant="h4"
        align="center"
        color="text.primary"
        gutterBottom
      >
        Applied Jobs
      </Typography>
      <br />

      <Grid container spacing={2}>
        {jobs.map((card) =>
          card.applicant_id.includes(user?.result._id) ? (
            <JobCard
              key={card._id}
              prop={card}
              setCurrentId={setCurrentId}
              currentId={currentId}
              delButton={true}
              appliedjob={true}
            />
          ) : null
        )}
      </Grid>
    </>
  )}


            
      </Container>
    </div>
      ):(
        <Container style={{margin:'auto'}}>

      <Typography>Sign in required</Typography>
        </Container>
      )}
    </>
  );
};

export default Dashboard;
