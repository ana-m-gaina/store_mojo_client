import { addProduct } from "../features/cartSlice";
import { axiosInstance } from "./ApiClient";

export const cartGet = ({ user }) => {
  console.log("user", user);
  return async dispatch => {
    try {
      if (user) {
        const authToken = user.accesToken;
        const config = {
          headers: {
            "x-auth-token": authToken,
          },
        };
        const response = await axiosInstance.get(
          `/cart/find/${user._id}`,
          config
        );

        if (response.data) {
          return response.data;
        } else {
          console.log("Cart data not found in the response");
          return null;
        }
      } else {
        console.log("User is null");
        return null;
      }
    } catch (error) {
      console.error("Error:", error);
      return "An error occurred";
    }
  };
};

export const cartAdd = ({ product, selectedSize, selectedColor, user }) => {
  return async dispatch => {
    try {
      dispatch(addProduct({ product, selectedSize, selectedColor }));
      if (user) {
        const authToken = user.accesToken;
        const config = {
          headers: {
            "x-auth-token": authToken,
          },
        };

        const res = await axiosInstance.put(
          `/cart/${user._id}`,
          {
            product: product,
            selectedSize: selectedSize,
            selectedColor: selectedColor,
            quantity: 1,
          },
          config
        );
        console.log(res);
      }
      return null;
    } catch (error) {
      console.log("Error:", error);
      return "An error occurred";
    }
  };
};
