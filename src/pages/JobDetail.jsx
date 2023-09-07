import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Grid,
  Typography,
  TextField,
  Button,
  Link,
  Container,
} from "@mui/material";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchJob, updateJob } from "../actions/jobs";

const JobDetail = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [userId, setUserId] = useState(user.result._id);
  const [resumelink, setResumelink] = useState("");

  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const { job, jobs } = useSelector((state) => state.jobs);
  const [jobb, setJobb] = useState("");
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchJob(id));
  }, [id]);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile")));
    if (user) {
      setUserId(user.result._id);
    }
    if (job) {
      setJobb(job?._id);
    }
    // console.log(user);
  }, [job]);

  // sendEmail
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // console.log("---->>>>",job._id);
      dispatch(updateJob(userId, job._id));
      const response = await fetch("http://localhost:5000/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to1: job?.emailOfEmployeer,
          to2: user?.result.email,
          subject: job?.title,
          text: `Name: ${user?.result.name}, Email: ${user?.result.email}, Resume Link: ${resumelink}`,
        }),
      }).then(alert("your form submitted"));

      if (response.ok) {
        alert("Email sent successfully");
      } else {
        alert("Failed to send email");
      }
    } catch (error) {
      console.error(error);
      // alert(`An error occurred: ${error.message}`);
    }
  };

  if (!job) return null;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        spacing={2}
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Grid item xs={6}>
          {/* Job detail starting */}

          <Container
            sx={{
              alignItems: "center",
              justifyContent: "center",
              width: "90%",
            }}
          >
            <Typography gutterBottom variant="h2" component="h2">
              {job.title}
            </Typography>
            <Typography gutterBottom>
              Posted {moment(job.createdAt).fromNow()}
            </Typography>
            <hr />
            <br />
            <Typography gutterBottom>
              <span style={{ fontWeight: "bold" }}>Company Name:</span>
              &nbsp;&nbsp;{job.companyName}
            </Typography>
            <Typography gutterBottom>
              <span style={{ fontWeight: "bold" }}>Duration:</span>
              &nbsp;&nbsp;{job.duration}
            </Typography>
            <Typography gutterBottom>
              <span style={{ fontWeight: "bold" }}>Salery:</span>
              &nbsp;&nbsp;{job.sal}
            </Typography>
            <Typography gutterBottom>
              <span style={{ fontWeight: "bold" }}>Joining Date:</span>
              &nbsp;&nbsp;{job.joiningDate}
            </Typography>
            <Typography gutterBottom>
              <span style={{ fontWeight: "bold" }}>Location:</span>
              &nbsp;&nbsp;{job.location}
            </Typography>
            <Typography>
              <span style={{ fontWeight: "bold" }}>About:</span>
              &nbsp;&nbsp;{job.about}
            </Typography>
          </Container>

          {/* Job detail ending */}
        </Grid>
        <Grid
          item
          xs={6}
          sx={{ alignItems: "center", justifyContent: "center" }}
        >
          {/* Job apply Form staring */}

          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "80%",
            }}
          >
            <Typography component="h1" variant="h5">
              Apply for {/* {prop.title} */}
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                name="resumeLink"
                label="Resume Link"
                id="resumeLink"
                onChange={(e) => setResumelink(e.target.value)}
              />

              <Button fullWidth variant="outlined" sx={{ mt: 3, mb: 2 }}>
                <a
                  href={`${job.googleFormLink}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "none" }}
                >
                  Fill the Google Form
                </a>
              </Button>
              <Typography sx={{ color: "gray", fontSize: "13px" }}>
                Its neccassary to fill the Google Form in order to send your
                details to the Employeer
              </Typography>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 , bgcolor:'#08A045'}}
              >
                Apply
              </Button>
            </Box>
          </Box>
          {/* Job apply Form ending */}
        </Grid>
      </Grid>
    </Box>
  );
};

export default JobDetail;
