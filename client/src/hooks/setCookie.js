import Cookies from "js-cookie";

const SetCookie = (cookiename, usrin) => {
  Cookies.set(cookiename, usrin, {
    expires: 1,
    secure: true,
    sameSite: "strict",
    path: "/",
  });
};

export default SetCookie;
