const express = require('express');
const { userRouter } = require('./Routes/user');
const { courseRouter } = require('./Routes/course');
const { adminRouter } = require('./Routes/admin');
const app = express();

app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/course", courseRouter);

app.listen(3000);