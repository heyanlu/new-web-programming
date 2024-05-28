/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/constants.js":
/*!**************************!*\
  !*** ./src/constants.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MESSAGES: () => (/* binding */ MESSAGES)
/* harmony export */ });
var MESSAGES = {
  "auth-missing": "",
  "network-error": "No network. Please check your Internet connection.",
  "required-username": "Username can only contain letters and/or numbers",
  "auth-insufficient": "Username cannot be 'dog'",
  "invalid-word": "Word cannot contain numbers or symbols",
  "default": "Something went wrong, please come back later"
};

/***/ }),

/***/ "./src/services.js":
/*!*************************!*\
  !*** ./src/services.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fetchDeleteMessage: () => (/* binding */ fetchDeleteMessage),
/* harmony export */   fetchEditMessage: () => (/* binding */ fetchEditMessage),
/* harmony export */   fetchLogin: () => (/* binding */ fetchLogin),
/* harmony export */   fetchLogout: () => (/* binding */ fetchLogout),
/* harmony export */   fetchSession: () => (/* binding */ fetchSession),
/* harmony export */   sendMessage: () => (/* binding */ sendMessage)
/* harmony export */ });
//interacting with external APIs or back-end services
//fetch or update data from the server
//e.g, user input -> send to server -> communicate with server via service.js - Handle Server Response
//update application states - Reflect State Changes in UI

//retrieving session data,
function fetchSession() {
  return fetch("/api/v1/session")["catch"](function (err) {
    return Promise.reject({
      error: "network-error"
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (err) {
        return Promise.reject(err);
      });
    }
    return response.json();
  });
}
function fetchLogin(username) {
  return fetch("/api/v1/session/", {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({
      username: username
    })
  })["catch"](function (err) {
    return Promise.reject({
      error: "network-error"
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (err) {
        return Promise.reject(err);
      });
    }
    return response.json();
  });
}
function fetchLogout() {
  return fetch("/api/v1/session", {
    method: "DELETE"
  })["catch"](function (err) {
    return Promise.reject({
      error: "network-error"
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (err) {
        return Promise.reject(err);
      });
    }
    return response.json(); // This return is fairly useless
  });
}
function sendMessage(newMessage) {
  return fetch("/api/v1/messages", {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({
      newMessage: newMessage
    })
  })["catch"](function (err) {
    return Promise.reject({
      error: "network-error"
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (err) {
        return Promise.reject(err);
      });
    }
    return response.json();
  });
}
function fetchDeleteMessage(id) {
  return fetch("/api/v1/messages/".concat(id), {
    method: "DELETE"
  })["catch"](function () {
    return Promise.reject({
      error: "networkError"
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (err) {
        return Promise.reject(err);
      });
    }
    return response.json();
  });
}
function fetchEditMessage(_ref) {
  var id = _ref.id,
    editedMessage = _ref.editedMessage;
  return fetch("/api/v1/messages/".concat(id), {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      editedMessage: editedMessage
    })
  })["catch"](function () {
    return Promise.reject({
      error: "networkError"
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (err) {
        return Promise.reject(err);
      });
    }
    return response.json();
  });
}

/***/ }),

/***/ "./src/state.js":
/*!**********************!*\
  !*** ./src/state.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addMessage: () => (/* binding */ addMessage),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   deleteMessage: () => (/* binding */ deleteMessage),
/* harmony export */   editMessage: () => (/* binding */ editMessage),
/* harmony export */   login: () => (/* binding */ login),
/* harmony export */   logout: () => (/* binding */ logout),
/* harmony export */   setEditingMessageId: () => (/* binding */ setEditingMessageId),
/* harmony export */   setError: () => (/* binding */ setError),
/* harmony export */   setLoad: () => (/* binding */ setLoad),
/* harmony export */   state: () => (/* binding */ state),
/* harmony export */   updateActiveUsers: () => (/* binding */ updateActiveUsers),
/* harmony export */   updateMessages: () => (/* binding */ updateMessages),
/* harmony export */   waitOnLogin: () => (/* binding */ waitOnLogin),
/* harmony export */   waitOnload: () => (/* binding */ waitOnload)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./src/constants.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
//single-page applications (SPAs) , front end
//inital state/state management (logging in, logging out, updating active users...)/state variables (isLoggedIn, activeUsers, message)


