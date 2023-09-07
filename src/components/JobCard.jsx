import React from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteJob } from "../actions/jobs";

const JobCard = ({ prop, setCurrentId, currentId, delButton, appliedjob }) => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOpen = () => {
    setCurrentId(prop._id);
    Navigate(`/jobs/${prop._id}`);
  };

  const handleDelete = () => {
    setCurrentId(prop._id);
    console.log("JobCard ---> ",prop._id);
    dispatch(deleteJob(prop._id));
  };

  return (
    <Grid item xs={12} sm={4} md={3} >
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          boxShadow: 6,
          bgcolor:'#D8F3DC',
          borderRadius: 2,
        }}
      >
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h5" component="h2">
            {prop.title}
          </Typography>
          {!appliedjob && (
            <Typography gutterBottom>
              {moment(prop.createdAt).fromNow()}
            </Typography>
          )}
          <hr />
          <br />
          <Typography gutterBottom>
            <span style={{ fontWeight: "bold" }}>Company Name:</span>{" "}
            {prop.companyName}
          </Typography>
          <Typography gutterBottom>
            <span style={{ fontWeight: "bold" }}>Duration:</span>{" "}
            {prop.duration}
          </Typography>
          <Typography gutterBottom>
            <span style={{ fontWeight: "bold" }}>Salary:</span> {prop.sal}
          </Typography>
          <Typography gutterBottom>
            <span style={{ fontWeight: "bold" }}>Joining Date:</span>{" "}
            {prop.joiningDate}
          </Typography>
          <Typography gutterBottom>
            <span style={{ fontWeight: "bold" }}>Location:</span>{" "}
            {prop.location}
          </Typography>
          <br />
          {!appliedjob && <hr />}
        </CardContent>
        <CardActions>
          {delButton ? (
            !appliedjob ? (
              <Button size="small" onClick={handleDelete} sx={{ color: "red" }}>
                Delete
              </Button>
            ) : null
          ) : (
            <Button size="small" onClick={handleOpen}>
              View
            </Button>
          )}
        </CardActions>
      </Card>
    </Grid>
  );
};

export default JobCard;
