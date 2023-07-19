const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./router/auth');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(authRouter);


mongoose.connect(DB).then(()=>{
    console.log('Connection Successful');
}).catch(()=>{
    console.log(e);
});

app.listen(PORT,"0.0.0.0", (params) =>{
    console.log(`Connected at port ${PORT}`);
});