var state = {
  activeUsers: {},
  messages: {},
  isLoggedIn: false,
  isLoginPending: false,
  isPageLoading: false,
  username: "",
  recipient: "",
  error: "",
  timeId: "",
  editingMessageId: ""
};
function waitOnLogin() {
  state.isLoggedIn = false;
  state.isLoginPending = true;
  state.username = "";
  state.recipient = "";
  state.activeUsers = {};
  state.messages = {};
  state.error = "";
}
function login(username) {
  state.isLoggedIn = true;
  state.isLoginPending = false;
  state.username = username;
  state.error = "";
}
function logout() {
  state.isLoggedIn = false;
  state.isLoginPending = false;
  state.username = "";
  state.recipient = "";
  state.activeUsers = {};
  state.messages = {};
}
function waitOnload() {
  state.isPageLoading = true;
}
function setLoad() {
  state.isPageLoading = false;
}
function updateActiveUsers(activeUsers) {
  state.activeUsers = _objectSpread({}, activeUsers);
}
function updateMessages(messages) {
  state.messages = _objectSpread({}, messages);
}
function addMessage(newMessage) {
  state.messages = _objectSpread(_objectSpread({}, state.messages), {}, _defineProperty({}, newMessage.id, newMessage));
}
function deleteMessage(id) {
  delete state.messages[id];
}
function setEditingMessageId(id) {
  state.editingMessageId = id;
}
function editMessage(_ref) {
  var id = _ref.id,
    editedMessage = _ref.editedMessage;
  if (state.messages[id]) {
    state.messages[id].text = editedMessage;
  }
}
function setError(error) {
  if (!error) {
    console.log("no error");
    state.error = "";
    return;
  }
  if (error === "auth-missing") {
    return;
  }
  state.isLoginPending = false;
  state.error = _constants__WEBPACK_IMPORTED_MODULE_0__.MESSAGES[error] || _constants__WEBPACK_IMPORTED_MODULE_0__.MESSAGES["default"];
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (state);

/***/ }),

/***/ "./src/view.js":
/*!*********************!*\
  !*** ./src/view.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   dynamicContent: () => (/* binding */ dynamicContent)
/* harmony export */ });
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./state */ "./src/state.js");
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./services */ "./src/services.js");


