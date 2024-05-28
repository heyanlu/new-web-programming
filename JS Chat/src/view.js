import { updateActiveUsers, updateMessages, logout } from "./state";
import { fetchSession } from "./services";

export function dynamicContent({ appEl, state }) {
  fetchSession()
    .then((data) => {
      updateActiveUsers(data.activeUsers);
      updateMessages(data.channelMessages);

      const usersHtml = generateActiveUsersList(state);
      const messagesHtml = generateMessagesList(state);

      document.querySelector(".users-list").innerHTML = usersHtml;
      document.querySelector(".messages-list").innerHTML = messagesHtml;
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

function render({ appEl, state }) {
  const html = `
    <header>${generateHeader(state)}</header>
    <main class='main'>
      ${generateLoginHtml(state)}
      ${generateActiveUsersList(state)}
      ${generateMessageArea(state)}
    </main>
  `;
  appEl.innerHTML = html;
}

function generateLoginHtml(state) {
  if (state.isLoggedIn) {
    return ``;
  }

  if (state.isLoginPending) {
    return `
    <div>Logging in...</div>
    `;
  }

  return `
    <div class='form-container'>
      <form class='login-form'>
        <label class='form-label' for='username' />
          Username:
        <input class='username' id='username' name='username' placeholder='Enter username' />
        <div class='form-button-container'>
          <button class='button-login' type='submit'>Login</button>
        </div>
      </form>
      <p class='error-message'>${state.error}</p>
    </div>
  `;
}

function generateHeader(state) {
  if (!state.isLoggedIn) {
    return "";
  }

  return `
      <header>
        <div class='header-control'>
          <span class='header-greeting'>Hello, ${state.username}</span>
          <form class="form-logout">
            <button class="button-logout" type="submit">Logout</button>
          </form>
        </div>
      </header>
  `;
}

function generateActiveUsersList(state) {
  if (!state.isLoggedIn) {
    return "";
  }

  if (state.isPageLoading) {
    return `
    <ul class=users-list>Loading...</ul>
    `;
  }

  return `
      <ul class='users-list'>
      ${Object.keys(state.activeUsers)
        .map(
          (user) =>
            `
        <li class='user-single' data-username=${user}>
          <i class='fas fa-user user-icon'></i>
          <span class='user-name'>${user}</span>
        </li>
        `
        )
        .join("")}
        </ul>
    `;
}

function generateMessageArea(state) {
  if (!state.isLoggedIn) {
    return "";
  }

  return `
    <div class='message-area'>
      ${generateMessagesList(state)}
      ${generateWriteMessage(state)}
    </div>
  `;
}

function generateMessagesList(state) {
  if (!state.isLoggedIn || state.isPrivateChatOn) {
    return "";
  }

  if (state.isPageLoading) {
    return `
      <ul class='messages-list'>Loading...</ul>
    `;
  }

  return `
  <ul class='messages-list'>
    ${Object.keys(state.messages)
      .map((messageId) => {
        const message = state.messages[messageId];
        if (state.editingMessageId === messageId) {
          return `
          <li class='sent-message-container'>
            <span class='sender-name'>
            ${message.sender}
            </span>
            <form class='edit-form'>
              <input class='edit-message' name='editMessage' value='${message.text}'/>
            <button class='button-submit' type='submit'>Save</button>
            </form>
          </li>
        `;
        } else {
          return `
          <li class='sent-message-container'>
            <span class='sender-name'>
              ${message.sender}
            </span>
            <div class="text-container">
              <span class="message-text">
                ${message.text}
              </span>
              ${
                message.sender === state.username
                  ? `
                    <div class='text-button-container'>
                      <button 
                        class='button-delete' 
                        type='button'
                        data-id='${message.id}'
                        data-sender='${message.sender}'
                      >
                        Delete
                      </button>
                      <button 
                        class='button-edit'
                        type='button'
                        data-id='${message.id}'
                        data-sender='${message.sender}'
                      >
                        Edit
                      </button>
                    </div>
                  `
                  : ""
              }
            </div>
          </li>
        `;
        }
      })
      .join("")}
  </ul>
`;
}

function generateWriteMessage(state) {
  if (!state.isLoggedIn) {
    return "";
  }

  return `
    <form class="sender-form">
      <div class="write-message-container">
        <textarea class="sender-message" name="text" placeholder="Enter message..."></textarea>
        <div class="button-container">
          <button class="submit-button" type="submit">Send</button>
        </div>
      </div>
    </form>
  `;
}

export default render;