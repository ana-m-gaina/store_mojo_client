import { useQuery } from "react-query";
import APIClient from "../services/ApiClient";

const apiClient = new APIClient("orders");
export const useOrdersById = id => {
  return useQuery(["order", id], () => apiClient.get(id), {
    enabled: !!id,
  });
};

export default useOrdersById;
