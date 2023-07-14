import apiUrl from "../../conf";

const url = apiUrl + "users/";

const serialize = (data) => {
  return {
    user_id: data.user_id,
    firstname: data.firstname,
    lastname: data.lastname,
    birthdate: data.birthdate,
    has_driver_licence: data.has_driver_licence,
    car_id: data.car_id,
    color_id: data.color_id,
  };
};

export async function fetchUserCreation(data) {
  const user = serialize(data);

  return fetch(url, {
    method: "POST",
    headers: new Headers({
      "ngrok-skip-browser-warning": "true",
      "Content-Type": "application/json",
    }),
    body: JSON.stringify(user),
  }).then((res) => res.json());
}

export async function fetchUserUpdate(data) {
  const user = serialize(data);

  return fetch(url, {
    method: "PUT",
    headers: new Headers({
      "ngrok-skip-browser-warning": "true",
      "Content-Type": "application/json",
    }),
    body: JSON.stringify(user),
  }).then((res) => res.json());
}

export async function fetchUsers() {
  return fetch(url, {
    headers: new Headers({ "ngrok-skip-browser-warning": "true" }),
  }).then((res) => res.json());
}

export async function fetchUser(id) {
  return fetch(url + id, {
    headers: new Headers({ "ngrok-skip-browser-warning": "true" }),
  }).then((res) => res.json());
}

export async function fetchUserDeletion(id) {
  return fetch(url + id, {
    method: "DELETE",
    headers: new Headers({ "ngrok-skip-browser-warning": "true" }),
  }).then((res) => res.json());
}
