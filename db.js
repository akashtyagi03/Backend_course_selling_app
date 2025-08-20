const mongoose = require('mongoose');
const { Schema, ObjectId } = mongoose;

const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, min: 6},
    username: {type: String, unique: true, required: true}
});

const adminSchema = new Schema({
    email: { type: String, unique: true, required: true},
    password: { type: String, required: true, min: 6},
    username: { type: String, unique: true, required: true}
});

const courseSchema = new Schema({
    title: { type: String,required: true},
    description: { type: String, required: true},
    price: { type: Number, required: true},
    Imageurl: {type: String, required: false},
    creatorId: ObjectId
});

const purchaseSchema = new Schema({
    courseID: ObjectId,
    userID: ObjectId,
});

const User = mongoose.model('User', userSchema);
const Admin = mongoose.model('Admin', adminSchema);
const Course = mongoose.model('Course', courseSchema);
const Purchase = mongoose.model('Purchase', purchaseSchema);

module.exports = { User, Admin, Course, Purchase };