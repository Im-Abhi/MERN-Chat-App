const express = require('express');
const { chats } = require("./data/data");

const app = express();
const port = 4000;

app.get("/", (req, res) => {
    res.send("API is running");
});

app.get("/api/chat", (req, res) => {
    res.send(chats);
});

app.get("/api/chat/:id", (req, res) => {
    const chatId = req.params.id;
    const singleChat = chats.find( chat => chat.id === chatId );
    res.send(singleChat);
});

app.listen(() => {
    console.log(`Server started on port ${port}`);
});