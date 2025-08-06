"use client";
import axios from "axios";
import useAuth from "./useAuth";
import { useEffect } from "react";
import toast from "react-hot-toast";

const axiosSecure = axios.create({
  baseURL: "https://skill-swap-with-next-server.vercel.app",
});

let interceptorsSet = false;

const useAxiosSecure = () => {
  const { user, logout } = useAuth();

  useEffect(() => {
    if (!interceptorsSet && user) {
      interceptorsSet = true;

      axiosSecure.interceptors.request.use(
        async (config) => {
          if (user) {
            const token = await user.getIdToken();
            config.headers.Authorization = `Bearer ${token}`;
          }
          return config;
        },
        (error) => Promise.reject(error)
      );

      axiosSecure.interceptors.response.use(
        (response) => response,
        (error) => {
          if (
            error.response?.status === 401 ||
            error.response?.status === 403
          ) {
            logout().then(() => toast.error("Logged out due to auth error"));
          }
          return Promise.reject(error);
        }
      );
    }
  }, [user, logout]);

  return axiosSecure;
};

export default useAxiosSecure;
