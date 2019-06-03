// import { SERVER_URL } from "../constants";
// import { ajax } from "rxjs/ajax";
import { Observable } from "rxjs";

export function login(username, password, rememberMe) {
  return new Observable(observer => {
    observer.next({ authToken: "testToken" });
    observer.complete();
  });
  // return ajax
  //   .post(SERVER_URL + "/api/auth/login", { username, password })
  //   .map(res => res.response);
}
