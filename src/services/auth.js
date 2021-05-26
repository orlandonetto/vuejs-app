import { httpRequest } from "./index";

export function signIn(payload) {
  return httpRequest("post", "/endpoint", payload);
}

export function signUp(payload) {
  return httpRequest("post", "/endpoint", payload);
}

export function loadSession() {
  return httpRequest("get", "/endpoint");
}
