// sessions = {}
// sessions[sid] = username

// users = {};
// users[username] = {
//   userSessions: {},
//   isLoggedIn: Object.keys(userSessions).length > 0,
// };

// TODO: Missing logic to record all active users.
// Whoever has at least one sid is active, and should be put in activeUsers object

const users = {};

// Validate user
function isValid(username) {
  let isValid = true;
  isValid = !!username && username.trim();
  isValid = isValid && username.match(/^[A-Za-z0-9]+$/);
  return isValid;
}

// Get active users list
function getActiveUsers(sessions) {
  const activeUsers = {};

  for (const sid in sessions) {
    const username = sessions[sid].username;
    activeUsers[username] = true;
  }

  return activeUsers;
}

function getUserData(username) {
  return users[username];
}

// I don't understand the following function
function addUserData(username, userData) {
  users[username] = userData;
}

module.exports = {
  isValid,
  getActiveUsers,

  getUserData,
  addUserData,
};

// user logs in on a new device
// a new session id will be assgined, regardless he has already other sids elsewhere
// we add the new sid to his data
// and we know how many sessions he is in
// when he logs out from this device, this current sid is removed,
// but he stays logged in elsewhere, and for other users, his name is still on the list
// his name will disppear when he logs out from all devices