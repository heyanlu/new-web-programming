// This file demonstrates the data structures used for this project
// They are not exported to other files

const sessions = {
    id1: {
      username: "Bob",
    },
    id2: {
      username: "Alice",
    },
    id3: {
      username: "Bob", // He logs in from another device
    },
  };
  
  const users = {
    Bob: [
      { messageId: "1", text: "dragon" },
      { messageId: "2", text: "sheep" },
    ],
    Alice: [
      { messageId: "3", text: "tiger" },
      { messageId: "4", text: "bull" },
    ],
  };
  
  // Use object not array, because we don't want to copy arrays after a user logs off
  const activeUsers = {
    Bob: true,
    Alice: true,
  };
  
  // Active users all have sessions.
  // We can grap values and then add a check to remove duplicates
  function getActiveUsers(sessions) {
    const activeUsers = {};
  
    for (const sid in sessions) {
      const username = sessions[sid].username;
      activeUsers[username] = true;
    }
  
    return activeUsers;
  }
  // console.log(getActiveUsers(sessions));
  
  const messageHistory = {
    Cathy: {
      Alice: [
        {
          id: 1,
          sender: "Cathy",
          timestamp: "2024-03-18T12:00:00Z",
          content: "Hey Alice, how are you?",
        },
        {
          id: 2,
          sender: "Alice",
          timestamp: "2024-03-18T12:05:00Z",
          content: "I'm good, thanks! How about you?",
        },
        // Other messages between Cathy and Alice...
      ],
      Bob: [
        {
          id: 1,
          sender: "Cathy",
          timestamp: "2024-03-18T12:10:00Z",
          content: "Hi Bob, what's up?",
        },
        {
          id: 2,
          sender: "Bob",
          timestamp: "2024-03-18T12:15:00Z",
          content: "Not much, just working on some stuff. How about you?",
        },
        // Other messages between Cathy and Bob...
      ],
      // Other users Cathy has conversed with...
    },
    // Other users...
  };
  
  // Practice: Load conversation between Alice and Bob
  function getConversation(messageHistory, user1, user2) {
    return messageHistory[user1][user2];
  }
  
  // console.log(getConversation(messageHistory, "Cathy", "Bob"));
  
  // When I click a user on the list, the click event which will GET my conversation history with him
  // The conversation is displayed in UI, in the place of public message
  // If I send a message, it will POST sender, recipient, the new message
  // If the recipient sends me a message, my UI is supposed to render automatically
  // On server, the conversation state is updated to that sender, that recipient
  // Then the recipient UI is supposed to update automatically