function dynamicContent(_ref) {
  var appEl = _ref.appEl,
    state = _ref.state;
  (0,_services__WEBPACK_IMPORTED_MODULE_1__.fetchSession)().then(function (data) {
    (0,_state__WEBPACK_IMPORTED_MODULE_0__.updateActiveUsers)(data.activeUsers);
    (0,_state__WEBPACK_IMPORTED_MODULE_0__.updateMessages)(data.channelMessages);
    var usersHtml = generateActiveUsersList(state);
    var messagesHtml = generateMessagesList(state);
    document.querySelector(".users-list").innerHTML = usersHtml;
    document.querySelector(".messages-list").innerHTML = messagesHtml;
  })["catch"](function (err) {
    console.log(err);
    (0,_state__WEBPACK_IMPORTED_MODULE_0__.logout)();
    fetchLogout().then(function () {
      render({
        appEl: appEl,
        state: state
      });
    })["catch"](function (err) {
      console.log(err);
      render({
        appEl: appEl,
        state: state
      });
    });
  });
}
function render(_ref2) {
  var appEl = _ref2.appEl,
    state = _ref2.state;
  var html = "\n    <header>".concat(generateHeader(state), "</header>\n    <main class='main'>\n      ").concat(generateLoginHtml(state), "\n      ").concat(generateActiveUsersList(state), "\n      ").concat(generateMessageArea(state), "\n    </main>\n  ");
  appEl.innerHTML = html;
}
function generateLoginHtml(state) {
  if (state.isLoggedIn) {
    return "";
  }
  if (state.isLoginPending) {
    return "\n    <div>Logging in...</div>\n    ";
  }
  return "\n    <div class='form-container'>\n      <form class='login-form'>\n        <label class='form-label' for='username' />\n          Username:\n        <input class='username' id='username' name='username' placeholder='Enter username' />\n        <div class='form-button-container'>\n          <button class='button-login' type='submit'>Login</button>\n        </div>\n      </form>\n      <p class='error-message'>".concat(state.error, "</p>\n    </div>\n  ");
}
function generateHeader(state) {
  if (!state.isLoggedIn) {
    return "";
  }
  return "\n      <header>\n        <div class='header-control'>\n          <span class='header-greeting'>Hello, ".concat(state.username, "</span>\n          <form class=\"form-logout\">\n            <button class=\"button-logout\" type=\"submit\">Logout</button>\n          </form>\n        </div>\n      </header>\n  ");
}
function generateActiveUsersList(state) {
  if (!state.isLoggedIn) {
    return "";
  }
  if (state.isPageLoading) {
    return "\n    <ul class=users-list>Loading...</ul>\n    ";
  }
  return "\n      <ul class='users-list'>\n      ".concat(Object.keys(state.activeUsers).map(function (user) {
    return "\n        <li class='user-single' data-username=".concat(user, ">\n          <i class='fas fa-user user-icon'></i>\n          <span class='user-name'>").concat(user, "</span>\n        </li>\n        ");
  }).join(""), "\n        </ul>\n    ");
}
function generateMessageArea(state) {
  if (!state.isLoggedIn) {
    return "";
  }
  return "\n    <div class='message-area'>\n      ".concat(generateMessagesList(state), "\n      ").concat(generateWriteMessage(state), "\n    </div>\n  ");
}
function generateMessagesList(state) {
  if (!state.isLoggedIn || state.isPrivateChatOn) {
    return "";
  }
  if (state.isPageLoading) {
    return "\n      <ul class='messages-list'>Loading...</ul>\n    ";
  }
  return "\n  <ul class='messages-list'>\n    ".concat(Object.keys(state.messages).map(function (messageId) {
    var message = state.messages[messageId];
    if (state.editingMessageId === messageId) {
      return "\n          <li class='sent-message-container'>\n            <span class='sender-name'>\n            ".concat(message.sender, "\n            </span>\n            <form class='edit-form'>\n              <input class='edit-message' name='editMessage' value='").concat(message.text, "'/>\n            <button class='button-submit' type='submit'>Save</button>\n            </form>\n          </li>\n        ");
    } else {
      return "\n          <li class='sent-message-container'>\n            <span class='sender-name'>\n              ".concat(message.sender, "\n            </span>\n            <div class=\"text-container\">\n              <span class=\"message-text\">\n                ").concat(message.text, "\n              </span>\n              ").concat(message.sender === state.username ? "\n                    <div class='text-button-container'>\n                      <button \n                        class='button-delete' \n                        type='button'\n                        data-id='".concat(message.id, "'\n                        data-sender='").concat(message.sender, "'\n                      >\n                        Delete\n                      </button>\n                      <button \n                        class='button-edit'\n                        type='button'\n                        data-id='").concat(message.id, "'\n                        data-sender='").concat(message.sender, "'\n                      >\n                        Edit\n                      </button>\n                    </div>\n                  ") : "", "\n            </div>\n          </li>\n        ");
    }
  }).join(""), "\n  </ul>\n");
}
function generateWriteMessage(state) {
  if (!state.isLoggedIn) {
    return "";
  }
  return "\n    <form class=\"sender-form\">\n      <div class=\"write-message-container\">\n        <textarea class=\"sender-message\" name=\"text\" placeholder=\"Enter message...\"></textarea>\n        <div class=\"button-container\">\n          <button class=\"submit-button\" type=\"submit\">Send</button>\n        </div>\n      </div>\n    </form>\n  ";
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (render);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _state_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./state.js */ "./src/state.js");
/* harmony import */ var _services_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./services.js */ "./src/services.js");
/* harmony import */ var _view_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./view.js */ "./src/view.js");
//controller 



