import apiUrl from "../../conf";

const url = apiUrl + "cars/";

export async function fetchCars() {
  return fetch(url, {
    headers: new Headers({ "ngrok-skip-browser-warning": "true" }),
  }).then((res) => res.json());
}

export async function fetchCarDeletion(id) {
  const response = await fetch(url + id, {
    method: "DELETE",
    headers: new Headers({ "ngrok-skip-browser-warning": "true" }),
  });
  const car = await response.json();
  return car;
}

export async function fetchCar(id) {
  const response = await fetch(url + id, {
    headers: new Headers({ "ngrok-skip-browser-warning": "true" }),
  });
  const car = await response.json();
  return car;
}

export async function fetchCarCreation(car) {
  const response = await fetch(url, {
    method: "POST",
    headers: new Headers({
      "ngrok-skip-browser-warning": "true",
      "Content-Type": "application/json",
    }),
    body: JSON.stringify(car),
  });
  const newCar = await response.json();
  return newCar;
}

export async function fetchCarUpdate(car) {
  const response = await fetch(url, {
    method: "PUT",
    headers: new Headers({
      "ngrok-skip-browser-warning": "true",
      "Content-Type": "application/json",
    }),
    body: JSON.stringify(car),
  });
  const newCar = await response.json();
  return newCar;
}
