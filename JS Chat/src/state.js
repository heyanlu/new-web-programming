//single-page applications (SPAs) , front end
//inital state/state management (logging in, logging out, updating active users...)/state variables (isLoggedIn, activeUsers, message)

import { MESSAGES } from "./constants";


export const state = {
    activeUsers: {},
    messages: {}, 
    isLoggedIn: false, 
    isLoginPending: false, 
    isPageLoading: false, 
    username: "", 
    recipient: "", 
    error: "",
    timeId:"", 
    editingMessageId:"", 
}


export function waitOnLogin() {
    state.isLoggedIn = false;
    state.isLoginPending = true;
    state.username = "";
    state.recipient = "";
    state.activeUsers = {};
    state.messages = {};
    state.error = "";
}


export function login(username) {
    state.isLoggedIn = true;
    state.isLoginPending = false;
    state.username = username;
    state.error = "";
}
  
export function logout() {
    state.isLoggedIn = false;
    state.isLoginPending = false;
    state.username = "";
    state.recipient = "";
    state.activeUsers = {};
    state.messages = {};
}


export function waitOnload() {
    state.isPageLoading = true;
}
  
export function setLoad() {
    state.isPageLoading = false;
}


export function updateActiveUsers(activeUsers) {
    state.activeUsers = { ...activeUsers }; 
}


export function updateMessages(messages) {
    state.messages = { ...messages }; 
}


export function addMessage(newMessage) {
    state.messages = { ...state.messages, [newMessage.id]: newMessage };
}
  
export function deleteMessage(id) {
    delete state.messages[id];
}

export function setEditingMessageId(id) {
    state.editingMessageId = id;
}

export function editMessage({ id, editedMessage }) {
    if (state.messages[id]) { 
        state.messages[id].text = editedMessage;
    }
}

export function setError(error) {
    if (!error) {
      console.log("no error");
      state.error = "";
      return;
    }
  
    if (error === "auth-missing") {
      return;
    }
  
    state.isLoginPending = false;
    state.error = MESSAGES[error] || MESSAGES.default;
}

export default state;