var appEl = document.querySelector("#app");

// Regular Polling
function startDynamicRendering(_ref) {
  var appEl = _ref.appEl,
    state = _ref.state;
  var timeId = state.timeId.timeId;
  clearTimeout(timeId);
  var newTimeId = setTimeout(function () {
    console.log("Dynamic rendering...");
    (0,_view_js__WEBPACK_IMPORTED_MODULE_2__.dynamicContent)({
      appEl: appEl,
      state: state
    });
    startDynamicRendering({
      appEl: appEl,
      state: state
    });
  }, 500000);
  state.timeId = newTimeId;
}
function stopDynamicRendering() {
  var timeId = _state_js__WEBPACK_IMPORTED_MODULE_0__["default"].timeId.timeId;
  clearTimeout(timeId);
  _state_js__WEBPACK_IMPORTED_MODULE_0__["default"].timeId = "";
}

// Auto scrolling to bottom
function scrollToBottom() {
  var messageContainer = document.querySelector(".messages-list");
  if (messageContainer) {
    messageContainer.scrollTop = messageContainer.scrollHeight;
  }
}

// Listen to submit events
appEl.addEventListener("submit", function (e) {
  e.preventDefault();

  // Login
  if (e.target.classList.contains("login-form")) {
    var username = document.querySelector(".username").value;
    (0,_state_js__WEBPACK_IMPORTED_MODULE_0__.waitOnLogin)();
    (0,_view_js__WEBPACK_IMPORTED_MODULE_2__["default"])({
      appEl: appEl,
      state: _state_js__WEBPACK_IMPORTED_MODULE_0__["default"]
    });

    // Async stuff
    (0,_services_js__WEBPACK_IMPORTED_MODULE_1__.fetchLogin)(username).then(function () {
      (0,_state_js__WEBPACK_IMPORTED_MODULE_0__.waitOnload)();
      (0,_view_js__WEBPACK_IMPORTED_MODULE_2__["default"])({
        appEl: appEl,
        state: _state_js__WEBPACK_IMPORTED_MODULE_0__["default"]
      });
      return (0,_services_js__WEBPACK_IMPORTED_MODULE_1__.fetchSession)();
    }).then(function (data) {
      (0,_state_js__WEBPACK_IMPORTED_MODULE_0__.login)(data.username);
      (0,_state_js__WEBPACK_IMPORTED_MODULE_0__.setLoad)();
      (0,_state_js__WEBPACK_IMPORTED_MODULE_0__.updateActiveUsers)(data.activeUsers);
      (0,_state_js__WEBPACK_IMPORTED_MODULE_0__.updateMessages)(data.channelMessages);
      (0,_view_js__WEBPACK_IMPORTED_MODULE_2__["default"])({
        appEl: appEl,
        state: _state_js__WEBPACK_IMPORTED_MODULE_0__["default"]
      });
      startDynamicRendering({
        appEl: appEl,
        state: _state_js__WEBPACK_IMPORTED_MODULE_0__["default"]
      });
    })["catch"](function (err) {
      console.log(err.error);
      (0,_state_js__WEBPACK_IMPORTED_MODULE_0__.setError)(err.error);
      (0,_view_js__WEBPACK_IMPORTED_MODULE_2__["default"])({
        appEl: appEl,
        state: _state_js__WEBPACK_IMPORTED_MODULE_0__["default"]
      });
    });
  }

  // Post message
  if (e.target.classList.contains("sender-form")) {
    var messageText = document.querySelector(".sender-message").value;
    (0,_services_js__WEBPACK_IMPORTED_MODULE_1__.sendMessage)(messageText).then(function (message) {
      (0,_state_js__WEBPACK_IMPORTED_MODULE_0__.addMessage)(message);
      (0,_view_js__WEBPACK_IMPORTED_MODULE_2__["default"])({
        appEl: appEl,
        state: _state_js__WEBPACK_IMPORTED_MODULE_0__["default"]
      });
      scrollToBottom();
    })["catch"](function (err) {
      console.log(err);
      (0,_state_js__WEBPACK_IMPORTED_MODULE_0__.logout)();
      (0,_services_js__WEBPACK_IMPORTED_MODULE_1__.fetchLogout)().then(function () {
        (0,_view_js__WEBPACK_IMPORTED_MODULE_2__["default"])({
          appEl: appEl,
          state: _state_js__WEBPACK_IMPORTED_MODULE_0__["default"]
        });
      })["catch"](function (err) {
        console.log(err);
        (0,_view_js__WEBPACK_IMPORTED_MODULE_2__["default"])({
          appEl: appEl,
          state: _state_js__WEBPACK_IMPORTED_MODULE_0__["default"]
        });
      });
    });
  }

  // Save edit message
  if (e.target.classList.contains("edit-form")) {
    var editedMessage = document.querySelector(".edit-message").value;

    // Get the id of the message to be replaced
    var id = _state_js__WEBPACK_IMPORTED_MODULE_0__["default"].editingMessageId;
    (0,_services_js__WEBPACK_IMPORTED_MODULE_1__.fetchEditMessage)({
      id: id,
      editedMessage: editedMessage
    }).then(function (data) {
      (0,_state_js__WEBPACK_IMPORTED_MODULE_0__.editMessage)({
        id: id,
        editedMessage: editedMessage
      });
      (0,_state_js__WEBPACK_IMPORTED_MODULE_0__.setEditingMessageId)("");
      (0,_view_js__WEBPACK_IMPORTED_MODULE_2__["default"])({
        appEl: appEl,
        state: _state_js__WEBPACK_IMPORTED_MODULE_0__["default"]
      });
    })["catch"](function (err) {
      console.log(err);
      (0,_view_js__WEBPACK_IMPORTED_MODULE_2__["default"])({
        appEl: appEl,
        state: _state_js__WEBPACK_IMPORTED_MODULE_0__["default"]
      });
      (0,_state_js__WEBPACK_IMPORTED_MODULE_0__.logout)();
      (0,_services_js__WEBPACK_IMPORTED_MODULE_1__.fetchLogout)().then(function () {
        (0,_view_js__WEBPACK_IMPORTED_MODULE_2__["default"])({
          appEl: appEl,
          state: _state_js__WEBPACK_IMPORTED_MODULE_0__["default"]
        });
      })["catch"](function (err) {
        console.log(err);
        (0,_view_js__WEBPACK_IMPORTED_MODULE_2__["default"])({
          appEl: appEl,
          state: _state_js__WEBPACK_IMPORTED_MODULE_0__["default"]
        });
      });
    });
  }
});

