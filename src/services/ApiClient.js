import axios from "axios";

const storageData = JSON.parse(localStorage.getItem("persist:root") ?? "{}");
const currentUser = storageData.user ? JSON.parse(storageData.user) : null;
const TOKEN = currentUser?.currentUser?.accesToken || "";
export const baseURL = "https://mojo-app-727ae45624d6.herokuapp.com/api";


export const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: { "x-auth-token": TOKEN },
});


// Request interceptor to log outgoing requests
axiosInstance.interceptors.request.use((config) => {
  console.log("Outgoing Request:", config);
  return config;
});

// Response interceptor to log incoming responses
axiosInstance.interceptors.response.use(
  (response) => {
    console.log("Incoming Response:", response);
    return response;
  },
  (error) => {
    console.error("Error Response:", error);
    return Promise.reject(error);
  }
);




class ApiClient {
  constructor(endpoint) {
    this.endpoint = endpoint;
  }

  getAll = params => {
    return axiosInstance.get(this.endpoint,  params ).then(res => res.data);
  };

  get = id => {
    return axiosInstance
      .get(this.endpoint + "/find/" + id)
      .then(res => res.data);
  };
}






export default ApiClient;
