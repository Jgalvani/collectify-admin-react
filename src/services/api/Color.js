import apiUrl from "../../conf";

const url = apiUrl + "colors/";

export async function fetchColors() {
  return fetch(url, {
    headers: new Headers({ "ngrok-skip-browser-warning": "true" }),
  }).then((res) => res.json());
}

export async function fetchColorDeletion(color_id) {
  return fetch(url + color_id, {
    method: "DELETE",
    headers: new Headers({ "ngrok-skip-browser-warning": "true" }),
  }).then((res) => res.json());
}

export async function fetchColor(id) {
  return fetch(url + id, {
    headers: new Headers({ "ngrok-skip-browser-warning": "true" }),
  }).then((res) => res.json());
}

export async function fetchColorCreation(color) {
  return fetch(url, {
    method: "POST",
    headers: new Headers({
      "ngrok-skip-browser-warning": "true",
      "Content-Type": "application/json",
    }),
    body: JSON.stringify(color),
  }).then((res) => res.json());
}

export async function fetchColorUpdate(color) {
  return fetch(url, {
    method: "PUT",
    headers: new Headers({
      "ngrok-skip-browser-warning": "true",
      "Content-Type": "application/json",
    }),
    body: JSON.stringify(color),
  }).then((res) => res.json());
}
