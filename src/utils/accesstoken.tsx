import axios from "axios";
import Cookies from "js-cookie";
import { url } from ".";

let accessToken = "";

export const setToken = (s: string) => {
  accessToken = s;
};

export const getToken = () => {
  return accessToken;
};

//fetch refresh tokens helper
export async function fetchToken(setisAuth?: any, fetchData?: any) {
  const instance = axios.create({
    withCredentials: true,
  });

  try {
    const res = await instance.post(`${url}/api/refreshtokens`, {
      token: Cookies.get("yeez"),
    });
    if (res.data.accessToken) {
      //setting cookies client side, should be done over server, but i ran into vercel problems in production
      Cookies.set("yeez", res.data.refreshToken, {
        expires: 7,
        // secure: true,
      });
      setToken(res.data.accessToken);
      if (fetchData) {
        fetchData();
      }
      if (setisAuth) {
        setisAuth(true);
      }
    }
    console.clear();
  } catch (error) {
    if (error.message === "Request failed with status code 401") {
      if (setisAuth) {
        setisAuth(false);
      }
      Cookies.remove("yeez");
    }
    console.log(error.message);
  }
}
