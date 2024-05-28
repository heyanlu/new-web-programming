//interacting with external APIs or back-end services
//fetch or update data from the server
//e.g, user input -> send to server -> communicate with server via service.js - Handle Server Response
//update application states - Reflect State Changes in UI


//retrieving session data,
export function fetchSession() {
  return fetch("/api/v1/session")
    .catch((err) => Promise.reject({ error: "network-error" }))
    .then((response) => {
      if (!response.ok) {
        return response.json().then((err) => Promise.reject(err));
      }
      return response.json();
    });
}

export function fetchLogin(username) {
  return fetch("/api/v1/session/", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ username }),
  })
    .catch((err) => Promise.reject({ error: "network-error" }))
    .then((response) => {
      if (!response.ok) {
        return response.json().then((err) => Promise.reject(err));
      }
      return response.json();
    });
}

export function fetchLogout() {
  return fetch("/api/v1/session", {
    method: "DELETE",
  })
    .catch((err) => Promise.reject({ error: "network-error" }))
    .then((response) => {
      if (!response.ok) {
        return response.json().then((err) => Promise.reject(err));
      }
      return response.json(); // This return is fairly useless
    });
}

export function sendMessage(newMessage) {
  return fetch("/api/v1/messages", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ newMessage }),
  })
    .catch((err) => Promise.reject({ error: "network-error" }))
    .then((response) => {
      if (!response.ok) {
        return response.json().then((err) => Promise.reject(err));
      }
      return response.json();
    });
}

export function fetchDeleteMessage(id) {
  return fetch(`/api/v1/messages/${id}`, {
    method: "DELETE",
  })
    .catch(() => Promise.reject({ error: "networkError" }))
    .then((response) => {
      if (!response.ok) {
        return response.json().then((err) => Promise.reject(err));
      }
      return response.json();
    });
}

export function fetchEditMessage({ id, editedMessage }) {
  return fetch(`/api/v1/messages/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ editedMessage }),
  })
    .catch(() => Promise.reject({ error: "networkError" }))
    .then((response) => {
      if (!response.ok) {
        return response.json().then((err) => Promise.reject(err));
      }
      return response.json();
    });
}