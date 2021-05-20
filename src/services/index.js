import axios from "axios";
import store from "@/store";
import router from "@/router";

export const api = axios.create({
  baseURL: "api.url",
  timeout: 8000,
});

// interceptor
api.interceptors.response.use(
  (res) => responseSuccess(res),
  (err) => responseFailed(err)
);

const responseSuccess = (res) => Promise.resolve(res);

const responseFailed = async (err) => {
  // Unauthorized
  if ([401, 403].includes(err.response.status)) {
    store.dispatch("signOut");

    await router.push({
      path: "/auth",
    });
  }

  // Server error (5XX)
  if (err.response.status >= 500) {
    store.dispatch("signOut");

    await router.push({
      path: "/home",
    });
  }

  return Promise.reject(err);
};
