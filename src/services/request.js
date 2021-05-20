import { api } from "./index";

export async function httpRequest(method, url, payload = null) {
  return await new Promise((resolve, reject) => {
    try {
      api[method](url, payload)
        .then((res) => {
          return resolve(res.data);
        })
        .catch((err) => {
          return reject(err.response);
        });
    } catch (err) {
      return reject(err.response);
    }
  });
}
