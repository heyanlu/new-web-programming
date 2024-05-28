const uuid = require("uuid").v4; 

sessions = {}; //sessions[sid] = username

function addSession(username) {
    const exsitingSession = Object.values(sessions).find(
        (session) => session.usernmae === username
    ); 

    if (exsitingSession) {
        return Object.keys(sessions).find(
            (sid) => sessions[sid].username === username
        );
    }
    // Otherwise create a new sid
    const sid = uuid();
    sessions[sid] = { username };
    return sid;

}


function getSessionUser(sid) {
    if (!sid || !sessions[sid]) {
        return "";
      }
    
      return sessions[sid].username;

}

function deleteSession(sid) {
    delete sessions[sid];
  }
  
  module.exports = {
    sessions,
    addSession,
    getSessionUser,
    deleteSession,
  };