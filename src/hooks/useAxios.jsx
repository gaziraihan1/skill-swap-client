const { default: axios } = require("axios");

const axiosInstance = axios.create({
  baseURL: "https://skill-swap-with-next-server.vercel.app",
});
const useAxios = () => {
  return axiosInstance;
};
export default useAxios;