// Listen to click events
appEl.addEventListener("click", function (e) {
  // Logout
  if (e.target.classList.contains("button-logout")) {
    (0,_state_js__WEBPACK_IMPORTED_MODULE_0__.logout)();
    (0,_services_js__WEBPACK_IMPORTED_MODULE_1__.fetchLogout)().then(function () {
      stopDynamicRendering();
      (0,_view_js__WEBPACK_IMPORTED_MODULE_2__["default"])({
        appEl: appEl,
        state: _state_js__WEBPACK_IMPORTED_MODULE_0__["default"]
      });
    })["catch"](function (err) {
      console.log(err);
      (0,_view_js__WEBPACK_IMPORTED_MODULE_2__["default"])({
        appEl: appEl,
        state: _state_js__WEBPACK_IMPORTED_MODULE_0__["default"]
      });
    });
  }

  // Delete message
  if (e.target.classList.contains("button-delete")) {
    var sender = e.target.dataset.sender;
    var currentUser = _state_js__WEBPACK_IMPORTED_MODULE_0__["default"].username;

    // Find the message id
    var id = e.target.dataset.id;
    if (sender === currentUser) {
      (0,_services_js__WEBPACK_IMPORTED_MODULE_1__.fetchDeleteMessage)(id).then(function (data) {
        (0,_state_js__WEBPACK_IMPORTED_MODULE_0__.deleteMessage)(id);
        (0,_view_js__WEBPACK_IMPORTED_MODULE_2__["default"])({
          appEl: appEl,
          state: _state_js__WEBPACK_IMPORTED_MODULE_0__["default"]
        });
      })["catch"](function (err) {
        console.log(err);
        (0,_view_js__WEBPACK_IMPORTED_MODULE_2__["default"])({
          appEl: appEl,
          state: _state_js__WEBPACK_IMPORTED_MODULE_0__["default"]
        });
        (0,_state_js__WEBPACK_IMPORTED_MODULE_0__.logout)();
        (0,_services_js__WEBPACK_IMPORTED_MODULE_1__.fetchLogout)().then(function () {
          (0,_view_js__WEBPACK_IMPORTED_MODULE_2__["default"])({
            appEl: appEl,
            state: _state_js__WEBPACK_IMPORTED_MODULE_0__["default"]
          });
        })["catch"](function (err) {
          console.log(err);
          (0,_view_js__WEBPACK_IMPORTED_MODULE_2__["default"])({
            appEl: appEl,
            state: _state_js__WEBPACK_IMPORTED_MODULE_0__["default"]
          });
        });
      });
    }
  }

  // Edit message
  if (e.target.classList.contains("button-edit")) {
    // I can only delete/edit my messages
    // The check is done on the UI, where only my message can display delete/edit buttons
    var _sender = e.target.dataset.sender;
    var _currentUser = _state_js__WEBPACK_IMPORTED_MODULE_0__["default"].username;
    var _id = e.target.dataset.id;
    if (_sender === _currentUser) {
      (0,_state_js__WEBPACK_IMPORTED_MODULE_0__.setEditingMessageId)(_id);
      (0,_view_js__WEBPACK_IMPORTED_MODULE_2__["default"])({
        appEl: appEl,
        state: _state_js__WEBPACK_IMPORTED_MODULE_0__["default"]
      });
    }
    // Now we have edit form which is a submit event
  }
});

// On load
(0,_services_js__WEBPACK_IMPORTED_MODULE_1__.fetchSession)().then(function (data) {
  (0,_state_js__WEBPACK_IMPORTED_MODULE_0__.login)(data.username);
  (0,_state_js__WEBPACK_IMPORTED_MODULE_0__.updateActiveUsers)(data.activeUsers);
  (0,_state_js__WEBPACK_IMPORTED_MODULE_0__.updateMessages)(data.channelMessages);
  (0,_view_js__WEBPACK_IMPORTED_MODULE_2__["default"])({
    appEl: appEl,
    state: _state_js__WEBPACK_IMPORTED_MODULE_0__["default"]
  });
  data.username && startDynamicRendering({
    appEl: appEl,
    state: _state_js__WEBPACK_IMPORTED_MODULE_0__["default"]
  });
})["catch"](function (err) {
  (0,_state_js__WEBPACK_IMPORTED_MODULE_0__.setError)(err.error);
  (0,_view_js__WEBPACK_IMPORTED_MODULE_2__["default"])({
    appEl: appEl,
    state: _state_js__WEBPACK_IMPORTED_MODULE_0__["default"]
  });
});
})();

/******/ })()
;
//# sourceMappingURL=bundles.js.map