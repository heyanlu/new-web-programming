//controller 
import state, {
  waitOnLogin,
  login,
  logout,
  waitOnload,
  setLoad,
  updateActiveUsers,
  updateMessages,
  addMessage,
  deleteMessage,
  setError,
  setEditingMessageId,
  editMessage,
} from "./state.js";

import {
  fetchSession,
  fetchLogin,
  fetchLogout,
  sendMessage,
  fetchDeleteMessage,
  fetchEditMessage,
} from "./services.js";

import render, { dynamicContent } from "./view.js";

const appEl = document.querySelector("#app");

// Regular Polling
function startDynamicRendering({ appEl, state }) {
  const { timeId } = state.timeId;

  clearTimeout(timeId);

  const newTimeId = setTimeout(() => {
    console.log("Dynamic rendering...");
    dynamicContent({ appEl, state });
    startDynamicRendering({ appEl, state });
  }, 500000);

  state.timeId = newTimeId;
}

function stopDynamicRendering() {
  const { timeId } = state.timeId;
  clearTimeout(timeId);
  state.timeId = "";
}

// Auto scrolling to bottom
function scrollToBottom() {
  const messageContainer = document.querySelector(".messages-list");

  if (messageContainer) {
    messageContainer.scrollTop = messageContainer.scrollHeight;
  }
}

// Listen to submit events
appEl.addEventListener("submit", (e) => {
  e.preventDefault();

  // Login
  if (e.target.classList.contains("login-form")) {
    const username = document.querySelector(".username").value;
    waitOnLogin();
    render({ appEl, state });

    // Async stuff
    fetchLogin(username)
      .then(() => {
        waitOnload();
        render({ appEl, state });
        return fetchSession();
      })
      .then((data) => {
        login(data.username);
        setLoad();
        updateActiveUsers(data.activeUsers);
        updateMessages(data.channelMessages);
        render({ appEl, state });
        startDynamicRendering({ appEl, state });
      })
      .catch((err) => {
        console.log(err.error);
        setError(err.error);
        render({ appEl, state });
      });
  }

  // Post message
  if (e.target.classList.contains("sender-form")) {
    const messageText = document.querySelector(".sender-message").value;

    sendMessage(messageText)
      .then((message) => {
        addMessage(message);
        render({ appEl, state });
        scrollToBottom();
      })
      .catch((err) => {
        console.log(err);
        logout();
        fetchLogout()
          .then(() => {
            render({ appEl, state });
          })
          .catch((err) => {
            console.log(err);
            render({ appEl, state });
          });
      });
  }

  // Save edit message
  if (e.target.classList.contains("edit-form")) {
    const editedMessage = document.querySelector(".edit-message").value;

    // Get the id of the message to be replaced
    const id = state.editingMessageId;

    fetchEditMessage({ id, editedMessage })
      .then((data) => {
        editMessage({ id, editedMessage });
        setEditingMessageId("");
        render({ appEl, state });
      })
      .catch((err) => {
        console.log(err);
        render({ appEl, state });
        logout();
        fetchLogout()
          .then(() => {
            render({ appEl, state });
          })
          .catch((err) => {
            console.log(err);
            render({ appEl, state });
          });
      });
  }
});

// Listen to click events
appEl.addEventListener("click", (e) => {
  // Logout
  if (e.target.classList.contains("button-logout")) {
    logout();
    fetchLogout()
      .then(() => {
        stopDynamicRendering();
        render({ appEl, state });
      })
      .catch((err) => {
        console.log(err);
        render({ appEl, state });
      });
  }

  // Delete message
  if (e.target.classList.contains("button-delete")) {
    const sender = e.target.dataset.sender;
    const currentUser = state.username;

    // Find the message id
    const id = e.target.dataset.id;

    if (sender === currentUser) {
      fetchDeleteMessage(id)
        .then((data) => {
          deleteMessage(id);
          render({ appEl, state });
        })
        .catch((err) => {
          console.log(err);
          render({ appEl, state });
          logout();
          fetchLogout()
            .then(() => {
              render({ appEl, state });
            })
            .catch((err) => {
              console.log(err);
              render({ appEl, state });
            });
        });
    }
  }

  // Edit message
  if (e.target.classList.contains("button-edit")) {
    // I can only delete/edit my messages
    // The check is done on the UI, where only my message can display delete/edit buttons
    const sender = e.target.dataset.sender;
    const currentUser = state.username;
    const id = e.target.dataset.id;

    if (sender === currentUser) {
      setEditingMessageId(id);
      render({ appEl, state });
    }
    // Now we have edit form which is a submit event
  }
});

// On load
fetchSession()
  .then((data) => {
    login(data.username);
    updateActiveUsers(data.activeUsers);
    updateMessages(data.channelMessages);
    render({ appEl, state });
    data.username && startDynamicRendering({ appEl, state });
  })
  .catch((err) => {
    setError(err.error);
    render({ appEl, state });
  });