import { useQuery } from "react-query";
import APIClient from "../services/ApiClient";

const apiClient = new APIClient("/products");
export const useProducts = (category, searchText) => {
  const queryKey = ["products", { category, searchText }];


  return useQuery(queryKey, () => {
    const params = {};

    if (category) {
      params.category = category;
    }

    if (searchText) {
      params.searchText = searchText;
    }

    return apiClient.getAll({ params });
  });
};

export default useProducts;
