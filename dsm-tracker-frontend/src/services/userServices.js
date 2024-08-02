import apiClient from "../utils/api-client";
import jwtDecode from "jwt-decode";

const tokenName = "token";

export async function signup(user) {
  const body = new FormData();
  body.append("email", user.email);
  body.append("name", user.name);
  body.append("password", user.password);

  const { data } = await apiClient.post("/users", body, {
    headers: { "Content-Type": "application/json" }, // Specify content type
  });
  console.log(data);
  localStorage.setItem(tokenName, data.token);
}

export async function login(user) {
  const { data } = await apiClient.post("/users/login", user);
  localStorage.setItem(tokenName, data.token);
}

export function logout() {
  localStorage.removeItem(tokenName);
}

export function getJwt() {
  return localStorage.getItem(tokenName);
}
