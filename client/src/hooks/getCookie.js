import Cookies from "js-cookie";

const GetCookie = (cookiename) => {
  return Cookies.get(cookiename);
};

export default GetCookie;
