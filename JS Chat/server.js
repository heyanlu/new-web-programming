const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
PORT = 3000;

// Import files
const users = require("./modelUsers");
const sessions = require("./modelSessions");
const messages = require("./messages");

app.use(express.static("./public"));
app.use(cookieParser());
app.use(express.json());


//help function of sid authentication 
function authenticate(req, res) {
    const sid = req.cookies.sid; 
    const username = sessions.getSessionUser(sid); 

    if (!sid || !users.isValid(username)) {
        res.status(401).json({ error: "auth-missing" });
        return false;
    }
    return username; 
}

//session: get/post/delete
app.get("/api/v1/session", (req, res) => {
    const username = authenticate(req, res);
    if (!username) return;
  
    const activeUsers = users.getActiveUsers(sessions.sessions);
    const channelMessages = messages.messages;

    //authentication and data retrieval -> sends a JSON response containing the username, messages
    res.status(200).json({ username, activeUsers, channelMessages });
});


//create session for username
app.post("/api/v1/session", (req, res) => {
    //username provided by the user and included in the request body.
    const { username } = req.body;
  
    if (!users.isValid(username)) {
      res.status(400).json({ error: "required-username" });
      return;
    }
  
    if (username === "dog") {
      res.status(403).json({ error: "auth-insufficient" });
      return;
    }
  
    const sid = sessions.addSession(username);
    res.cookie("sid", sid);
    res.status(201).json({ username });
});



app.delete("/api/v1/session", (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : "";
  
    if (sid) {
      res.clearCookie("sid");
    }
  
    if (username) {
      sessions.deleteSession(sid);
    }
    
    res.json({ loggedOut: true });
});

//message: get/post/delete

app.get("/api/v1/messages", (req, res) => {
    if (!authenticate(req, res)) return;
    res.json(messages.messages);
});


app.post("/api/v1/messages", (req, res) => {
    //username is obtained from the authenticated session 
    const username = authenticate(req, res); 
    if (!username) return; 

    //get username input 
    const { newMessage } = req.body; 
    if (!newMessage) {
        res.status(400).json({ error: "input-invalid" });
        return;
    }

    //add message 
    const messageText = messages.addMessage(username, newMessage);
    res.status(200).json(messageText);

    // Data structure of messageText:
    // {
    //  id: '3bbe1720-ab75-40a0-a1c1-945c956bff0d',
    //  sender: 'xujia',
    //  text: 'hi'
    // }
})



app.delete("/api/v1/messages/:id", (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : "";
  
    if (!sid || !users.isValid(username)) {
      return res.status(401).json({ error: "auth-missing" });
    }
    
    //`/api/v1/messages/${id}`, const { id } = req.params
    const { id } = req.params;
  
    if (id in messages.messages) {
      messages.deleteMessage(id);
      return res.json(messages.messages);
    }
  
    return res.status(404).json({ error: "message-missing" });
});


app.patch("/api/v1/messages/:id", (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : "";
  
    if (!sid || !users.isValid(username)) {
      return res.status(401).json({ error: "auth-missing" });
    }
  
    const { id } = req.params;
    const { editedMessage } = req.body;
  
    if (id in messages.messages) {
      messages.editMessage({ id, editedMessage });
      return res.json(messages.messages);
    }
  
    return res.status(404).json({ error: "message-missing" });
});
  
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
