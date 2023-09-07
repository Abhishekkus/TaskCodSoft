//jobsPosts.js
import mongoose from 'mongoose';

const jobSchema = mongoose.Schema({
    title: String,
    companyName: String,
    emailOfEmployeer: String,
    _idOfEmployeer: String,
    duration:String,
    sal:Number,
    joiningDate:String,
    location:String,
    about:String,
    googleFormLink:String,
    createdAt: {
        type: Date,
        default: new Date(),
    },
    applicant_id:{
        type:[String],
        default: null
    },
})

var jobsPosts = mongoose.model('jobsPosts', jobSchema);

export default jobsPosts;

