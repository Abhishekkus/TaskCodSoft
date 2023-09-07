//server>index.js
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import nodemailer from 'nodemailer';


import jobRoutes from './routes/jobs.js';
import userRoutes from './routes/users.js';

const app = express();

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

app.use('/jobs', jobRoutes);
app.use("/user", userRoutes);

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'aabhishek80x@gmail.com',
    pass: 'hpxnvjixharozldk',
  },
});

app.post('/send-email', async (req, res) => {
  const { to1, to2, subject, text } = req.body;

  try {
    const mail1 = {
      from: 'aabhishek80x@gmail.com',
      to: to1,
      subject,
      text
    };

    await transporter.sendMail(mail1);

    const mail2 = {
      from: 'aabhishek80x@gmail.com',
      to: to2,
      subject: 'Applied Successfully',
      text: 'Your name, email, and resume were sent successfully to the employer.'
    };

    await transporter.sendMail(mail2);

    res.status(200).json({ message: 'Emails sent successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while sending emails.' });
  }
});


const CONNECTION_URL = 'mongodb+srv://Abhishek80x:Malik79028@cluster0.adgohr8.mongodb.net/StudyNotionJob';
const PORT = process.env.PORT|| 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: ${PORT}`)))

  .catch((error) => console.log(`${error} did not connect`));

  
  
app.get("/", (req, res) => {
	return res.json({
		success:true,
		message:'The CodSoftask server is up and running....'
	});
});


  