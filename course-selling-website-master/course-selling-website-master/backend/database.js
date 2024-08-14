const mongoose = require('mongoose');
const {Schema} = mongoose;

mongoose.connect(''); // connect using moongoose url 

const CourseSchema = new Schema ({
    title : String , 
    courseId : String , 
    imageLink : String
})

const UserSchmea = new Schema ({
    username : String , 
    password : String , 
    courses : [String]
})

const AdminSchema = new Schema ({
    username : String , 
    password : String , 
    courses : [String],
})

const Course = mongoose.model('Course', CourseSchema);
const User = mongoose.model('User', UserSchmea);
const Admin = mongoose.model('Admin', AdminSchema);

module.exports = {
    Course , 
    User, 
    Admin
};
