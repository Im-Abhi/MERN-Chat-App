const express = require('express');

const app = express();
const port = 4000;

app.get("/",(req,res)=>{
    res.send("API is running");
});

app.listen(()=>{
    console.log(`Server started on port ${port}`);
});