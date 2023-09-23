import { useQuery } from "react-query";
import APIClient from "../services/ApiClient";

const apiClient = new APIClient("/products");
export const useProductById = id => {
  return useQuery(["product", id], () => apiClient.get(id), {
    enabled: !!id,
  });
};

export default useProductById;
