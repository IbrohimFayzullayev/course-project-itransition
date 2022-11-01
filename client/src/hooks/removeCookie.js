import Cookies from "js-cookie";

const RemoveCookie = (cookiename) => {
  Cookies.remove(cookiename);
};

export default RemoveCookie;
