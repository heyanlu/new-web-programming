const uuid = require("uuid").v4;

const id1 = uuid();
const id2 = uuid();
const id3 = uuid();

const messages = {
  [id1]: {
    id: id1,
    sender: "Alice",
    text: "What's up?",
  },
  [id2]: {
    id: id2,
    sender: "Bob",
    text: "Yo! Scatching my head doing INFO6250 project2.",
  },
  [id3]: {
    id: id3,
    sender: "Cathy",
    text: "Same here! Can anybody do this?",
  },
};

function addMessage(username, messageText) {
  const id = uuid();
  const newMessage = {
    id: id,
    sender: username,
    text: messageText,
  };

  // Update messages object
  messages[id] = newMessage;

  // Return new message so that the post api can send it to the frontend
  return newMessage;
}

function deleteMessage(id) {
  delete messages[id];
}

function editMessage({ id, editedMessage }) {
  messages[id].text = editedMessage;
}

module.exports = {
  messages,
  addMessage,
  deleteMessage,
  editMessage,
};