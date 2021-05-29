import { request } from "./index";

export const signIn = (data) => request("post", "/endpoint", data);

export const signUp = (data) => request("post", "/endpoint", data);

export const loadSession = () => request("get", "/endpoint");
