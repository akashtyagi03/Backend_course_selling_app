const express = require('express');
const { userRouter } = require('./Routes/user');
const { courseRouter } = require('./Routes/course');
const { adminRouter } = require('./Routes/admin');
const app = express();
const mongoose = require('mongoose');
app.use(express.json()); // Middleware to parse JSON bodies

app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/course", courseRouter);

async function main(){
    await mongoose.connect("mongodb+srv://akashtyagi780251:1BGusRpf0XmshNq2@cluster0.jtrohrx.mongodb.net/coursera-app")
    app.listen(3000);
    console.log("listening on port 3000");
}

main()